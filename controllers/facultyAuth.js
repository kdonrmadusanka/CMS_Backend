import facultySchema from "../models/Faculty";
import { hashPassword } from "../utils/encryption";
import { JWT_SECRET } from "../config/env";
import jwt from 'jsonwebtoken';


//Register a new faculty user
export const register = async (req, res) => {
    const { firstName, lastName, email, phone, password, department, role } = req.body;

    try {
        const existingUser =  await facultySchema.findOne({ email });

        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
        }

        //Append 1 to userId
        const latestUser = await facultySchema.find().sort({id: -1}).limit(1);
        let id;
        if (latestUser.length == 0) {
            id = 'F-0001'
        } else {
            const currentID = latestUser[0].id;
            let number = currentID.replace('F-', '');
            number = (parseInt(number,10) + 1).toString().padStart(4,'0');
            id = 'U-' + number;
        }

        const hashedPassword = await hashPassword(password);

        const user = await facultySchema.create({ id, firstName, lastName, phone, email, department, password:hashedPassword, role });

        const token = jwt.sign({ _id: user._id , id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: 'Something went wrong' });

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}

//Phone number validation
export const phoneValidation = (req, res) => {
    try {
        if (!/^\d{10}$/.test(req.body.phone)) {
            res.status(400).json({ message: 'Phone number must be 10 digits' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}

//Email validation
export const emailValidation = (req, res) => {
    try {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email)) {
            res.status(400).jon({ message: 'Email must be valid' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}