import Faculty from "../models/Faculty.js";
import { comparePassword } from "../utils/encryption.js";

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check in Faculty collection
    let user = await Faculty.findOne({ email }).select('+password');

    // If not found in Faculty, check in Student
    if (!user) {
      user = await Student.findOne({ email }).select('+password');
    }

    // If user not found at all
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare passwords
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Build token payload
    const payload = {
      _id: user._id,
      email: user.email,
      role: user.role,
      userId: (user.role === 'admin' || user.role === 'lecturer') ? user.facultyId : user.studentId
    };

    //Create token
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({
      message: 'Login successful',
      token,
      userId: payload.userId
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong during login' });
  }
};
