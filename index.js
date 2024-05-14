const express=require("express");
const {connectToMongoDB}=require('./connect')
const path= require('path')
const cookieParser=require('cookie-parser')

const {restrictToLoggedinUserOnly,justAuth}=require("./middlewares/auth")
const urlRoute=require('./routes/url');
const staticRoute=require('./routes/staticRouter')
const userRoute=require('./routes/user')

const app= express();
const PORT= 8001;
const URL = require('./models/url')
connectToMongoDB('mongodb://127.0.0.1:27017/short-url').then(()=>{console.log("MONGODB CONNECTED")})

app.set('view engine', 'ejs');
app.set('views',path.resolve("./views"))

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

app.use('/user',userRoute);
app.use('/url',restrictToLoggedinUserOnly,urlRoute);
app.use('/',justAuth,staticRoute);

app.get('/url/:shortId',async(req,res)=>{
    const shortId=req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },{
        $push:{
        visitHistory:{
           timestamp : Date.now(),
        },
    }})
    res.redirect(entry.redirectURL)
});

app.listen(PORT,()=>{console.log("Server Started")});
