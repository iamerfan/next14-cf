const dev = process.env.NODE_ENV !== "production";
export const server = dev ? "http://localhost:3000" : process.env.URL;

export const fetchFromServer = async (url, method, userOptions) => {
  const url = `${server}/api/${url}`;

  const initialOptions = {
    next: { revalidate: 5 },
    method: method || "GET",
    cache: "no-store",
  };

  const options = {
    ...initialOptions,
    ...userOptions,
  };

  try {
    return await fetch(url, options).then((res) => res.json());
  } catch (error) {
    console.log(error);
    return JSON.stringify(error);
  }
};
