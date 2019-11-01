import {STATUS_CODES} from "http";
import mongodb, { ObjectID, ObjectId } from "mongodb";
import {Config} from "./config";

let stations: Array<[string, number, number]>; // Station code, timeToStation, RouteTo id
let routes: Array<[number, string, string]>; // Route id, start, destination
let startStation: [string, number, number]; // Station code of query start
let destStation: [string, number, number]; // Station code of where we're going
let curStation: [string, number, number]; // Station code of current station
let stationQueue: Array<[string, number, number]>; // For keeping track of which stations haven't been visited yet
let visitedQueue: Array<[string, number, number]>; // For keeping track of which stations have been visited
let startTime: number; // 12am of the selected day
let curTime: number; // Current time in the algorithm
let curRoute: [number, string, string]; // Current route in the algorithm
let currentRoutes: Array<[number, string, string]>; // The routes that start with curStation

mongodb.connect(Config.database, function(err, db) {
    if (err) { throw err; }
    const dbo = db.db("trainsDB");
    dbo.collection("stations").find().toArray(function(err, res) {
      if (err) { throw err; }
      console.log(res);
      db.close();
    });
  });

/* Put all routes into route array */
/* Put all the stations into the stations array, then initialize startStation, startTime, and destStation variables */

curTime = startTime;
stationQueue.push(startStation);

// The main algorithm
while(stationQueue.length > 0){

  // Set current station to the station at the beginning of the queue, update currentTime
  curStation = stationQueue.shift();
  curTime = curStation[1];

  // Get all the routes that start with that station
  for(let r of routes){

    if(r[1] == curStation[0]){
      currentRoutes.push(r);
    }

  }

  // Go through all the given routes
  while(currentRoutes.length > 0){

    // Get route and remove it from list
    curRoute = currentRoutes.pop();

    // Get destination station information and remove it temporarily from stations array
    let tempDest: [string, number, number];
    for(let i: number = 0;i<stations.length;i++){
      if(curRoute[2] == stations[i][0]){
        tempDest = stations[i];
        stations.splice(i, 1);
        break;
      }
    }

    /* FIND LEAVE TIME THAT IS CLOSEST TO CURRENT TIME, CALCULATE LENGTH OF THAT ROUTE

    let tempTime: number;
    // tempTime = getDistance(curRoute[0]);
    // If distance to a station is less than the existing mininimum length, change it
    if(curTime+tempTime < tempDest[1]){
      tempDest[1] = curTime+tempTime;
    }

    */
    
    // Add the destination station back to the overall list with the update time
    stations.push(tempDest);

    // If the station isn't on the queue and hasn't been visited before, add it
    if((!stationQueue.includes(tempDest)) && (!visitedQueue.includes(tempDest))){
      stationQueue.push(tempDest);
    }

  }

}