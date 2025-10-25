import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_KEY = 'users';
const CURRENT_USER_KEY = 'current_user';

// Save new user
export const registerUser = async (name: string, email: string, password: string) => {
  const users = JSON.parse((await AsyncStorage.getItem(USERS_KEY)) || '[]');
  const existingUser = users.find((u: any) => u.email === email);

  if (existingUser) {
    throw new Error('User already exists');
  }

  const newUser = { name, email, password };
  users.push(newUser);
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
  await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
};

// Login user
export const loginUser = async (email: string, password: string) => {
  const users = JSON.parse((await AsyncStorage.getItem(USERS_KEY)) || '[]');
  const user = users.find((u: any) => u.email === email && u.password === password);

  if (!user) {
    throw new Error('Invalid credentials');
  }

  await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};

// Get current user
export const getCurrentUser = async () => {
  const user = await AsyncStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
};

// Logout user
export const logoutUser = async () => {
  await AsyncStorage.removeItem(CURRENT_USER_KEY);
};
