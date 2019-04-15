const express = require('express');
const app = express();
const mongoose = require('mongoose')
const port = 5000;
const keys = require('./config/keys')
const bodyParser = require('body-parser');
const passport = require('passport');

//Adding Body-Parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Importing routes
const userRoutes = require('./routes/api/users');
const profileRoutes = require('./routes/api/profile');
const postRoutes = require('./routes/api/posts');


//Express Routes
app.use('/api/users' , userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/posts', postRoutes)

//Passport Middleware
app.use(passport.initialize());

//Passport Config
require ('./config/passport')(passport)

//DB Connection
mongoose.connect(keys.mongoURI, { useNewUrlParser: true })
.then(() => {console.log('MongoDB is connected')})
.catch((err) => {console.log(err)})



//Server
app.listen(port, (req,res)=>{
   console.log(`Server is running on ${port}`)
})
