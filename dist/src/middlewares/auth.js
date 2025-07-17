import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();
function auth(req, res, next) {
    const token = req.headers.authorization;
    if (!token || !token.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const bearedToken = token.split(" ")[1];
    try {
        const decoded = jwt.verify(bearedToken, process.env.JWT_TOKEN);
        req.user = { id: decoded.id, email: decoded.email };
        next();
    }
    catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }
    return next();
}
function signToken(payload, secret, options) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, options, (err, token) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(token);
            }
        });
    });
}
export default {
    auth,
    signToken
};
//# sourceMappingURL=auth.js.map