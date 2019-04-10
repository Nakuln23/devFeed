const express = require('express');
const app = express();
const mongoose = require('mongoose')
const port = 5000;
const keys = require('./config/keys')

//Importing routes
const userRoutes = require('./routes/api/users');
const profileRoutes = require('./routes/api/profile');
const postRoute = require('./routes/api/posts');


//Express Routes
app.use('/api/users' , userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/posts', postRoutes)


//DB Connection
mongoose.connect(keys.mongoURI)
.then(() => {console.log('MongoDB is connected')})
.catch((err) => {console.log(err)})



//Server
app.listen(port, (req,res)=>{
   console.log(`Server is running on ${port}`)
})
