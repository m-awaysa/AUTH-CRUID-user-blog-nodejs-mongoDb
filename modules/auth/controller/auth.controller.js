var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { userModel } = require('./../../../DB/model/user.model');

const signup = async (req, res) => {
    const { name, email, password, cPassword } = req.body;
    if (password == cPassword) {
        const user = await userModel.findOne({ email: email });
        if (user == null) {
            const hashPassword = await bcrypt.hash(password, parseInt(process.env.SaltRound))
            // this method for inserting 1 object and its return one object and its faster than the next one and better for inserting object
            const newUSer = new userModel({
                userName: name,
                email,
                password: hashPassword
            });
            const savedUser = await newUSer.save();
            // this method returns array of object and take many object so its good if you want to insert many object
            // const savedUser = await userModel.insertMany({ userName: name, email, password, gender});
            res.json({ message: "success", savedUser });
        } else {
            res.json({ message: "email already exist" });
        }
    } else {
        res.json({ message: "password mis match confirmation password" });

    }

}

const signIn = async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            const token = jwt.sign({ id: user._id }, process.env.TokenSignature,{expiresIn:'1h'});//,{expiresIn:60}
            res.json({ message: 'ok', token });
        } else {
            res.json({ message: 'invalid data' });
        }
    } else {
        res.json({ message: 'invalid data' });
    }
}


module.exports = { signup, signIn };