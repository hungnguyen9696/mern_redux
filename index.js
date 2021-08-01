const express = require('express');
const app = express();
const connectDB = require('./config/db');
const bodyParser = require('body-parser');

const auth = require('./routes/api/auth');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');
const users = require('./routes/api/users');

const PORT = process.env.PORT || 5000;

//connect db
connectDB();

//init middlewares

app.use(express.json());
//replace of app.use(bodyParser);
//https://github.com/expressjs/express/blob/master/lib/express.js#L78
//https://expressjs.com/en/api.html#express.json



//define routes
app.use('/api/auth', auth);
app.use('/api/posts', posts);
app.use('/api/profile', profile);
app.use('/api/users', users);


app.get('/', (req, res)=> {
    res.send('server running')
});

app.listen(PORT, () => console.log(`server started on port ${PORT}`));

