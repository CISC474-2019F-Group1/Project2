import { resolve } from "dns";
import {STATUS_CODES} from "http";
import mongodb, { Double, ObjectID, ObjectId } from "mongodb";
import {Config} from "./config";

interface Station {
  id: number;
  abbreviation: string;
  fullname: string;
  timeToStation: number;
  routeBefore: Route;
}

interface Route {
  id: number;
  startStation: string;
  destStation: string;
  train: Train;
  trips: Array<[String, String]>;
}

interface Train {
    name: string;
    capacity: number;
}

let stations: Station[]; // All the stations in the database
let routes: Route[]; // All the routes in the database

export class DatabaseEditor {

    public insert() {

        stations = [];
        routes = [];

        mongodb.connect(Config.database, function(err, db) {

            if (err) { throw err; }
            const dbo = db.db("trainsDB");

            let tempTrain: Train;
            let tempTrips: Array<[string, string]>;

            tempTrain = {
                name: "Siemens Charger SC-44",
                capacity: 100
            };

            const startOne = new Date(2019, 11, 11, 4, 0, 0, 0);
            const destOne = new Date(2019, 11, 11, 22, 0, 0, 0);
            // let startTwo = new Date(2019,11,11,10,0,0,0);
            // let destTwo = new Date(2019,11,11,18,0,0,0);
            // let startThree = new Date(2019,11,11,14,0,0,0);
            // let destThree = new Date(2019,11,11,22,0,0,0);
            // let startFour = new Date(2019,11,11,16,0,0,0);
            // let destFour = new Date(2019,11,11,22,0,0,0);
            tempTrips = [];
            for (let i = 0; i < 50; i++) {
                startOne.setDate(startOne.getDate() + 1);
                destOne.setDate(destOne.getDate() + 1);
                // startTwo.setDate(startTwo.getDate() + 1);
                // destTwo.setDate(destTwo.getDate() + 1);
                // startThree.setDate(startThree.getDate() + 1);
                // destThree.setDate(destThree.getDate() + 1);
                // startFour.setDate(startFour.getDate() + 1);
                // destFour.setDate(destFour.getDate() + 1);
                tempTrips.push([startOne.toString(), destOne.toString()]);
                // tempTrips.push([startTwo.toString(), destTwo.toString()]);
                // tempTrips.push([startThree.toString(), destThree.toString()]);
                // tempTrips.push([startFour.toString(), destFour.toString()]);
            }

            const myobj: Route = {
                id: 21,
                startStation: "SEA",
                destStation: "SFS",
                train: tempTrain,
                trips: tempTrips
            };

            dbo.collection("routes").insertOne(myobj, function(err, res) {
                if (err) { throw err; }
                console.log(myobj);
                db.close();
            });

        });

    }

    public viewData() {

        stations = [];
        routes = [];

        mongodb.connect(Config.database, function(err, db) {

            if (err) { throw err; }
            const dbo = db.db("trainsDB");

            const promise = new Promise(function(resolve, reject) {

                dbo.collection("stations").find().forEach(function(res) {
                const tempStation: Station = {
                    id: res.id,
                    abbreviation: res.abbreviation,
                    fullname: res.fullname,
                    timeToStation: Number.MAX_VALUE,
                    routeBefore: null
                };
                stations.push(tempStation);
                resolve(1);
                });

            // After stations are loaded, load routes
            }).then(function(res) {

                const promise2 = new Promise(function(resolve, reject) {

                    dbo.collection("routes").find().forEach(function(res) {
                    console.log(res.startStation + res.destStation);
                    const tempRoute: Route = {
                        id: res.id,
                        startStation: res.startStation,
                        destStation: res.destStation,
                        train: res.train,
                        trips: res.trips
                    };
                    routes.push(tempRoute);
                    resolve(1);
                    });

                }).then(function() {

                console.log(stations);
                console.log(routes);

            });

        });

    });
}

}
