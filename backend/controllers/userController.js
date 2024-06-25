import User from "../Models/userModel.js";
import ApiError from "../utils/ApiError.js";

const signUpUser = async (req, res, next) => {
    try {
        const { username, email, password, role } = req.body;
        console.log("Received request to sign up user:", req.body);

        if (!username || !email || !password) {
            throw new ApiError(400, "All fields are required");
        }

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const user = await User.create({ username, email, password, role });
        const createdUser = await User.findById(user._id).select("-password");

        if (!createdUser) {
            throw new ApiError(500, "Something went wrong while registering the user");
        }

        const accessToken = user.generateAccessToken();
        const options = { httpOnly: true, secure: true };

        return res.status(201).cookie("accessToken", accessToken, options).json({
            userName: createdUser.username,
            email: createdUser.email,
        });
    } catch (error) {
        console.error(`Error in signUpUser: ${error.message}`);
        next(new ApiError(500, `Error in signing up user: ${error.message}`));
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log("Received request to log in user with email:", email);

        if (!email || !password) {
            throw new ApiError(400, "All fields are required");
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await user.isPasswordCorrect(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const accessToken = user.generateAccessToken();
        const options = { httpOnly: true, secure: true };

        return res.status(200).cookie("accessToken", accessToken, options).json({
            userName: user.username,
            email: user.email,
        });
    } catch (error) {
        console.error(`Error in loginUser: ${error.message}`);
        next(new ApiError(500, `Error in logging in user: ${error.message}`));
    }
};

export { loginUser, signUpUser };
