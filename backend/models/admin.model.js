import mongoose,{Schema} from 'mongoose';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const AdminSchema = new Schema({
    username:{
        type:String,
        require:true,
        unique:true,
        default:"admin"
    },
    password:{
        type:String,
    }
})


AdminSchema.methods.isPasswordCorrect = async function (password) {
    return password===this.password;
};

const Admin = mongoose.model("Admin", AdminSchema);
export default Admin;