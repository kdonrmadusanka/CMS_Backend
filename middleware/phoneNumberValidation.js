//Phone number validation
export const phoneValidation = (req, res, next) => {
    try {
        if (!/^\d{10}$/.test(req.body.phone)) {
            return res.status(400).json({ message: 'Phone number must be 10 digits' });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
}