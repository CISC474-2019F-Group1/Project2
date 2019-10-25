import express from "express";

export class Controller {
    public getHello(req: express.Request, res: express.Response): void {
        res.send("Hello World");
    }
    public postHello(req: express.Request, res: express.Response): void {
        //console.log(req.params.userid)
        res.send(req.params.userid);
    }

    public getAllTrains(req: express.Request, res: express.Response){
        //return list of all trains
    }

    public getTrain(req: express.Request, res: express.Response){
        //return train based on Train ID
    }

    public getUser(req: express.Request, res: express.Response){
        //return user info
    }

    public postCreateUser(req: express.Request, res: express.Response){
        //return success, add user
    }

    public putUpdateCustomer(req: express.Request, res: express.Response){
        //return success, update customer
    }

    public putUpdateTicket(req: express.Request, res: express.Response){
        //update seat, return success/ failure
    }

    public getTickets(req: express.Request, res: express.Response){
        //return list of seats
    }

    public getRoutes(req: express.Request, res: express.Response){
        //return routes
    }

    public getStations(req: express.Request, res: express.Response){
        //return stations
    }
}
