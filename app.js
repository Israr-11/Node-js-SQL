const express = require("express");
const bodyParser = require("body-parser");
const routerOfApis = require("./router/routeSqlApi");
const app = express();
app.use(bodyParser.json());

app.use("/sqlapi", routerOfApis);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
