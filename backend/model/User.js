const mongoose = require("mongoose")
const UserSchema= new mongoose.Schema({
    username:{
        type:String,
        required:[true,"please add a name"],
        min:3,
        max:20,
        unique:true
    },
    email:{
        type:String,
        required:[true,"Please add an email"],
        max:50,
        unique:true
    },
    phone:{
        type:Number,
        required:[true,"Please add a phonenumber"],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Please add a password'],
        min:6
    },
    profilePicture:{
        type:String,
        default:""
    },
    coverPicture:{
        type:String,
        default:""
    },
    followers:{
        type:Array,
        default:[]
    },
    followings:{
        type:Array,
        default:[]
    },
    role:{
        type:String,
        enuum:["user","admin"],
        default:"user"
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    desc:{
        type:String,
        max:50
    },
    city:{
        type:String,
        max:50
    },
    from:{
        type:String,
        max:50
    },
    relationship:{
        type:Number,
        enum:[1,2,3]
    }
},
{timestamps:true}
)
UserSchema.pre("save", async function (next) {
    // const salt = await bcrypt.genSalt();
    // this.password = await bcrypt.hash(this.password, salt);
     if (this.email == 'admin123@gmail.com')

     {
         this.role = "admin"
     }
     next();
 })

module.exports = mongoose.model("User",UserSchema)
