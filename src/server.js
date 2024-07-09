import  express from 'express';

import {config} from 'dotenv';
import ConnectToDb from './config/db.js';
import userRouter from './routes/userRoute.js';
import taskRouter from './routes/taskRoute.js';
import auth from './middlewares/auth.js';
import swaggerUi  from'swagger-ui-express';
import cors from 'cors';
import openapiSpecification from './config/jsDoc.js';

config();
const app=express();
const port = process.env.PORT;
const db_uri=process.env.DB_URI 

app.use(cors({origin:process.env.FRONTEND_URL, credentials:true}))
app.use(express.json());

// swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.get('/',(req,res)=>{
  res.send('this is a home route');
});

app.use('/users', userRouter)
app.use('/tasks', auth, taskRouter)

app.listen(port, async()=>{
  try{
    await ConnectToDb(db_uri);
    console.log("Connected to database")
    console.log(`Server is running at port ${port}`);
  }catch(err){
    console.log(err);
  }
})
