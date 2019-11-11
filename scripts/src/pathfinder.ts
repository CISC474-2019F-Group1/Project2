import {STATUS_CODES} from "http";
import mongodb, { ObjectID, ObjectId, Double } from "mongodb";
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
  train: string;
  trips: Array<[Date, Date]>;
}

let stations: Station[]; // All the stations in the database
let routes: Route[]; // All the routes in the database
let startStation: Station; // Station of query start
let desStation: Station; // Station of where we're going
let curStation: Station; // Station of current station
let stationQueue: Station[]; // For keeping track of which stations haven't been visited yet
let visitedQueue: Station[]; // For keeping track of which stations have been visited
let startTime: number; // 12am of the selected day
let curTime: number; // Current time in the algorithm
let curRoute: Route; // Current route in the algorithm
let currentRoutes: Route[]; // The routes that start with curStation

export class Pathfinder {

public findPath(route: string, startDate: Date) {

  stations = [];
  routes = [];
  stationQueue = [];
  visitedQueue = [];

  // Push stations from database into stations array
  mongodb.connect(Config.database, function(err, db) {

      if (err) { throw err; }
      const dbo = db.db("trainsDB");

      // Create a promise so all the data is loaded before the rest of the code is run
      const promise = new Promise(function(resolve, reject){

        dbo.collection("stations").find().forEach(function(res) {
          let tempStation: Station = {
            id: res.id,
            abbreviation: res.abbreviation,
            fullname: res.fullname,
            timeToStation: Number.MAX_VALUE,
            routeBefore: null
          }
          stations.push(tempStation);
          resolve(123);
        });

      // After stations are loaded, load routes
      }).then(function(res){

        dbo.collection("routes").find().forEach(function(res) {
          let tempRoute: Route = {
            id: res.id,
            startStation: res.startStation,
            destStation: res.destStation,
            train: res.train,
            trips: res.trips
          }
          routes.push(tempRoute);
        });

    // After routes are loaded, run the rest of the code
    }).then(function(){

      // Initialize startStation, destStation, and startTime variables
      let startString = route.substr(0,3);
      let destString = route.substr(3,3);
      startStation = stations.find(function(element){
        return element.abbreviation == startString;
      });
      desStation = stations.find(function(element){
        return element.abbreviation == destString;
      });
      startTime = startDate.getTime();
      curTime = startTime;
      stationQueue.push(startStation);

      // The main algorithm
      while(stationQueue.length > 0){

        // Set current station to the station at the beginning of the queue, update currentTime
        curStation = stationQueue.shift();
        curTime = startTime + curStation.timeToStation;

        // Get all the routes that start with that station
        for(let r of routes){

          if(r.startStation == curStation.abbreviation){
            currentRoutes.push(r);
          }

        }

        // Go through all the given routes
        while(currentRoutes.length > 0){

          // Get route and remove it from list
          curRoute = currentRoutes.pop();

          // Get destination station information and remove it temporarily from stations array
          let tempDest: Station;
          for(let i: number = 0;i<stations.length;i++){
            if(curRoute.destStation == stations[i].abbreviation){
              tempDest = stations[i];
              stations.splice(i, 1);
              break;
            }
          }

          // Find trip that is starts after currentTime that ends the earliest
          let curTimes = curRoute.trips;
          let timeTo: Array<[Date,Date,number]>; // Route start date, Route dest date, time from overall start date to route dest time
          for(let i = 0;i<curTimes.length;i++){
            timeTo.push([curTimes[i][0], curTimes[i][1], curTimes[i][1].getTime()-startTime]);
          }

          let minRoute: [Date, Date];
          let minTime = Number.MAX_VALUE;
          // Find route that ends the soonest
          for(let i = 0;i<timeTo.length;i++){
            // If it starts after current time and is less than the current minimum time, set the new minimum route
            if((timeTo[i][2] < minTime) && (timeTo[i][0].getTime() > curTime)){
              minRoute = [timeTo[i][0], timeTo[i][1]];
              minTime = timeTo[i][2];
            }
          }

          // Check if the time to the destination is less than the current marked time, change it if it is
          if(minTime < tempDest.timeToStation){
            tempDest.timeToStation = minTime;
            tempDest.routeBefore = curRoute;
          }

          // Add the destination station back to the overall list with the update time
          stations.push(tempDest);

          // If the station isn't on the queue and hasn't been visited before, add it
          if((!stationQueue.includes(tempDest)) && (!visitedQueue.includes(tempDest))){
            stationQueue.push(tempDest);
          }

        }

      }

    });

  });

}

}