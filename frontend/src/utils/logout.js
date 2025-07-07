export const logoutButton = (logout, navigate) => {
  logout();
  localStorage.removeItem("token");
  navigate("/");
};
