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
        default:"admin123",
        require:true
    }
})

AdminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

AdminSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const Admin = mongoose.model("Admin", AdminSchema);
export default Admin;