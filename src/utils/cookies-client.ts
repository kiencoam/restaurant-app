export function getCookie(name: string) {
  if (typeof document === "undefined") {
    return undefined; // Return undefined when running on the server
  }

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
