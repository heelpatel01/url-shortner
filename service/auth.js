const jwt=require("jsonwebtoken");
const secret="Heel$124"

function setUser(user){
    return jwt.sign(user,secret)
}

function getUser(id){
    return sessionIdToUserMap.get(id);
}




module.exports={
    setUser,
    getUser,
}