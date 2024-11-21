// Helper function to decode base64url
const base64UrlDecode = (str) => {
  // Replace base64url characters with base64 characters
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  // Pad with '=' characters to make the string length a multiple of 4
  while (base64.length % 4) {
    base64 += "=";
  }
  // Decode base64 string
  return atob(base64);
};

// Helper function to decode JWT
export const decodeJWT = (token) => {
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid JWT");
  }
  const payload = JSON.parse(base64UrlDecode(parts[1]));
  return payload;
};
