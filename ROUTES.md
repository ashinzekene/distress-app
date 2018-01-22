# ROUTES

## DISTRESS

### GET ALL DISTRESS
#### - URL
/
#### - METHOD
GET
#### - PARAMETER
#### - SUCCESS RESPONSE
[ Distress ]
#### - ERROR RESPONSE
{ err: String }


### GET A DISTRESS
#### - URL
/:id
#### - METHOD
GET
#### - SUCCESS RESPONSE
Distress
#### - ERROR RESPONSE
{ err: String }


### CREATE A DISTRESS
#### - URL
/new
#### - METHOD
POST
#### - SUCCESS RESPONSE
Distress
#### - ERROR RESPONSE
{ err: String }


### FIND A DISTRESS
#### - URL
/search
#### - METHOD
Get
#### - PARAMETER
title [string]
author [string]
location [string]
category [string]
limit [integer] max - 50
offset [integer]
#### - SUCCESS RESPONSE
#### - ERROR RESPONSE
{ err: String }


### FIND A DISTRESS
#### - URL
/search
#### - METHOD
POST
#### - BODY
```json
{
  title: string
  author: string
  location: string
  category: string
  limit: integer
  offset: integer
}
```
#### - SUCCESS RESPONSE
#### - ERROR RESPONSE
{ err: String }


### APPROVE A DISTRESS
#### - URL
/:id/approve
#### - METHOD
POST
#### - SUCCESS RESPONSE
Distress
#### - ERROR RESPONSE
{ err: String }


### DISPROVE A DISTRESS
#### - URL
/:id/disprove
#### - METHOD
POST
#### - SUCCESS RESPONSE
Distress
#### - ERROR RESPONSE
{ err: String }


## COMMENT

### CREATE A COMMENT
#### - URL
/new
#### - METHOD
POST
#### - SUCCESS RESPONSE
Distress
#### - ERROR RESPONSE
{ err: String }


### GET A COMMENT
#### - URL
/:id
#### - METHOD
GET
#### - SUCCESS RESPONSE
Comment
#### - ERROR RESPONSE
{ err: String }


### SEARCH COMMENTS
#### - URL
/search
#### - METHOD
POST
#### - BODY
{
  distress: Distress,
  user: optional<User>
}
#### - SUCCESS RESPONSE
[Comment]
#### - ERROR RESPONSE
{ err: String }


### GET ALL COMMENTS
#### - URL
/
#### - idMETHOD
GET
#### - PARAMETER
limit [integer] max - 50
offset [integer]
#### - SUCCESS RESPONSE
[Comment]
#### - ERROR RESPONSE
{ err: String }


### COMMENTS FOR A DISTRESS
#### - URL
/:disressid/comments
#### - idMETHOD
GET
#### - PARAMETER
limit [integer] max - 50
offset [integer]
#### - SUCCESS RESPONSE
[Comment]
#### - ERROR RESPONSE
{ err: String }
