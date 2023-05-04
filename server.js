const app = require("./app");

const port = 8000;
// let ip = "127.0.0.1";
// ip = "192.168.29.122";
// ip = "https://todolistapi-ssi0.onrender.com";

app.listen(port, () => {
  console.log(`Server running at ${port}/`);
});
