const { userModel } = require("../../../DB/model/user.model");


const getAllUsers = async (req, res) => {
    const users = await userModel.find({});

    res.json({ message: 'ok', users });
}

const updateUser = async (req, res) => {

    const { id } = req.params;
    const { email, age } = req.body;
    //findOneAndUpdate
    //findByIdAndUpdate //the condition is always _id:id
    //findOneAndReplace //remove the old one and put the new one {remove all the attribute thats not updated}
    const user = await userModel.findOneAndUpdate(
        { _id: id }, //condition
        {
            email: email, //info to change
            age: age
        },
        {
            new: true//to return the new record after update(optional)
        }
    );

    res.json({ message: 'success', user });
}

const deleteUser = async (req, res) => {
    //findByIdAndDelete(id)
    const { id } = req.params;
    const user = await userModel.findOneAndDelete(
        { _id: id },
    );
    res.json({ message: 'success', user });
}

const profile = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id)
        res.json(user);

    } catch (error) {
        res.json({ message: 'catch error', error });
    }

}

module.exports = { getAllUsers, updateUser, deleteUser, profile };