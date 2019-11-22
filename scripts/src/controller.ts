import express from "express";
import {STATUS_CODES} from "http";
import mongodb, { ObjectID, ObjectId } from "mongodb";
import {Config} from "./config";

export class Controller {
  // public getHello(req: express.Request, res: express.Response): void {
  //   res.send("Hello World");
  // }

  // // Example of how to use query strings, any post to /api/hello/{anyString}
  // // will return that as the body of the response
  // // https://www.javatpoint.com/expressjs-request <-- useful
  // public postHello(req: express.Request, res: express.Response): void {
  //   // console.log(req.params.userid)
  //   res.send(req.params.userid);
  // }

  public getAllTrains(req: express.Request, res: express.Response) {
    // Return list of all trains
    let trainData;
    mongodb.connect(Config.database, function(err, db) {
      if (err) { throw err; }
      let dbo = db.db("trainsDB");
      trainData = dbo.collection("Users").find();
      db.close();
    })
    res.send(trainData)
  }

  public getTrain(req: express.Request, res: express.Response) {
    // Return train based on Train ID
  }

  public getUser(req: express.Request, res: express.Response) {
    // Return user info
  }

  // public postCreateUser(req: express.Request, res: express.Response) {
  //   mongodb.connect(Config.database, function(err, db) {
  //     if (err) { throw err; }
  //     const dbo = db.db("trainsDB");
  //     const myobj = req.body;
  //     dbo.collection("Users").insertOne(myobj, function(err, res) {
  //     if (err) { throw err; }
  //     console.log("1 Doc Inserted to Users");
  //     db.close();
  //     });
  //   });
  //   res.send(res.statusCode);
  // }

  public putUpdateCustomer(req: express.Request, res: express.Response) {
    mongodb.connect(Config.database, function(err, db) {
      if (err) { throw err; }
      const dbo = db.db("trainsDB");
      const myquery = { _id: req.params.userid };
      const newvalues = req.body.firstname; // double check the JSON can be passed as such
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

  public postBuyTicket(req: express.Request, res: express.Response) {
    // Update seat, return success/ failure
  }

  public archiveCustomer(req: express.Request, res: express.Response){
    mongodb.connect(Config.database, function(err, db) {
      if (err) { throw err; }
      let dbo = db.db("trainsDB");
      let myquery = { _id: req.params.userid };
      let newvalues = {role: "Archived"}
      dbo
        .collection("Users")
        .updateOne(myquery, newvalues, function(err, res) {
          if (err) { throw err; }
          console.log("1 document updated");
          db.close();
        });
    });
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

  public getUserTickets(req: express.Request, res: express.Response) {
    // returns users tickets
  }
}
