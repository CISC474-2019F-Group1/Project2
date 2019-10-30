import express from "express";
import mongodb, { ObjectID, ObjectId } from "mongodb";
import { url } from "./login";
const MongoClient = mongodb.MongoClient;
// The above will need to change, may need to talk to silber

export class Controller {
  public getHello(req: express.Request, res: express.Response): void {
    res.send("Hello World");
  }

  // Example of how to use query strings, any post to /api/hello/{anyString}
  // will return that as the body of the response
  // https://www.javatpoint.com/expressjs-request <-- useful

  public postHello(req: express.Request, res: express.Response): void {
    // console.log(req.params.userid)
    res.send(req.params.userid);
  }

  public getAllTrains(req: express.Request, res: express.Response) {
    // Return list of all trains
  }

  public getTrain(req: express.Request, res: express.Response) {
    // Return train based on Train ID
  }

  public getUser(req: express.Request, res: express.Response) {
    // Return user info
  }

  public postCreateUser(req: express.Request, res: express.Response) {
    mongodb.MongoClient.connect(url, function(err, db) {
      if (err) { throw err; }
      let dbo = db.db("trainsDB");
      let myobj = req.body;
      // Will only work with header content-type set to application/json
      dbo.collection("Users").insertOne(myobj, function(err, res) {
        if (err) { throw err; }
        console.log("1 document inserted into Users");
        db.close();
      });
    });
    res.send(res.statusCode);
  }

  public putUpdateCustomer(req: express.Request, res: express.Response) {
    mongodb.connect(url, function(err, db) {
      if (err) { throw err; }
      let dbo = db.db("trainsDB");
      let myquery = { _id: new ObjectId("5db3359121427b0e707a0ac7") };
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
    // Update seat, return success/ failure
  }

  public getTickets(req: express.Request, res: express.Response) {
    // Return list of seats
  }

  public getRoutes(req: express.Request, res: express.Response) {
    // Return routes
  }

  public getStations(req: express.Request, res: express.Response) {
    // Return stations
  }
}
