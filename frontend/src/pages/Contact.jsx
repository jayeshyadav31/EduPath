import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { FaPhoneAlt, FaUserAlt, FaLocationArrow } from "react-icons/fa";
import { MdEmail, MdSend } from "react-icons/md";
import { FaLinkedin, FaTwitterSquare, FaInstagramSquare } from "react-icons/fa";
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';

function Contact() {
  const [data, setData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSend = (e) => {
    e.preventDefault();

    const templateParams = {
      from_name: data.name,
      to_name: "jayesh",
      from_email: data.email,
      subject: data.subject,
      message: data.message,
    };

    const form = document.createElement("form");
    form.style.display = "none";

    for (const key in templateParams) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = templateParams[key];
      form.appendChild(input);
    }

    document.body.appendChild(form);

    emailjs
      .sendForm('service_tkdktbl', 'template_s4akw3l', form, 'CXS2Wzk0pkHsaU4XR')
      .then((response) => {
        setData({ name: "", email: "", subject: "", message: "" });
        console.log('Email sent successfully:', response);
        toast.success("Email sent successfully");
        Navigate('/account')
      })
      .catch((error) => {
        toast.error("Unable to send Email");
        console.error('Email failed to send:', error);
      });
  };

  return (
    <div className="justify-center bg-white text-black rounded-md">
      <h1 className="text-center text-lg pt-1 font-bold">Feel Free To Contact Us</h1>
      <div className="flex justify-center mt-3">
        <div>
          <h2 className="text-lg mb-4 text-gray-500 font-bold">
            Get In <span className="text-black">Touch</span>
          </h2>
          <form onSubmit={handleSend}>
            <div className="flex flex-col md:flex-row">
              <div className="mb-4 md:w-1/2">
                <label htmlFor="name" className="block mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Name"
                  className="w-full border border-black p-2 rounded focus:border-gray-900"
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  value={data.name}
                  required
                />
              </div>
              <div className="mb-4 md:w-1/2 md:ml-4">
                <label htmlFor="email" className="block mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  className="w-full border border-black p-2 rounded focus:border-gray-900"
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  value={data.email}
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="subject" className="block mb-2">Subject</label>
              <input
                type="text"
                id="subject"
                placeholder="Subject"
                className="w-full border border-black p-2 rounded focus:border-gray-900"
                onChange={(e) => setData({ ...data, subject: e.target.value })}
                value={data.subject}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block mb-2">Message</label>
              <textarea
                id="message"
                placeholder="Message"
                className="w-full border border-black p-2 rounded focus:border-gray-900"
                rows="5"
                onChange={(e) => setData({ ...data, message: e.target.value })}
                value={data.message}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded inline-flex items-center"
            >
              Send Message <MdSend className="ml-2" />
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="mt-8 ml-8">
          <h2 className="text-lg mb-4">Contact Info</h2>
          <div className="flex flex-col gap-4">
            <div className="flex items-center">
              <FaUserAlt className="text-primary-500" />
              <p className="ml-2 font-medium">Customer Care</p>
            </div>
            <div className="flex items-center">
              <FaPhoneAlt className="text-primary-500" />
              <p className="ml-2 font-medium">70561564</p>
            </div>
            <div className="flex items-center">
              <MdEmail className="text-primary-500" />
              <p className="ml-2 font-medium">yadavjayesh8074@gmail.com</p>
            </div>
            <div className="flex items-center">
              <FaLocationArrow className="text-primary-500" />
              <p className="ml-2 font-medium">Sonipat</p>
            </div>
          </div>
          <div className="flex items-center mt-8">
            <h3 className="text-xl">Social</h3>
            <div className="bg-primary-500 h-0.5 w-10 ml-2"></div>
            <a href="/" target="_blank" className="ml-2">
              <FaLinkedin className="text-primary-500" />
            </a>
            <a href="/" target="_blank" className="ml-2">
              <FaTwitterSquare className="text-primary-500" />
            </a>
            <a href="/" target="_blank" className="ml-2">
              <FaInstagramSquare className="text-primary-500" />
            </a>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Contact;
