import "dotenv/config";

export default {
  expo: {
    name: "Track-Err",
    slug: "Track-Err",
    version: "1.0.0",
    extra: {
      LOC: process.env.LOC,
      API_URL_LOCAL: process.env.API_URL_LOCAL,
      API_URL_REMOTE: process.env.API_URL_REMOTE,
      ENV: process.env.ENV,
    },
  },
};
