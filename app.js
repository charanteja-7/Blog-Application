require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser= require('cookie-parser')
const path = require('path');
const Blog = require('./models/blog');
const methodOverride = require('method-override');

const { checkForAuthenticationCookie } = require('./middlewares/authentication');

const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');
const commentRoute = require('./routes/comment');

const app = express();
const PORT = process.env.PORT||8000 ;


// connect db using atlas
mongoose.connect(process.env.MONGO_URL)
    .then(()=> console.log('mongodb connected'))
    .catch(()=>console.log('error connecting mongodb'))


//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve('./public')));
app.use(methodOverride('_method'));
app.use(cors());
//ejs 
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

//routes
app.use('/user',userRoute);
app.use('/blog',blogRoute);
app.use('/blog/comment',commentRoute);

//routes 
app.get('/', async(req, res) =>{
    const allBlogs = await Blog.find({}).sort({createdAt : -1}).populate("createdBy");
    return res.render('home', {
        user : req.user,
        blogs : allBlogs,
    })
})

//run the server 
app.listen(PORT, ()=>{
    console.log(`server running art port : ${PORT}`);
})