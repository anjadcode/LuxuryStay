// Authentication utilities for hotel web app

/**
 * Handles user logout functionality
 * Clears local storage, session storage, and redirects to login page
 */
export const handleLogout = (): void => {
  try {
    // Clear any authentication tokens from local storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    
    // Clear session storage
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userData');
    
    // Clear any cached user data
    localStorage.removeItem('hotelUserPreferences');
    sessionStorage.removeItem('hotelSessionData');
    
    // Redirect to login page
    window.location.href = '/login';
    
    console.log('User logged out successfully');
  } catch (error) {
    console.error('Error during logout:', error);
    // Fallback: redirect even if storage operations fail
    window.location.href = '/login';
  }
};

/**
 * Checks if user is authenticated
 * @returns boolean indicating authentication status
 */
export const isAuthenticated = (): boolean => {
  try {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    return !!token;
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};

/**
 * Gets current user data from storage
 * @returns user data object or null
 */
export const getCurrentUser = (): any => {
  try {
    const userData = localStorage.getItem('userData') || sessionStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

/**
 * Stores authentication data
 * @param token - authentication token
 * @param userData - user data object
 * @param rememberMe - whether to use localStorage vs sessionStorage
 */
export const setAuthData = (token: string, userData: any, rememberMe: boolean = false): void => {
  try {
    const storage = rememberMe ? localStorage : sessionStorage;
    
    storage.setItem('authToken', token);
    storage.setItem('userData', JSON.stringify(userData));
    
    console.log('Authentication data stored successfully');
  } catch (error) {
    console.error('Error storing authentication data:', error);
  }
};

export default {
  handleLogout,
  isAuthenticated,
  getCurrentUser,
  setAuthData
};
