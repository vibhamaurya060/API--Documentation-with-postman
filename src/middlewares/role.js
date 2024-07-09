import UserModel from "../models/userModel.js"

const role=(roles)=>{
    return async (req,res,next)=>{

        const user=await UserModel.findOne({email: req.result.email})
       if(!roles.includes(user.role)){
           return res.status(401).json({message:"You are not authorize to access this route"})
       }
       next();
    }
}


export default role;