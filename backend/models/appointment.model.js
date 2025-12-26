import mongoose,{Schema} from "mongoose";


const AppointmentSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Doctor"
    },
    date :{
        type:String,
        require:true
    },
    time:{
        type:String,
        require:true
    },
    bookingStatus: {
        type : Boolean,
        default : false,
    },
    status:{
        type : Boolean,
        default : false,
    },
    weight:{
        type:Number,
    },
    temperature:{
        type:Number
    },
    remark:{
        type:String
    },
    medicine:[
        {
            name:{
                type:String
            },
            dose:{
                type:String,
            }
        }
    ]
})

AppointmentSchema.methods.isSlotBooked = async function(time,date,docId) {
    if(date===this.date && time===this.time && doctor===docId){
        return true;
    }
    else return false;
}
AppointmentSchema.methods.changeStatus = async function(){
    this.status = !this.status;
    return this.save()
}

export default mongoose.model("Appointment",AppointmentSchema)