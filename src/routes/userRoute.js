import {Router} from 'express'
import UserModel from '../models/userModel.js';
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken';

const userRouter=Router();


// for schema

/**
 * @swagger
 *  components:
 *    schemas:
 *      UserRegister:
 *        type: object
 *        properties:
 *          username:
 *            type: string
 *          email:
 *            type: string
 *          password: 
 *            type: string
 *          role:
 *            type: string
 *      UserLogin:
 *        type: object
 *        properties:
 *          email:
 *            type: string
 *          password: 
 *            type: string
 *      
 */


// for routes

/**
 * @swagger
 * /register:
 *   post:
 *     description: this is the route for user registeration.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#components/schemas/UserRegister"
 *     responses:
 *       '200':
 *         description: You will get the messsge for registation 
 *     
 */


/**
 * @swagger
 * /login:
 *   post:
 *     description: this is the route for user login.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#components/schemas/UserLogin"
 *     responses:
 *       '200':
 *         description: You will get the messsge for login. 
 */


/**
 * @swagger
 * /logout:
 *   get:
 *     description: this is the route for user logout.
 *     responses:
 *       '200':
 *         description: You will get the messsge for logout 
 *     
 */


userRouter.post('/register', async(req,res)=>{
    const {username, email, password}=req.body;
    try{
        if(!username || !email || !password){
            res.status(400).json({message:"this is a not a valid body."})
        }

        // we have to check if email is present or not
        const existUser=await UserModel.findOne({email: email})

        if(existUser){
            res.status(400).json({message:"this email is already registered try to login."})
        }

        const hashPassword=bcrypt.hashSync(password, 12);

        const user=new UserModel({email, password:hashPassword, username});
        await user.save();
        res.status(201).json({message:"user is registered successfully"});

    }catch(err){
        res.status(500).send(err);
    }
});


userRouter.post('/login', async(req,res)=>{
    const {email, password}=req.body;

    try{
        if(!email || !password){
            res.status(400).json({message:"this is a not a valid body"});
        }

        const existUser=await UserModel.findOne({email: email});

        if(!existUser){
            res.status(400).json({message:"This email  is not registered try to register."})
        }

        // now we have to compare the password

        bcrypt.compare( password, existUser.password, (err, result)=>{
            if(err) console.log(err)
            if(result){
                const payload= {email:existUser.email, id: existUser._id};
                jwt.sign(payload, process.env.JWT_SECRET,(err,token)=>{
                if(err) console.log(err);
                return res.status(200).json({accessToken: token})
            })
 
            }else{
               res.status(400).json({message: "user information is not correct try to check your details"})
            }
        })

    }catch(err){
        res.status(500).send(err);
    }
});


userRouter.get('/logout', async(req,result)=>{
    try{

    }catch(err){
        res.status(500).send(err);
    }
});

export default userRouter;