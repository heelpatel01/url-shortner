const { v4: uuidv4 } = require('uuid');
const {setUser,getUser}=require('../service/auth')

const User= require('../models/user');

const handleUserSignup=async(req,res)=>{
    const {name,email,password}=req.body;
    await User.create({
        name,
        email,
        password
    });

    return res.redirect('/')
}

const handleUserLogin=async(req,res)=>{
    const{email,password}=req.body;
    const user= await User.findOne({email,password});  

    if(!user) 
    return res.render("login",{error:"username or password is wrong"});

    
    setUser(user);
    res.cookie('uid');
    return res.redirect('/');
}

module.exports={handleUserSignup,handleUserLogin,};