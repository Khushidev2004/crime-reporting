// src/utils/auth.js

export const setAuth = (token, user) => {
  if (token) localStorage.setItem("token", token);
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
    if (user.role) localStorage.setItem("role", user.role);
  }
};

export const getToken = () => localStorage.getItem("token");

const decodeJWT = (token) => {
  if (!token) return null;
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    const payload = JSON.parse(atob(parts[1]));
    return payload;
  } catch (err) {
    console.error("JWT decode error:", err);
    return null;
  }
};

export const getUserFromToken = () => {
  try {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    const token = getToken();
    if (!token) return null;
    const payload = decodeJWT(token);
    if (!payload) return null;

    return {
      id: payload.id || payload._id || null,
      role: payload.role || payload.user?.role || null,
      name: payload.name || payload.user?.name || payload.email || null,
      email: payload.email || null,
    };
  } catch (err) {
    console.error("getUserFromToken error:", err);
    return null;
  }
};

export const getRole = () => {
  const r = localStorage.getItem("role");
  if (r) return r;
  const u = getUserFromToken();
  return u ? u.role : null;
};

export const isLoggedIn = () => !!getToken();
export const isAdmin = () => getRole() === "admin";
export const isPolice = () => getRole() === "police";

export const logoutUser = (navigate) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("role");

  if (navigate) {
    navigate("/login");
  } else {
    window.location.href = "/login";
  }
};
