import express from "express";
import {AuthenticationController} from "./authentication-controller";
import {Controller} from "./controller";
import {PassportService} from "./passport-service";
import { Pathfinder } from "./pathfinder";

export class ApiRouter {
    private authRouter = express.Router();
    private authController = new AuthenticationController();
    private router: express.Router = express.Router();
    private controller: Controller = new Controller();

    // Creates the routes for this router and returns a populated router object
    public getRouter(): express.Router {

        // Auth routes
        this.router.use("/auth", this.authRouter);
        this.authRouter.post("/register", this.authController.register);
        this.authRouter.post("/login", this.authController.login);
        this.authRouter.get("/refresh", PassportService.requireAuth, this.authController.refresh);
        this.authRouter.get("/authorize", PassportService.requireAuth, this.authController.authorize);

        // Other routes
        // this.router.get("/hello", this.controller.getHello);
        // this.router.post("/hello/:userid", this.controller.postHello);

        this.router.get("/userInfo/:userid", PassportService.requireAuth, this.controller.getUser);
        this.router.put("/userInfo/:userid", PassportService.requireAuth, this.controller.putUpdateCustomer);
        this.router.get("/userTickets", PassportService.requireAuth, this.controller.getUserTickets);
        this.router.get("/trains", this.controller.getAllTrains);
        this.router.get("/train/:trainId", this.controller.getTrain);
        this.router.get("/routes", this.controller.getRoutes);
        this.router.get("/stations", this.controller.getStations);
        this.router.get("/path/:fromto/:date", function(req, res) {
            const tempDate = new Date(Number(req.params.date));
            const pathfinder = new Pathfinder();
            pathfinder.findPath(req.params.fromto, tempDate, res);
        });

        return this.router;
    }
}
