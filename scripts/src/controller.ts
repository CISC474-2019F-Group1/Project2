import express from "express";
import {STATUS_CODES} from "http";
import mongodb, { ObjectID, ObjectId } from "mongodb";
import {Config} from "./config";

export class Controller {
  public getHello(req: express.Request, res: express.Response): void {
    res.send("Hello World");
  }

  // example of how to use query strings, any post to /api/hello/{anyString}
  // will return that as the body of the response
  // https://www.javatpoint.com/expressjs-request <-- useful

  public postHello(req: express.Request, res: express.Response): void {
    // console.log(req.params.userid)
    res.send(req.params.userid);
  }

  public getAllTrains(req: express.Request, res: express.Response) {
    // return list of all trains
  }

  public getTrain(req: express.Request, res: express.Response) {
    // return train based on Train ID
  }

  public getUser(req: express.Request, res: express.Response) {
    // return user info
  }

  public postCreateUser(req: express.Request, res: express.Response) {
    mongodb.connect(Config.database, function(err, db) {
      if (err) { throw err; }
      const dbo = db.db("trainsDB");
      const myobj = req.body;
      dbo.collection("customers").insertOne(myobj, function(err, res) {
        if (err) { throw err; }
        console.log("1 document inserted into Users");
        db.close();
      });
    });
    res.send(res.statusCode);
  }

  public putUpdateCustomer(req: express.Request, res: express.Response) {
    // return success, update customer
    mongodb.connect(Config.database, function(err, db) {
      if (err) { throw err; }
      let dbo = db.db("trainsDB");
      let myquery = { _id : new ObjectId("5db3359121427b0e707a0ac7") };
      let newvalues = { $set: { firstName: "Peter", lastName: "Canyon" } };
      dbo
        .collection("Users")
        .updateOne(myquery, newvalues, function(err, res) {
          if (err) { throw err; }
          console.log("1 document updated");
          db.close();
        });
    });
    res.send(res.statusCode);
  }

  public putUpdateTicket(req: express.Request, res: express.Response) {
    // update seat, return success/ failure
  }

  public getTickets(req: express.Request, res: express.Response) {
    // return list of seats
  }

  public getRoutes(req: express.Request, res: express.Response) {
    // return routes
  }

  public getStations(req: express.Request, res: express.Response) {
    // return stations
  }
}
