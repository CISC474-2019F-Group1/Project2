import express from "express";
import {STATUS_CODES} from "http";
import mongodb, { ObjectID, ObjectId, Cursor } from "mongodb";
import {Config} from "./config";

interface Station {
  id: number;
  abbreviation: string;
  fullname: string;
  timeToStation: number;
  routeBefore: [Route,[Date,Date]];
}

interface Route {
  id: number;
  startStation: string;
  destStation: string;
  train: Train;
  trips: Array<[string, string]>;
}

interface Train {
  name: string;
  capacity: number;
}

interface Ticket {
  id: number,
  routeId: number,
  cost: number,
  startPlace: String,
  destPlace: String,
  startTime: String,
  destTime: String
}

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

  public putUpdateTicket(req: express.Request, res: express.Response) {
    // Update seat, return success/ failure
  }

  public getTickets(req: express.Request, res: express.Response) {
    // Return list of seats
  }

  public getRoutes(req: express.Request, res: express.Response) {
    let result: Route[] = [];
    mongodb.connect(Config.database, function(err, db) {

      if (err) { throw err; }
      const dbo = db.db("trainsDB");

      const promise = new Promise(function(resolve, reject){

        dbo.collection("routes").find().forEach(function(resp){
          let tempRoute: Route = {
            id: resp.id,
            startStation: resp.startStation,
            destStation: resp.destStation,
            train: resp.train,
            trips: resp.trips
          }
          result.push(tempRoute);
          resolve(1);
        });

      }).then(function(){

        res.send(result);

      });

    });

  }

  public getStations(req: express.Request, res: express.Response) {
    
    let result: Station[] = [];
    mongodb.connect(Config.database, function(err, db) {

      if (err) { throw err; }
      const dbo = db.db("trainsDB");

      const promise = new Promise(function(resolve, reject){

        dbo.collection("stations").find().forEach(function(resp){
          let tempStation: Station = {
            id: resp.id,
            abbreviation: resp.abbreviation,
            fullname: resp.fullname,
            timeToStation: Number.MAX_VALUE,
            routeBefore: null
          }
          result.push(tempStation);
          resolve(1);
        });

      }).then(function(){

        res.send(result);

      });

    });

  }

  public getUserTickets(req: express.Request, res: express.Response) {
    // returns users tickets
  }
}
