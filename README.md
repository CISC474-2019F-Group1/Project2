# Project2

Express/Mongo server application (to be used as backend for module 3)

# API DOC

## Quick reference

| ROUTE                                     | HTTP METHOD | CONSUMES | RETURNS     | DESCRIPTION                        |
| ----------------------------------------- | ----------- | -------- | ----------- | ---------------------------------- |
| [/userInfo](#userInfo)                    | PUT         | JSON     | Statuscode  | Updates user profile               |
| [/updatePassword](#updatePassword)        | PUT         | JSON     | Statuscode  | Updates user password              |
| [/getTicket](#getTicket)                  | POST        | JSON     | Statuscode  | Reserves ticket for user           |
| [/register](#register)                    | POST        | JSON     | OAuth Token | Create and authenticate user       |
| [/login](#login)                          | POST        | JSON     | OAuth Token | Login in User                      |
| [/authorize](#authorize)                  | GET         | N/A      | StatusCode  | Checks if user is still authorized |
| [/allTrains](#allTrains)                  | GET         | N/A      | JSON        | Gets all trains as JSON            |
| [/train/{trainId}](#traintrainId)         | GET         | JSON     | JSON        | Gets train by train ID as JSON     |
| [/trains](#trains)                        | GET         | N/A      | JSON        | Returns all trains                 |
| [/userInfo](#userInfo)                    | GET         | N/A      | JSON        | Returns user profile               |
| [/routes](#routes)                        | GET         | N/A      | JSON        | Returns JSON of available routes   |
| [/stations](#useruserId)                  | GET         | N/A      | JSON        | Returns list of Stations           |
| [/path/:fromto/:date](#/path/fromto/date) | GET         | Params   | JSON        | Returns route from station A to B  |
| [/refresh](#/refresh)                     | GET         | JSON     | JSON        | Refreshes user Token               |

---

## Full Reference

---

## /authorize

### POST

### Headers

    - "Bearer" : OAuth Token

### Body

    - N/A

### Returns

    HTTP Status Code

#### [Back to top](#quick-reference)

---

## /login

### POST

### Headers

    - N/A

### Body

    {
        "email" : string,
        "password" : string
    }

### Returns

    {
        "Bearer" : string,
        "user" : Object,
        "expiresIn" : int64
    }

#### [Back to top](#quick-reference)

---

## /routes

### GET

### Headers

    - N/A

### Body

    - N/A

### Returns

    {
        [
            {
                _id: ObjectID
            },
            {
                id: String
            },
            {
                startStation: String
            },
            {
                endStation: String
            },
            {
                trains: Array[String]
            },
            {
                times: Array[Object{startTime: Date, endTime: Date}]
            }
        ],
    }

#### [Back to top](#quick-reference)

---

## /register

### POST

### Headers

    - N/A

### Body

    {
        _id: ObjectID,
        firstName: String,
        lastName: String,
        email: String,
        password: String,
        trips: Array[Object{id: ObjectID, cost: Int64, route: String}]
    }

### Returns

    {
        "Bearer" : string,
        "user" : Object,
        "expiresIn" : int64
    }

#### [Back to top](#quick-reference)

---

## /userInfo

### GET

### Headers

    - "Bearer" : OAuth Token

### Body

    - N/A

### Returns

    {
        _id: ObjectID,
        firstName: String,
        lastName: String,
        email: String,
        password: String,
        trips: Array[Object{id: ObjectID, cost: Int64, route: String}]
    }

#### [Back to top](#quick-reference)

---

## /getTicket

### POST

### Headers

    - "Bearer" : OAuth Token

### Body

    {
        "startStation": String,
        "destStation": String,
        "startTime": String,
        "destTime": String
    }

### Returns

    HTTP Status Code

#### [Back to top](#quick-reference)

---

## /userInfo

### PUT

### Headers

    - "Bearer" : OAuth Token

### Body

    {
        _id: ObjectID,
        firstName: String,
        lastName: String,
        email: String,
        password: String,
        trips: Array[Object{id: ObjectID, cost: Int64, route: String}]
    }

### Returns

    HTTP Status Code

#### [Back to top](#quick-reference)

---
