const { blogModel } = require("../../../DB/model/blog.model");

const addBlog = async (req, res) => {
    try {
        const { title, desc } = req.body;
        const newBlog = new blogModel({ title: title, desc: desc, userId: req.user.id });
        const savedBlog = await newBlog.save();
        res.json({ message: "success", savedBlog });

    } catch (error) {
        res.json({ message: "catch error", error });
    }
}

const blogs = async (req, res) => {
    try {
        const blogs = await blogModel.find({}).populate([
           {path:'userId',select:'email userName -_id'} 
        ]);
        res.json({ message:"success", blogs });

    } catch (error) {
        res.json({ message: "catch error", error });
    }
}

const userBlogs = async (req, res) => {
    try {
        const blogs = await blogModel.find({userId:req.user.id});
        res.json({ message:"success", blogs });
    } catch (error) {
        res.json({ message: "catch error", error });
    }
}

module.exports = {addBlog, blogs, userBlogs}