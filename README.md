# CSV API
This is a simple API in typescript that accepts a formatted CSV string and saves its users' informations.

### Clone this project
```
git clone https://github.com/otavio-n/csv-api.git
```
### Install dependencies
```
npm install
```
### Run the tests
```
npm run test
```
### Run the app
```
npm run dev
```

## REST API
The REST API for this project is described in the following.

### Create list of users with formatted CSV
#### Example request 
`POST /api/files`

```
curl --location 'localhost:3000/api/files' \
--header 'Content-Type: application/json' \
--data '{
  "file": "name,city,country,favorite_sport\nKaren Lee,Tokyo,Japan,Swimming\nTom Brown,Sydney,Australia,Running\nEmma Wilson,Berlin,Germany,Basketball"

}'
```
#### Response
```
Status: 201 Created
```

### List all users
#### Request
`GET /api/users`

```
curl --location 'localhost:3000/api/users'
```
#### Example response
```
Status: 200 OK
Body: [{"id":"1","name":"John Doe","city":"New York","country":"USA","favorite_sport":"Basketball"},{"id":"2","name":"Jane Smith","city":"London","country":"UK","favorite_sport":"Football"}]
```
### List users by query
#### Example request
`GET /api/users`

```
curl --location 'localhost:3000/api/users?q=mike'
```
#### Example response
```
Status: 200 OK
Body: [{"id":"3","name":"Mike Johnson","city":"Paris","country":"France","favorite_sport":"Tennis"}]
```

## Observations
- some users are already saved in the in-memory repository for testing
- to add a database you should create another repository for the database client and attribute it in the modules' factories
- the user's name is considered unique, so the app does not save two users with the same name (suggestion: add a unique user property, such as email)
