import { dbConfig } from "../config/config";

export const loginDB = async (
  usernameValue: string,
  passwordValue: string
): Promise<string[]> => {
  const requestOptions = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(`${usernameValue}:${passwordValue}`),
    },
  };
  try {
    const response = await fetch(`${dbConfig.url}/getuser`, requestOptions);
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const data = isJson && (await response.json());
    if (!response.ok) {
      // get error message from body or default to response status
      const error = (data && data.message) || response.status;
      return ["", error];
    }
    return [data.sessionid, ""];
  } catch {
    return ["", "Unable login using given credentials."];
  }
};

export const createAccount = async (
  usernameValue: string,
  passwordValue: string
): Promise<string> => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: usernameValue,
      password: passwordValue,
    }),
  };
  try {
    const response = await fetch(
      "http://127.0.0.1:8081/createuser",
      requestOptions
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const data = isJson && (await response.json());
    if (!response.ok) {
      // get error message from body or default to response status
      const error = (data && data.message) || response.status;
      return error;
    }
    return "";
  } catch {
    return "Unable create a new new user";
  }
};
