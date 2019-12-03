import express from "express";
import { STATUS_CODES } from "http";
import mongodb, { Cursor, ObjectID, ObjectId } from "mongodb";
import { Config } from "./config";

interface Station {
  id: number;
  abbreviation: string;
  fullname: string;
  timeToStation: number;
  routeBefore: [Route, [Date, Date]];
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

  // might not need
  public getAllTrains(req: express.Request, res: express.Response) {
    // Return list of all trains

    mongodb.connect(Config.database, function(err, db) {
      if (err) {
        throw err;
      }
      const dbo = db.db("trainsDB");
      const trainData = dbo
        .collection("routes")
        .find({})
        .toArray(function(err, result) {
          if (err) {
            throw err;
          }
          res.send(trainData);
          db.close();
          console.log(trainData);
          res.send(trainData);
        });
    });
  }

  // might not need
  public getTrain(req: express.Request, res: express.Response) {
    // Return train based on Train ID
  }

  public getUser(req: express.Request, res: express.Response) {
    // Return user info
    mongodb.connect(Config.database, function(err, db) {
      if (err) {
        throw err;
      }
      const Users = db.db("trainsDB").collection("users");
      console.log(req.params.userid);
      //@ts-ignore
      Users.findOne({ email: req.user.email }, function(err, user) {
        res.send({
          email: user.email,
          lastname: user.lastname,
          firstname: user.firstname,
          trips: user.trips
        });
        db.close();
      });
    });
  }

  public putUpdateCustomer(req: express.Request, res: express.Response) {
    mongodb.connect(Config.database, function(err, db) {
      if (err) {
        throw err;
      }
      const dbo = db.db("trainsDB");
      //@ts-ignore
      const myquery = { email: req.user.email };
      console.log(req.params.userid);
      const newvalues = {
        $set: {
          lastname: req.body.lastname,
          firstname: req.body.firstname,
          trips: req.body.trips
        }
      }; // double check the JSON can be passed as such
      dbo.collection("users").updateOne(myquery, newvalues, function(err, res) {
        if (err) {
          throw err;
        }
        console.log("1 document updated");
        db.close();
      });
    });
    res.send("updated");
  }

  public postBuyTicket(req: express.Request, res: express.Response) {
    mongodb.connect(Config.database, function(err, db) {
      if (err) {
        throw err;
      }
      const users = db.db('trainsDB').collection('users');
      const trains = db.db("trainsDB").collection("routes");
      let query = parseInt(req.params.id);
      let usrQuery = req.params.userid;
      users.updateOne({_id : new ObjectId(usrQuery)}, {$push: {trips: req.body}})
      db.close();
    });
    res.send(req.body);
  }

  public getRoutes(req: express.Request, res: express.Response) {
    const result: Route[] = [];
    mongodb.connect(Config.database, function(err, db) {
      if (err) {
        throw err;
      }
      const dbo = db.db("trainsDB");

      const promise = new Promise(function(resolve, reject) {
        dbo
          .collection("routes")
          .find()
          .forEach(function(resp) {
            const tempRoute: Route = {
              id: resp.id,
              startStation: resp.startStation,
              destStation: resp.destStation,
              train: resp.train,
              trips: resp.trips
            };
            result.push(tempRoute);
            resolve(1);
          });
      }).then(function() {
        res.send(result);
      });
    });
  }

  public getStations(req: express.Request, res: express.Response) {
    const result: Station[] = [];
    mongodb.connect(Config.database, function(err, db) {
      if (err) {
        throw err;
      }
      const dbo = db.db("trainsDB");

      const promise = new Promise(function(resolve, reject) {
        dbo
          .collection("stations")
          .find()
          .forEach(function(resp) {
            const tempStation: Station = {
              id: resp.id,
              abbreviation: resp.abbreviation,
              fullname: resp.fullname,
              timeToStation: Number.MAX_VALUE,
              routeBefore: null
            };
            result.push(tempStation);
            resolve(1);
          });
      }).then(function() {
        res.send(result);
      });
    });
  }

  public getUserTickets(req: express.Request, res: express.Response) {
    // returns users tickets
  }
}
