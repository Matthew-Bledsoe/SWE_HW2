const express = require("express");
const app = express();
const port = 3000;
const apiRouter = require("./api");

app.all("/", function (req, res) {
  let name = req.query.name;
  res.send(`Hello ${name}!`);
});
app.get("/other", function (req, res) {
  res.send("This is the other page!");
});
app.get("/ot*her", function (req, res) {
  res.send("This is the the wrong page page!");
});

app.get("/params/:testid", function (req, res, next) {
  if (req.params.testid === "0") {
    return res.send("This is a different page for testid 0!");
  } 
  next();
});
app.get("/params/:testid", function (req, res) {
  let testid = req.params.testid;
  res.send(`This is the page for testid ${testid}!`);
});
/*app.get("/other/next", function (req, res) {
  res.send("This is the next other page!");
});*/
app.use("/api", apiRouter);

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
