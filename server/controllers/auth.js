// Encrypt password
import bcrypt from "bcrypt";
// Give us a way to send the user a web token for authorization
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER
Encrypt password, save password, and when user provides password on login, the app salts to make sure it is correct, then a JSON Web Token is given
*/
export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body; // Destructuring the above parameters from the request body

        const salt = await bcrypt.genSalt(); // Create a salt provided by bcyrpt, used to encrypt password
        const passwordHash = await bcrypt.hash(password, salt); // Encrypts the password so it is not exposed

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser); // 201 means something has been created. If no error, send the user back a token. json(savedUser) is so the front-end can receive the response
    } catch (err) {
        res.status(500).json({ error: err.message }); // Front-end receives this error message code
    }
};

/* LOGGING IN */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).json({ msg: "User does not exist." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ token, user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
