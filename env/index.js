const environment = process.env.NODE_ENV || "development";
const env = require("dotenv").config({
  path: `./env/${environment}.env`,
});
if (env.error) {
  throw env.error;
}
