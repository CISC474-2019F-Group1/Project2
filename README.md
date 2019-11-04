# Project2
Express/Mongo server application (to be used as backend for module 3)


# API DOC

## Quick reference 

| ROUTE | HTTP METHOD  | CONSUMES  | RETURNS  | DESCRIPTION |
| ----------- | --------------- | --------- | ----------- | ------ |
| /user/updateUsr/{userId}   | PUT          |   JSON    | Statuscode      | Updates user profile |
| /createUsr    | POST  |  JSON  | OAuth Token | Create and authenticate user |
| /login  | POST  | JSON | OAuth Token | Login in User |
| /authorize | GET | N/A | Status(200) | TODO |
| /allTrains | GET | N/A | JSON | Gets all trains as JSON  |
| /train/{trainId} | GET | JSON | JSON | Gets train by train ID as JSON | 
| /getUsrData/{userId} | GET | User ID | JSON | Returns user profile |
| /routes | GET | N/A | JSON | Returns JSON of availibe routes |
| /user/tickets/{userId} | GET | User ID | JSON | Returns JSON of users ticket history|



