# EduPath

EduPath is a web application designed to provide a seamless learning experience for users, focusing on a variety of courses and educational content.

## Technologies Used

### Backend
- Node.js
- Express
- MongoDB
- multer (for handling file uploads)
- Cloudinary (for cloud storage of images and videos)
- JWT (JSON Web Tokens) for authentication and authorization

### Frontend
- React.js
- Tailwind CSS (for styling)
- Context API (for state management)
- Redux (for global state management)
- react-hls-player (for playing HLS videos)
- Material-UI (for UI components)
- react-router-dom (for client-side routing)
- Axios (for making HTTP requests)
- fetch API (for fetching data from backend)

## Features
-**Login & Signup Page**: Users can register and log in to access the platform's features.

- **HomePage**: Includes a search functionality to discover courses, and displays a carousel of featured content.
  
- **Courses Listing**: Users can browse through various courses available on the platform.
  
- **Account Page**: Users can update their information and profile picture.
  
- **Dashboard**: Displays subscribed courses and provides access to enrolled content.
  
- **Payment Gateway**: Allows users to make payments securely for course subscriptions.
  
- **Course Pages**: Dedicated pages for each course where users can view educational videos and materials.
  
- **Payment Details Page**: Displays information about payments made, including transaction details.

- **Create Course Page**: Admins can create new courses.
## Installation

1. **Clone the repository:**

2. **Install dependencies:**

3. **Set up environment variables:**
- Create a `.env` file in the `backend` directory and add the following environment variables:
  ```
  PORT=
  MONGO_URL=
  ACCESS_TOKEN_SECRET=
  CLOUDINARY_CLOUD_NAME=
  CLOUDINARY_API_KEY=
  CLOUDINARY_API_SECRET=
  STRIPE_SECRET_KEY=
  ```

4. **Run the application:**
- Start the backend server:

  cd backend
  npm start

- Start the frontend development server:
  cd frontend
  npm run dev



