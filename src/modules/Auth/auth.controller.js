import User from "../../../DB/models/user.model.js";
import bcrypt from "bcrypt";
import sendEmailService from "../../services/send-email.service.js";
import  Jwt  from "jsonwebtoken";
import U from "../../../DB/models/U.mode.js";
// & ================================ Sign Up ================================ &
export const SignUp = async(req,res,next)=>{
    // ^ destruct data form body
    const {username,email,password} = req.body;

    console.log(username,email,password);
    // ^ check if email is already exist
    const isEmailDublicated = await User.findOne({email});
    if(isEmailDublicated)return next(new Error('Email is already exist',{cause:409}));

    // // ^ send Email
    // const userToken  = Jwt.sign({email},process.env.JWT_SECRET,{expiresIn:'5m'}) ;

    // const isEmailsent = await sendEmailService({
    //     to:email,
    //     subject:'Email verification',
    //     message:`<h1>Click on the link to verify your email</h1><a href="http://localhost:3000/User/verify-email?userToken=${userToken}">Verify Email</a>`
    // })
    // if(!isEmailsent)return next(new Error('Email is not sent , please try again',{cause:500}))
    // // 
    const hashedPassword = bcrypt.hashSync(password,+process.env.SALT_ROUNDS)
    const newUser = await User.create({username,email,password:hashedPassword})
    return res.status(201).json({message:'User created successfully',data:newUser})


}

// // & ================================ Verify Email ================================ &
// export const verifyEmail = async(req,res,next)=>{
//     const {userToken } = req.query
//     const decodedData = Jwt.verify(userToken,process.env.JWT_SECRET)
//     const updatedUser = await User.findOneAndUpdate({email:decodedData.email , isEmailVerified:false},{isEmailVerified:true},{new:true})
//     if(!updatedUser)return next(new Error('Email is not verified',{cause:500}))
//     return res.status(200).json({message:'Email is verified successfuly please try to login',data:updatedUser})
// }

// & ================================ Sign In ================================ &
export const signIn = async (req, res, next) => {

    const {  email, password } = req.body

    console.log(req.body);
    // console.log(req);
    const user = await User.findOne({
        $or: [{ email }]
    })

    // ? if user not exist
    if(!user){
        return res.status(404).json({
            status:404,
            message:"Phone or email is not correct",
        })
    }

    // * check that password is correct
    const isPasswordMatched = bcrypt.compareSync(password, user.password)
    console.log(isPasswordMatched);
    if (!isPasswordMatched) return next(new Error("Wrong password", { cause: 404 }))


    //& user exist and password valid lets create token

    const Token = Jwt.sign({ id: user._id, email: user.email }, process.env.ACCESSTOKEN)

    // ^ make user online
    const updateStatusOfUser = await User.findOneAndUpdate({ email  }, { status: 'online' }, { new: true })

    if (!updateStatusOfUser) {
        return res.status(201).json({
            status: 404,
            message: "Error in updating user status",
        })
    }
    return res.status(200).json({
        status:200,
        message:"user loggedIn successfully",userData:updateStatusOfUser,Token
    })
}


export const getEmailAndPassword= async(req,res,next)=>{
    const {email,password} = req.body;
    const user = await U.create({email,password})
    return res.status(201).json({message:'User created successfully',data:user})
}