import faculty from "../models/Faculty.js";
import { hashPassword } from "../utils/encryption.js";
import { JWT_SECRET } from "../config/env.js";
import jwt from 'jsonwebtoken';


//Register a new faculty user
export const facultyRegister = async (req, res) => {
    const { firstName, lastName, email, phone, password, department, role } = req.body;

    try {
        const existingUser =  await faculty.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        //Append 1 to userId
        const latestUser = await faculty.find().sort({id: -1}).limit(1);
        let id;
        if (latestUser.length == 0) {
            id = 'F-0001'
        } else {
            const currentID = latestUser[0].id;
            let number = currentID.replace('F-', '');
            number = (parseInt(number,10) + 1).toString().padStart(4,'0');
            id = 'F-' + number;
        }

        const hashedPassword = await hashPassword(password);

        const user = await faculty.create({ facultyId: id, firstName, lastName, phone, email, department, password:hashedPassword, role });

        const token = jwt.sign({ _id: user._id , facultyId: user.facultyId, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

        return res.status(201).json({ message: 'User registered successfully', token });

    } catch (error) {
        console.error(error); // Optional: log the actual error
        return res.status(500).json({ message: 'Something went wrong during registration' });
    }
}
