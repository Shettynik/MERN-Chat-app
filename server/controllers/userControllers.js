const User = require("../models/User");
const sha256 = require("js-sha256");
const jwt = require("jwt-then");

exports.login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({
            email,
            password: sha256(password + process.env.SALT)
        });
        console.log(user);
        if(!user){
            return res.status(404).json({message: "Incorrect Email or password!"})
        };
    
        const token = await jwt.sign({id: user._id}, process.env.SECRET);
    
        res.status(200).json({
            message: `${user.name} has successfully logged in`,
            token: token
        });
    } catch (error) {
        res.status(500).json({message: "Something went wrong please try again later"});
    }

}

exports.register = async (req, res) => {
    const {name, email, password} = req.body;
    const emailRegex = /@gmail.com|@yahoo.com|@hotmail.com|@live.com/;
    console.log(req.body);
    
    try {
        if(!emailRegex.test(email)){
            return res.status(400).json({message: "Email is not supported from your domain"})
        };
        if(password.length < 6){
            return res.status(400).json({message: "Password should contain minimum 6 characters"})
        };
    
        const findUser = await User.findOne({email});
        if(findUser){
            return res.status(400).json({message: "User has already been registered"});
        }
    
        const user = new User({name, email, password: sha256(password + process.env.SALT)});
        await user.save();
    
        res.status(200).json({
            message: `User ${name} has registered successfully!`
        })
    } catch (error) {
        res.status(500).json({message: "Something went wrong please try again later"});
    }
}