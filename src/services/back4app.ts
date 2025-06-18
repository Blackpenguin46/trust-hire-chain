import Parse from 'parse/dist/parse.min.js';

export const initializeParse = () => {
  Parse.initialize(
    import.meta.env.VITE_BACK4APP_APP_ID,
    import.meta.env.VITE_BACK4APP_JS_KEY
  );
  Parse.serverURL = import.meta.env.VITE_BACK4APP_SERVER_URL;
};

// User Registration (Sign Up)
export const signUpUser = async (username: string, password: string, email: string): Promise<Parse.User> => {
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
    super('JobPosting');
  }

  get id(): string {
    return (this as any).id;
  }

  get createdAt(): Date {
    return (this as any).createdAt;
  }

  get title(): string {
    return (this as any).get('title') as string;
  }

  set title(value: string) {
    (this as any).set('title', value);
  }

  get description(): string {
    return (this as any).get('description') as string;
  }

  set description(value: string) {
    (this as any).set('description', value);
  }

  get location(): string {
    return (this as any).get('location') as string;
  }

  set location(value: string) {
    (this as any).set('location', value);
  }

  get salaryRange(): string {
    return (this as any).get('salaryRange') as string;
  }

  set salaryRange(value: string) {
    (this as any).set('salaryRange', value);
  }

  get employmentType(): string {
    return (this as any).get('employmentType') as string;
  }

  set employmentType(value: string) {
    (this as any).set('employmentType', value);
  }

  get employer(): Parse.User {
    return (this as any).get('employer') as Parse.User;
  }

  set employer(value: Parse.User) {
    (this as any).set('employer', value);
  }

  get isActive(): boolean {
    return (this as any).get('isActive') as boolean;
  }

  set isActive(value: boolean) {
    (this as any).set('isActive', value);
  }

  get applicationDeadline(): Date {
    return (this as any).get('applicationDeadline') as Date;
  }

  set applicationDeadline(value: Date) {
    (this as any).set('applicationDeadline', value);
  }

  get requiredSkills(): string[] {
    return (this as any).get('requiredSkills') as string[];
  }

  set requiredSkills(value: string[]) {
    (this as any).set('requiredSkills', value);
  }

  get tier(): string {
    return (this as any).get('tier') as string;
  }

  set tier(value: string) {
    (this as any).set('tier', value);
  }

  get isFeatured(): boolean {
    return (this as any).get('isFeatured') as boolean;
  }

  set isFeatured(value: boolean) {
    (this as any).set('isFeatured', value);
  }

  get isVerified(): boolean {
    return (this as any).get('isVerified') as boolean;
  }

  set isVerified(value: boolean) {
    (this as any).set('isVerified', value);
  }

  get paymentStatus(): string {
    return (this as any).get('paymentStatus') as string;
  }

  set paymentStatus(value: string) {
    (this as any).set('paymentStatus', value);
  }

  async save(options?: Parse.SaveOptions): Promise<this> {
    return (this as any).save(null, options);
  }
}

// Register the Job class
Parse.Object.registerSubclass('JobPosting', Job);

export default Parse; 