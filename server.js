require("dotenv").config();
const app = require("./src/app.js");
const connectToDB = require("./src/config/database.js");

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
    connectToDB();
});