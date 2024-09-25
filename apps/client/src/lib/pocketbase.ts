import PocketBase from "pocketbase";

// If client side use relative path, else use absolute path
const apiPath =
  typeof window === "undefined" ? "http://localhost:3000/pbapi/" : "/pbapi/";

export const pbClient = new PocketBase(apiPath);
