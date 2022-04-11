const app = require("./app");
const connect = require("./configs/db");

app.listen(3000, async () => {
  try {
    await connect();
    console.log("listening on port 3000");
  } catch (e) {
    console.log(e.message);
  }
});