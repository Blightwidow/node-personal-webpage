/**
 * Module dependencies.
 */
import * as express from "express";
import * as path from "path";
import * as compression from "compression";
import * as mustache from "express-mustache";

/**
 * Create Express server.
 */
const app = express();

/**
 * Express configuration.
 */
app.set("port", 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "mustache");
app.engine("mustache", mustache.create());
app.use(compression());
app.use(express.static(path.join(__dirname, "public"), { maxAge: 31557600000 }));
console.log(path.join(__dirname, "public"));

/**
 * Primary app routes.
 */
// FIXME After backend build
// TODO add app-cache
app.get("/", (req, res) => {
  res.render("layout", { title: "Theo Dammaretz", social: true });
});
app.get("/404", (req, res) => {
  res.render("404", {});
});
app.get("*", (req, res) => {
  res.status(404).render("404", {});
});

/**
 * Start Express server.
 */
app.listen(app.get("port"), () => {
  console.log(("  App is running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
  console.log("  Press CTRL-C to stop\n");
});

module.exports = app;
