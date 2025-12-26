import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const doctorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    speciality: {
      type: String,
    },
    phone: {
      type: Number,
    },
    experience: {
      type: String,
    },
    gender: {
      type: String,
    },
    qualification: {
      type: String,
    },
    address: {
      type: String,
    },
    availability: {
      type: Boolean,
    },
    about: {
      type: String,
    },
    fees: {
      type: Number,
    },
  },
  { timestamps: true }
);

doctorSchema.pre("save", async function (next) {
  if (!this.image || this.image === '' || this.image === null) {
    console.log('image added')
    if (this.gender === "Male") {
      this.image =
     "https://res.cloudinary.com/drnege4qt/image/upload/v1762199209/doc2_rpj6fp.png";
    
    }
    if(this.gender==='Female'){
        this.image = 'https://res.cloudinary.com/drnege4qt/image/upload/v1762199231/doc1_qfz8np.png' 
    }
  }
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);

  return next();
});

doctorSchema.methods.verifyPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

doctorSchema.methods.generateAccessToken = async function () {
  return jwt.sign({ _id: this._id }, process.env.ACCESS_TOKEN_SECRET);
};

export default mongoose.model("Doctor", doctorSchema);
