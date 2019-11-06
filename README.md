# Project2

Express/Mongo server application (to be used as backend for module 3)

# API DOC

## Quick reference

| ROUTE                                                | HTTP METHOD | CONSUMES | RETURNS     | DESCRIPTION                              |
| ---------------------------------------------------- | ----------- | -------- | ----------- | ---------------------------------------- |
| [/user/updateUsr/{userId}](#userupdateUsruserId) | PUT         | JSON     | Statuscode  | Updates user profile                     |
| [/createUsr](#createUsr)                             | POST        | JSON     | OAuth Token | Create and authenticate user             |
| [/login](#login)                                    | POST        | JSON     | OAuth Token | Login in User                            |
| [/authorize](#authorize)                            | GET         | N/A      | StatusCode | TODO                                     |
| [/allTrains](#allTrains)                            | GET         | N/A      | JSON        | Gets all trains as JSON                  |
| [/train/{trainId}](#traintrainId)                | GET         | JSON     | JSON        | Gets train by train ID as JSON           |
| [/getUsrData/{userId}](#getUsrDatauserId)        | GET         | User ID  | JSON        | Returns user profile                     |
| [/routes](#routes)                                  | GET         | N/A      | JSON        | Returns JSON of available routes         |
| [/user/tickets/{userId}](#userticketsuserId)    | GET         | User ID  | JSON        | Returns JSON of users ticket history     |
| [/user/assignTicket](#userassignTicket)             | POST        | JSON     | StatusCode  | Registers a ticket to a user             |
| [/user/{userId}](#useruserId)                    | DELETE      | N/A      | StatusCode | Archives user to be deleted after a time |

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
        "oauth" : string
    }

#### [Back to top](#quick-reference)
---
## /allTrains
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
                name: String
            },
            {
                type: String
            },
            {
                capacity: Int64
            }
        ],
    }

#### [Back to top](#quick-reference)
---
## /train/{trainId}
### GET
### Headers

    - N/A

### Body

    - N/A

### Returns

    {
        _id: ObjectID,
        name: String,
        type: String,
        capacity: Int64
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
## /createUsr
### POST
### Headers

    - N/A

### Body

    {
        id: ObjectID,
        firstName: String,
        lastName: String,
        email: String,
        username: String,
        password: String,
        role: String,
        trips: Array[Object{id: ObjectID, cost: Int64, route: String}]
    }

### Returns

    {
        "oauth" : string
    }

#### [Back to top](#quick-reference)
---
## /getUsrData/{userId}
### GET
### Headers

    - "Bearer" : OAuth Token 

### Body

    - N/A

### Returns

    {
        id: ObjectID,
        firstName: String,
        lastName: String,
        email: String,
        username: String,
        password: String,
        role: String,
        trips: Array[Object{id: ObjectID, cost: Int64, route: String}]
    }

#### [Back to top](#quick-reference)
---
## /user/tickets/{userId}
### GET
### Headers

    - "Bearer" : OAuth Token 

### Body

    - N/A

### Returns

    {
        [
            {
                id: ObjectID
            },
            {
                cost: Int64
            },
            {
                route: String
            },
            {
                id: ObjectID
            }
        ],
    }

#### [Back to top](#quick-reference)
---
## /user/assignTicket
### POST
### Headers

    - "Bearer" : OAuth Token 

### Body

    - N/A

### Returns

    HTTP Status Code

#### [Back to top](#quick-reference)
---
## /user/{userId}
### DELETE
### Headers

    - "Bearer" : OAuth Token 

### Body

    - N/A

### Returns

    - 

#### [Back to top](#quick-reference)
---
## /user/updateUsr/{userId}
### PUT
### Headers

    - "Bearer" : OAuth Token 

### Body

    - N/A

### Returns

    HTTP Status Code

#### [Back to top](#quick-reference)
---