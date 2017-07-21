/**
 * Module dependencies.
 */
import * as express from "express";
import * as path from "path";
import * as compression from "compression";
import * as mustache from "express-mustache";

export class ExpressServer {
  private app = express();

  constructor() {
    this.app = express();
    this.setupServer();
  }

  private setupServer() {
    this.app.set("port", 3000);
    this.app.set("views", path.join(__dirname, "views"));
    this.app.set("view engine", "mustache");
    this.app.engine("mustache", mustache.create());
    this.app.use(compression());
    this.app.use(
      express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
    );
  }

  public start() {
    this.app.get("/", (req, res) => {
      res.render("layout", { title: "Theo Dammaretz", social: true });
    });
    this.app.get("/404", (req, res) => {
      res.render("404", {});
    });
    this.app.get("*", (req, res) => {
      res.status(404).render("404", {});
    });

    this.app.listen(this.app.get("port"), () => {
      console.log(
        "  Your app is running at http://localhost:%d in %s mode",
        this.app.get("port"),
        this.app.get("env")
      );
      console.log("  Press CTRL-C to stop\n");
    });
  }
}
