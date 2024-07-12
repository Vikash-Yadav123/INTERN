import { ComparePassword, HashPassword } from "../middilware/authMiddilware.js";
import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';

// REGISTER CONTROLLER
export const registerController = async (req, resp) => {
    try {
        const { name, email, password } = req.body;

        // CHECK VALIDATION
        if (!name) {
            return resp.status(400).send({ error: 'Name is Required' });
        }
        if (!email) {
            return resp.status(400).send({ error: 'Email is Required' });
        }
        if (!password) {
            return resp.status(400).send({ error: 'Password is Required' });
        }

        // CHECK EXISTING USER
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return resp.status(404).send({
                success: false,
                message: 'Existing User',
            });
        }

        // PASSWORD HASHING
        const hashPassword = await HashPassword(password);

        const user = new userModel({ name, email, password: hashPassword });
        // save
        await user.save();
        return resp.status(200).send({
            success: true,
            message: 'Successfully Registered',
            user,
        });

    } catch (error) {
        console.log(error);
        return resp.status(500).send({
            success: false,
            message: 'Error while register controller',
            error,
        });
    }
}

// LOGIN CONTROLLER
export const loginController = async (req, resp) => {
    try {
        const { email, password } = req.body;

        // CHECK VALIDATION
        if (!email) {
            return resp.status(400).send({ error: 'Email is Required' });
        }
        if (!password) {
            return resp.status(400).send({ error: 'Password is Required' });
        }

        // EXISTING USER
        const user = await userModel.findOne({ email });
        if (!user) {
            return resp.status(404).send({
                success: false,
                message: 'Invalid User',
            });
        }

        // PASSWORD COMPARE
        const comparePassword = await ComparePassword(password, user.password);
        if (!comparePassword) {
            return resp.status(400).send({
                success: false,
                message: 'Password Invalid',
            });
        }

        // CREATE TOKEN
        const token = jwt.sign({ _id: user._id }, process.env.SECRETKEY, { expiresIn: "7d" });

        return resp.status(200).send({
            success: true,
            message: "Successfully Logged In",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            },
            token
        });

    } catch (error) {
        console.log(error);
        return resp.status(500).send({
            success: false,
            message: 'Error while Login Controller',
            error,
        });
    }
}

// FORGET PASSWORD CONTROLLER
export const forgetPasswordController = async (req, resp) => {
    try {
        const { email, password } = req.body;

        // CHECK VALIDATION
        if (!email) {
            return resp.status(400).send({ error: 'Email is Required' });
        }
        if (!password) {
            return resp.status(400).send({ error: 'Password is Required' });
        }

        // EXISTING USER
        const user = await userModel.findOne({ email });
        if (!user) {
            return resp.status(404).send({
                success: false,
                message: 'Invalid User',
            });
        }

        // PASSWORD HASH
        const hashPassword = await HashPassword(password);

        await userModel.findByIdAndUpdate(user._id, { password: hashPassword });
        return resp.status(200).send({
            success: true,
            message: 'Successfully Updated Password',
        });

    } catch (error) {
        console.log(error);
        return resp.status(500).send({
            success: false,
            message: 'Error while forget Password Controller',
            error,
        });
    }
}
