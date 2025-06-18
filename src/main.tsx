import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initializeParse } from './services/back4app';
import Parse from 'parse/dist/parse.min.js';

// Initialize Parse SDK
initializeParse();

// Function to handle user registration
export const signUpUser = async (username, password, email) => {
  const user = new Parse.User();
  user.set("username", username);
  user.set("password", password);
  user.set("email", email);

  try {
    await user.signUp();
    console.log("User signed up successfully!", user);
    return user;
  } catch (error) {
    console.error("Error during sign up:", error);
    throw error;
  }
};

const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
