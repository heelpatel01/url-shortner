const express=require("express");
const {connectToMongoDB}=require('./connect')
const path= require('path')
const urlRoute=require('./routes/url');
const URL=require('./models/url');
const staticRoute=require('./routes/staticRouter')

const app= express();
const PORT= 8001;
// const URL = require('./models/url')
connectToMongoDB('mongodb://127.0.0.1:27017/short-url').then(()=>{console.log("MONGODB CONNECTED")})

app.set('view engine', 'ejs');
app.set('views',path.resolve("./views"))

app.use(express.json())
app.use(express.urlencoded({extended:false}))




// app.get('/test',async(req,res)=>{
//     const allUrls= await URL.find({});
//     return res.end(`
//     <html>
//     <head>
//         <title>Your HTML Page</title>
//     </head>
//     <body>
//         <ol>
//             ${allUrls.map((url) => {
//                 return `<li>${url.shortId} - ${url.redirectURL} - ${url.visitHistory.length} Short URL:- localhost:8001/url/${url.shortId}</li>`;
//             })}
//         </ol>
//     </body>
//     </html>
    
//     `)
// })

app.get('/',async(req,res)=>{
    const allUrls=await URL.find({});
    return res.render("home",{
        urls: allUrls,
    });
})
app.use('/url',urlRoute);
app.use('/',staticRoute)

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
