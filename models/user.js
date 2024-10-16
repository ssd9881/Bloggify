const {Schema,model} = require('mongoose');
const { createHmac, randomBytes } = require('node:crypto');
const { createTokenForUser } = require('../services/authentication');

const userSchema = new Schema({
    fullName : {
        type: String,
        required : true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    salt:{
        type:String,
    },
    password : {
        type: String,
        required : true,
    },
    profileImageUrl : {
        type: String,
        default:'./public/images/deafult.png',
    },
    role:{
        type: String,
        enum:['USER','ADMIN'],
        default:'USER',
    }
},{timestamps:true});

userSchema.pre('save',function (next){
    const user = this;
    if(!user.isModified("password") ) return next();

    const salt = 'someRandomSalt';
    const hashedPassword = createHmac("sha256",salt)
    .update(user.password)
    .digest("hex");

    this.salt = salt;
    this.password = hashedPassword;

    next();
});

// virtual function
userSchema.static("matchPassword",async function(email,password){
    const user = await this.findOne({email});

    if(!user) throw new Error ('User not found');

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedPassword = createHmac("sha256",salt)
    .update(password)
    .digest("hex");

    if(userProvidedPassword!== hashedPassword) throw new Error ('Password incorrect');

    // return {...user,password:undefined,salt:undefined};
    const token = createTokenForUser(user);
    return token;
});
const User = model("user",userSchema);

module.exports = User;
