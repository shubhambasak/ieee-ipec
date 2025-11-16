// Simple authentication system for admin panel
// In production, replace with proper authentication (Firebase Auth, Auth0, etc.)

const ADMIN_PASSWORD = "ieee-admin-2025"; // Change this in production!
const STORAGE_KEY = "ieee-admin-auth";

export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false;
  const auth = localStorage.getItem(STORAGE_KEY);
  if (!auth) return false;
  
  try {
    const { token, expires } = JSON.parse(auth);
    if (Date.now() > expires) {
      localStorage.removeItem(STORAGE_KEY);
      return false;
    }
    return token === btoa(ADMIN_PASSWORD);
  } catch {
    return false;
  }
};

export const login = (password: string): boolean => {
  if (password === ADMIN_PASSWORD) {
    const expires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    const token = btoa(ADMIN_PASSWORD);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ token, expires }));
    return true;
  }
  return false;
};

export const logout = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

export const requireAuth = (): boolean => {
  if (!isAuthenticated()) {
    window.location.href = "/admin/login";
    return false;
  }
  return true;
};

