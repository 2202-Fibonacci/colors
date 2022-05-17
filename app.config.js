export default function ({ config }) {
  // config paramter
  return {
    ...config,
    extra: {
      API_URL:
        process.env.NODE_ENV === "PRODUCTION"
          ? "https://findmyline.herokuapp.com/"
          : "http://localhost:4000",
    },
  };
}
