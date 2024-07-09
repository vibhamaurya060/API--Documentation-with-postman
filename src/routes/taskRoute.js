import {Router} from 'express'
import taskModel from '../models/taskModel.js';
import role from '../middlewares/role.js';

const taskRouter=Router();



// this is schema for task
/**
 * @swagger
 *  components:
 *    schemas:
 *      Task:
 *        required:
 *          - title
 *        type: object
 *        properties:
 *          title:
 *            type: string
 *          desc:
 *            type: string
 *          status: 
 *            type: string
 */



// for routes get , post, patch, delete


/**
 * @swagger
 * /tasks:
 *   get:
 *     description: This is a get route for all the tasks.
 *     responses:
 *       '200':
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#components/schemas/Task"
 *   post:
 *     description: This is a post route for the task.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#components/schemas/Task"
 *     responses:
 *       '200':
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#components/schemas/Task"
 * /tasks/{id}:
 *   patch:
 *     summary: It will update the task details
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: The take has been updated
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       404:
 *         description: The user was not found
 *       500:
 *         description: Some error happened
 *   delete:
 *     summary: Remove the task by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task id
 *     responses:
 *       200:
 *         description: The user was deleted
 *       404:
 *         description: The user was not found
 *     
 */







taskRouter.get("/", role(["admin","user"]) ,async(req,res)=>{
    const todos=await taskModel.find();
    res.json({todos: todos});
    try{

    } catch(err){
        res.status(500).send(err);
    }
})


taskRouter.post("/admin",role(["admin"]),async(req,res)=>{
    const {title, desc}=req.body;
    try{
        const tasks=new taskModel({title, desc, user_id:req.result.id})
        await tasks.save();

        res.status(201).json({message: "task is creaded successfully"})

    } catch(err){
        res.status(500).send(err);
    }
})


taskRouter.patch("/:id", role(["admin"]), async (req, res) => {
    const { id } = req.params;
    const { title, desc } = req.body;
    try {
        const task = await taskModel.findById(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        task.title = title;
        task.desc = desc;
        await task.save();
        res.json({ message: "Task updated successfully" });
    } catch (err) {
        res.status(500).send(err);
    }
});



// Delete a task, accessible only by admin
taskRouter.delete("/:id", role(["admin"]), async (req, res) => {
    const { id } = req.params;
    try {
        const task = await taskModel.findById(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        await taskModel.findByIdAndDelete(id);
        res.json({ message: "Task deleted successfully" });
    } catch (err) {
        res.status(500).send(err);
    }
});

export default taskRouter;