## DevTogether

DevTogether is a social network based web application for developers/job-seekers who want to share their profiles, portfolio and experiences with other developers. This is where people can list themselves and companies can choose potential candidates from. Everyone can create a profile, update biography, education, experience, list skills and so on.

___

### Technologies used
Front-end:  [React.js](https://github.com/facebook/create-react-app) & [Redux](https://redux.js.org/introduction/getting-started/)

Back-end [Node.js](https://nodejs.org/en/) & [Express](http://expressjs.com/) 

Database: [MongodbAtlas](https://mongodb.com/) 
___
### Add a default.json file in config folder with the following
```
{
  "mongoURI": "<your_mongoDB_Atlas_uri_with_credentials>",
  "jwtSecret": "secret",
  "githubToken": "<yoursecrectaccesstoken>"
}
```
___
### Dependencies

In the project directory, you can run:

* Install dependencies for server
```
npm install
```
* Install dependencies for client
```
cd client
npm run install
```
___
### Running

* Run the client & server with concurrently
```
npm run dev
```
* Run the Express server only
```
npm run server
```
* Run the React client only
```
npm run client
```

Server runs on [http://localhost:6000](http://localhost:6000) and client on [http://localhost:3000](http://localhost:3000)

___
### Testing will be implemented soon
