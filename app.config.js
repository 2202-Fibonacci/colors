export default function ({ config }) {
  return {
    ...config,
    extra: {
      API_URL:
        process.env.EXPO_ENV === "production"
          ? "https://findmyline.herokuapp.com"
          : "http://localhost:4000",
    },
  };
}
