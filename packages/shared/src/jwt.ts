export const setJWT = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", token);
  }
};

export const getJWT = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("jwt");
  }
  return null;
};

export const removeJWT = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
  }
};
