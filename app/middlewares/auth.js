const jwt = require("jsonwebtoken");


const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log("middleware auth", decodedToken);
        req.userId = decodedToken.userId;
        req.userRoleId = decodedToken.userRole_id;
        next();
    } catch (error) {
        console.log({ from: "auth middleware", error: error.message });
        res.status(401).json({
        from: "auth middleware",
        error: error.message | "request not authenticated",
        });
    }
};

module.exports = auth;