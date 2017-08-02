import * as express from "express";
import * as path from "path";
import * as compression from "compression";
import * as mustache from "express-mustache";

import * as Dto from "../dtos";
import * as Gateway from "../gateways";
import * as Interactor from "../interactors";
import * as Presenter from "../presenters";

export class ExpressServer {
  private app = express();

  constructor() {
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
    const userRepository = new Gateway.UserRepository();

    this.app.get("/", (req, res) => {
      const request = new Dto.UserInfoRequestMessage();
      const interactor = new Interactor.RequestUserInfoInteractor(userRepository);

      const response = interactor.handle(request);

      const vm = new Presenter.RequestUserInfoPresenter().handle(response);
      res.render("layout", vm.data);
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
