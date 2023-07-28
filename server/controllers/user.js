import User from "../models/user.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).limit(req.query._end);

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addUser = async (req, res) => {
    try {
        const { name, email, avatar } = req.body;

        console.log(req.body);

        const userExists = await User.findOne({ email });

        if (userExists) return res.status(200).json(userExists);
        let newUser = new User(req.body);
        console.log(newUser);
        newUser = await newUser.save();
        console.log(newUser);

        res.status(200).json({ success: true, data: newUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findOne({ _id: id }).populate("allProperties");

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

