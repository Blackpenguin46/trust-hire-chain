
import Parse from 'parse/dist/parse.min.js';

export const initializeParse = () => {
  const appId = import.meta.env.VITE_BACK4APP_APP_ID;
  const jsKey = import.meta.env.VITE_BACK4APP_JS_KEY;
  const serverURL = import.meta.env.VITE_BACK4APP_SERVER_URL;

  if (!appId || !jsKey || !serverURL) {
    console.warn('Back4App environment variables are not configured. Some features may not work.');
    return false;
  }

  try {
    Parse.initialize(appId, jsKey);
    Parse.serverURL = serverURL;
    console.log('Back4App initialized successfully');
    return true;
  } catch (error) {
    console.error('Failed to initialize Back4App:', error);
    return false;
  }
};

// User Registration (Sign Up)
export const signUpUser = async (username: string, password: string, email: string): Promise<Parse.User> => {
  if (!import.meta.env.VITE_BACK4APP_APP_ID) {
    throw new Error('Back4App is not configured. Please set up your environment variables.');
  }

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
export const loginUser = async (username: string, password: string): Promise<Parse.User> => {
  if (!import.meta.env.VITE_BACK4APP_APP_ID) {
    throw new Error('Back4App is not configured. Please set up your environment variables.');
  }

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
  if (!import.meta.env.VITE_BACK4APP_APP_ID) {
    throw new Error('Back4App is not configured. Please set up your environment variables.');
  }

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
  if (!import.meta.env.VITE_BACK4APP_APP_ID) {
    console.warn('Back4App is not configured. Cannot get current user.');
    return null;
  }

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
