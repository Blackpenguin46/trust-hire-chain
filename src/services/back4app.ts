
import Parse from 'parse/dist/parse.min.js';

// Ensure Parse is properly initialized for browser environment
if (typeof window !== 'undefined') {
  // Set up any browser-specific configurations
  (window as any).Parse = Parse;
}

export const initializeParse = () => {
  // Use fallback values if environment variables are not available
  const appId = import.meta.env.VITE_BACK4APP_APP_ID || '2IRWN8rmJxc43OSfiWKRKQYmnIyFwRPHycYqtLlW';
  // Use JavaScript Key for Parse SDK (not REST API key)
  const jsKey = import.meta.env.VITE_BACK4APP_JS_KEY || 'e8BQYZJn6ZhItoB19ntaAIhWBUvVGeRvFZsg8bMT';
  const serverURL = import.meta.env.VITE_BACK4APP_SERVER_URL || 'https://parseapi.back4app.com';

  console.log('Initializing Parse with:', {
    appId: appId.substring(0, 8) + '...',
    jsKey: jsKey.substring(0, 8) + '...',
    serverURL
  });

  try {
    Parse.initialize(appId, jsKey);
    Parse.serverURL = serverURL;
    
    // Enable automatic user creation
    Parse.User.enableUnsafeCurrentUser();
    
    console.log('Back4App initialized successfully');
    console.log('Parse SDK version:', Parse.VERSION);
    return true;
  } catch (error) {
    console.error('Failed to initialize Back4App:', error);
    return false;
  }
};

// REST API configuration for direct HTTP requests
export const restApiConfig = {
  appId: import.meta.env.VITE_BACK4APP_APP_ID || '2IRWN8rmJxc43OSfiWKRKQYmnIyFwRPHycYqtLlW',
  restApiKey: import.meta.env.VITE_BACK4APP_REST_API_KEY || 'YOUR_REST_API_KEY_HERE',
  serverURL: import.meta.env.VITE_BACK4APP_SERVER_URL || 'https://parseapi.back4app.com',
  headers: {
    'X-Parse-Application-Id': import.meta.env.VITE_BACK4APP_APP_ID || '2IRWN8rmJxc43OSfiWKRKQYmnIyFwRPHycYqtLlW',
    'X-Parse-REST-API-Key': import.meta.env.VITE_BACK4APP_REST_API_KEY || 'YOUR_REST_API_KEY_HERE',
    'Content-Type': 'application/json'
  }
};

// User Registration (Sign Up)
export const signUpUser = async (username: string, password: string, email: string): Promise<Parse.User> => {
  const user = new Parse.User();
  user.set("username", username);
  user.set("password", password);
  user.set("email", email);

  try {
    console.log('Attempting to sign up user:', username);
    console.log('Parse server URL:', Parse.serverURL);
    console.log('Parse app initialized:', !!Parse.applicationId);
    
    await user.signUp();
    console.log("User signed up successfully!", user);
    return user;
  } catch (error: any) {
    console.error("Error during sign up:", error);
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    
    // Handle specific Back4App error cases
    if (error.code === 202) {
      throw new Error('Username already taken. Please choose a different username.');
    } else if (error.code === 203) {
      throw new Error('Email already in use. Please use a different email address.');
    } else if (error.message === 'unauthorized' || error.code === 141) {
      throw new Error('User registration is not enabled on this Back4App application. Please check your Back4App dashboard settings under Security & Keys.');
    } else if (error.code === 125) {
      throw new Error('Invalid email address format.');
    } else if (error.code === 120) {
      throw new Error('Username/email is required.');
    }
    
    throw error;
  }
};

// User Login
export const loginUser = async (username: string, password: string): Promise<Parse.User> => {
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
export const logoutUser = async (): Promise<void> => {
  try {
    await Parse.User.logOut();
    console.log("User logged out successfully!");
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};

// Get Current User
export const getCurrentUser = (): Parse.User | null => {
  const currentUser = Parse.User.current();
  if (currentUser) {
    console.log("Current user:", currentUser);
    return currentUser;
  } else {
    console.log("No user is currently logged in.");
    return null;
  }
};

// Define Job class
export class Job extends Parse.Object {
  constructor() {
    super('Job');
  }

  get title(): string {
    return (this as any).get('title');
  }

  set title(value: string) {
    (this as any).set('title', value);
  }

  get description(): string {
    return (this as any).get('description');
  }

  set description(value: string) {
    (this as any).set('description', value);
  }

  get location(): string {
    return (this as any).get('location');
  }

  set location(value: string) {
    (this as any).set('location', value);
  }

  get salaryRange(): string {
    return (this as any).get('salaryRange');
  }

  set salaryRange(value: string) {
    (this as any).set('salaryRange', value);
  }

  get employmentType(): string {
    return (this as any).get('employmentType');
  }

  set employmentType(value: string) {
    (this as any).set('employmentType', value);
  }

  get applicationDeadline(): Date {
    return (this as any).get('applicationDeadline');
  }

  set applicationDeadline(value: Date) {
    (this as any).set('applicationDeadline', value);
  }

  get requiredSkills(): string[] {
    return (this as any).get('requiredSkills');
  }

  set requiredSkills(value: string[]) {
    (this as any).set('requiredSkills', value);
  }

  get employer(): Parse.User {
    return (this as any).get('employer');
  }

  set employer(value: Parse.User) {
    (this as any).set('employer', value);
  }

  get isActive(): boolean {
    return (this as any).get('isActive');
  }

  set isActive(value: boolean) {
    (this as any).set('isActive', value);
  }

  get tier(): string {
    return (this as any).get('tier');
  }

  set tier(value: string) {
    (this as any).set('tier', value);
  }

  get isFeatured(): boolean {
    return (this as any).get('isFeatured');
  }

  set isFeatured(value: boolean) {
    (this as any).set('isFeatured', value);
  }

  get paymentStatus(): string {
    return (this as any).get('paymentStatus');
  }

  set paymentStatus(value: string) {
    (this as any).set('paymentStatus', value);
  }

  get isVerified(): boolean {
    return (this as any).get('isVerified');
  }

  set isVerified(value: boolean) {
    (this as any).set('isVerified', value);
  }

  get id(): string {
    return (this as any).id;
  }

  get createdAt(): Date {
    return (this as any).createdAt;
  }

  async save(): Promise<Job> {
    return await (this as any).save() as Job;
  }
}

// Register the Job class
Parse.Object.registerSubclass('Job', Job);

export default Parse;
