
const oauth = (req, res, next) => {
    try {
        if (!req.session.userId) {
            return res.status(400).json({
                message: "Unauthorized"
            })
        }
        next()
    } catch (error) {
        res.status(500)
    }
}

module.exports = oauth