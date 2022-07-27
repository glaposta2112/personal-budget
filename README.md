# personal-budget
## GET -  all envelopes
Method: GET <br> 
Endpoint: /envelopes <br> 
Statuses:
- 200 Success

## GET -  envelope by Id
Method: GET <br> 
Endpoint: /envelopes/:id <br>
Statuses:
- 200 Success
- 404 Id Not found

## POST -  Add new envelope
Method: POST <br> 
Endpoint: /envelopes/ <br>
Statuses:
- 201 Created
- 401 Invalid title or budget <br> <br>
Request Payload: <br>
{ <br>
  "title": string, <br>
  "budget": number <br>
} <br>

## POST -  Transfer budget from one envelope to another
Method: POST <br> 
Endpoint: /envelopes/transfer/:from/:to <br>
Statuses:
- 201 Created
- 401 Invalid transfer from or to <br> <br>
Request Payload: <br>
{ <br>
  "transfer": number <br>
} <br>

## PUT  - Update title and/or budget of an existing envelope
Method: PUT <br> 
Endpoint: /envelopes/update/:id <br>
Statuses:
- 200 Success
- 401 Invalid title or budget <br> <br>
Request Payload: <br>
{ <br>
  "title": string, <br>
  "budget": number <br>
} <br>

## DELETE - Delete an existing envelope
Method: DELETE <br> 
Endpoint: /envelopes/remove/:id <br>
Statuses:
- 200 Success
- 404 Id not found <br>

