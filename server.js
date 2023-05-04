const app = require("../app");

const port = 8000;
let ip = "127.0.0.1";
ip = "192.168.29.122";

app.listen(port, ip, () => {
  console.log(`Server running at http://${ip}:${port}/`);
});
