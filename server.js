const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const ip = "192.168.147.137";
const port = 8099;

app.use(bodyParser.urlencoded({ extended: true }));

require("./routes")(app);
app.listen(port,ip,() => {
  console.log("we are listening on " + port);
});
