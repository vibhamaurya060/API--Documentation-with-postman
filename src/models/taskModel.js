import { Schema, model}  from "mongoose";

const taskSchema=new Schema({
    status:{type: String, enum:["inprogress", "done"], default: "inprogress"},
    user_id:{type: Schema.Types.ObjectId,ref:"users"},
    title: {type: String, required:true},
    desc:{type: String, required:true},
    compltedAt: {type: Date},
    createAt:{type:Date, default:Date.now},
}, {timestamps:true})

const taskModel=model("tasks", taskSchema);

export default taskModel;