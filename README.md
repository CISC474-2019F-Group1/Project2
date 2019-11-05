# Project2

Express/Mongo server application (to be used as backend for module 3)

# API DOC

## Quick reference

| ROUTE                                                | HTTP METHOD | CONSUMES | RETURNS     | DESCRIPTION                              |
| ---------------------------------------------------- | ----------- | -------- | ----------- | ---------------------------------------- |
| [/user/updateUsr/{userId}](#userupdateUsr{userId}) | PUT         | JSON     | Statuscode  | Updates user profile                     |
| [/createUsr](#createUsr)                             | POST        | JSON     | OAuth Token | Create and authenticate user             |
| [/login](#login)                                    | POST        | JSON     | OAuth Token | Login in User                            |
| [/authorize](#authorize)                            | GET         | N/A      | Status(200) | TODO                                     |
| [/allTrains](#allTrains)                            | GET         | N/A      | JSON        | Gets all trains as JSON                  |
| [/train/{trainId}](#train{trainId})                | GET         | JSON     | JSON        | Gets train by train ID as JSON           |
| [/getUsrData/{userId}](#getUsrData{userId})        | GET         | User ID  | JSON        | Returns user profile                     |
| [/routes](#routes)                                  | GET         | N/A      | JSON        | Returns JSON of available routes         |
| [/user/tickets/{userId}](#usertickets{userId})    | GET         | User ID  | JSON        | Returns JSON of users ticket history     |
| [/user/assignTicket](#userassignTicket)             | POST        | JSON     | Statuscode  | Registers a ticket to a user             |
| [/user/{userId}](#user{userId})                    | DELETE      | N/A      | Status(200) | Archives user to be deleted after a time |

---

## Full Reference

---

## /authorize

### Headers

    - "Bearer" : OAuth Token 

### Body

    - N/A

### Returns

    - N/A

#### [Back to top](#quick-reference)
---

## /login

### Headers

    - TODO

### Body

    {
        "email" : string,
        "password" : string
    }

### Returns

    - 
#### [Back to top](#quick-reference)
---
## /allTrains

### Headers

    - N/A

### Body

    - N/A

### Returns

    -

#### [Back to top](#quick-reference)
---
## /train/{trainId}

### Headers

    - N/A

### Body

    - N/A

### Returns

    -   

#### [Back to top](#quick-reference)
---
## /routes 

### Headers

    - N/A

### Body

    - N/A

### Returns

    -

#### [Back to top](#quick-reference)
---
## /createUsr

### Headers

    - N/A

### Body

    - N/A

### Returns

    -

#### [Back to top](#quick-reference)
---
## /getUsrData/{userId}

### Headers

    - N/A

### Body

    - N/A

### Returns

    -

#### [Back to top](#quick-reference)
---
## /user/tickets/{userId}

### Headers

    - N/A

### Body

    - N/A

### Returns

    -

#### [Back to top](#quick-reference)
---
## /user/tickets/{userId}

### Headers

    - N/A

### Body

    - N/A

### Returns

    -

#### [Back to top](#quick-reference)
---
## /user/assignTicket

### Headers

    - N/A

### Body

    - N/A

### Returns

    -

#### [Back to top](#quick-reference)
---
## /user/{userId}

### Headers

    - N/A

### Body

    - N/A

### Returns

    -

#### [Back to top](#quick-reference)
---
## /user/updateUsr/{userId}

### Headers

    - N/A

### Body

    - N/A

### Returns

    -

#### [Back to top](#quick-reference)
---