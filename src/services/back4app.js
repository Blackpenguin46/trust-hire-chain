import Parse from 'parse';

export const initializeParse = () => {
  Parse.initialize(
    import.meta.env.VITE_BACK4APP_APP_ID, 
    import.meta.env.VITE_BACK4APP_JS_KEY  
  );
  Parse.serverURL = 'https://parseapi.back4app.com/';
};

// User Registration (Sign Up)
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

// User Login
export const loginUser = async (username, password) => {
  try {
    const user = await Parse.User.logIn(username, password);
    console.log("User logged in successfully!", user);
    return user;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

// User Logout
export const logoutUser = async () => {
  try {
    await Parse.User.logOut();
    console.log("User logged out successfully!");
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};

// Get Current User
export const getCurrentUser = () => {
  const currentUser = Parse.User.current();
  if (currentUser) {
    console.log("Current user:", currentUser);
    return currentUser;
  } else {
    console.log("No user is currently logged in.");
    return null;
  }
};


