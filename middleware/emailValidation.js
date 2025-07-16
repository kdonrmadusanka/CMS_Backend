//Email validation
export const emailValidation = (req, res, next) => {
    try {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email)) {
            return res.status(400).json({ message: 'Email must be valid' });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
}