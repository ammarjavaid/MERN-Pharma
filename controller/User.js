import bcrypt, { compareSync } from "bcrypt";
import jwt from 'jsonwebtoken';
// import myToken from "../models/token.js";
import myUserSchema from "../models/UserSchema.js";

export const userSignup = async(req, res) =>{

    const { username, email, password } = req.body;

    if(!username || !email || !password){
        return res.status(422).json({ error: "Please fill the fields" });
    }

    const userExist = await myUserSchema.findOne({ email });
    if(userExist){
        return res.status(422).json({ error: "Email already exist" })
    }

    try{

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const userData = { username: req.body.username, email: req.body.email, password: hash  }

        const user = new myUserSchema( userData );
        const savedUser = await user.save();
        if(!savedUser){
            return res.status(500).json({ error: "Invalid Crenditials" });
        }
            return res.status(200).json({ savedUser });
    } catch(err){
        console.log(err);
    }

}

// export const userLogin = async(req, res) =>{

//     const { email, password } = req.body;

    // if(!email || !password){
    //     return res.status(422).json({ error: "Please fill the fields" });
    // }

    // let User = await myUserSchema.findOne({ email: req.body.email });
    // if(!User) {
    //     return res.status(400).json({ msg: "Username does not match" });
    // }
//     // in node 
//     // require('crypto').randomBytes(64).toString('hex')
//     try{
//         let match = await bcrypt.compare(req.body.password, User.password)
//         if(match){
//             const accessToken = jwt.sign(User.toJSON(), process.env.ACCESS_SECRET_KEY, {expiresIn: '15m'});
//             const refreshToken = jwt.sign(User.toJSON(), process.env.REFRESH_SECRET_KEY);

//             const newToken = new myToken({token: accessToken});
//             await newToken.save();

//             return res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken, username: User.username });

//         }else{
//             return res.status(400).json({ msg: "Password not match" });
//         }
//     }catch (err){
//         return res.status(500).json({ msg: "Error while login in user" });
//     }
// }

export const userLogin = async(req, res) =>{
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(422).json({ error: "Please fill the fields" });
    }
    let User = await myUserSchema.findOne({ email: req.body.email });
    if(!User) {
        return res.status(400).json({ msg: "Username does not match" });
    }
    try{
        const _token = jwt.sign({...User}, "PRIV_123")
        return res.status(200).json({ id: User._id, message: "Login Successfully", token:_token })
    } catch(err) {
        console.log(err)
    }
}

// export const userLogin = async(req, res) =>{
//     const  { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(422).json({ error: "please fill the fields!" });
//     }

//     try{
//         const existUser = await myUserSchema.findOne({ email });

//         if(!existUser){
//             return res.status(404).json({message: "No user found!"})
//         }

//         const isPasswordCorrect = compareSync(password, existUser.password);

//         if(!isPasswordCorrect) {
//             return res.status(400).json({ Error: "Incorrect Password" });
//         }

//         return res.status(200).json({ id: existUser._id, message: "Login Successfully..!" });

//     } catch(err) {
//         console.log(err);
//     }
// }

export const userLogout = async(req, res) =>{
    res.status(200).cookie("token", null, { expires: new Date(Date.now()), }).json({ message: "Logout Successfully!" })
}
