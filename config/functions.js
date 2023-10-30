const dev = process.env.NODE_ENV !== "production";
export const server = dev ? "http://localhost:3000" : process.env.URL;

export const fetchFromServer = async (url, method, opt) => {
  try {
    return await fetch(`${server}/api/${url}`, {
      ...opt,
      method: method || "GET",
    }).then((res) => res.json());
  } catch (error) {
    console.log(error);
    return JSON.stringify(error);
  }
};
