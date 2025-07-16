import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from "dotenv";
dotenv.config();

interface AuthenticatedRequest extends Request {
    loggedUser?: {
        id: string;
        email: string;
    };
    token?: string;
}

function auth(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if(!token) {
        return res.status(401).json({ error: "Token not found" });
    } 
    try {
        const bearedToken = token.split(" ")[1];
        jwt.verify(bearedToken, process.env.JWT_TOKEN!, (err: any, decoded: any) => {
            if(err) {
                return res.status(401).json({ error: "Unauthorized" });
            } else {
                (req as AuthenticatedRequest).token = bearedToken;
                (req as AuthenticatedRequest).loggedUser = {id: decoded.id, email: decoded.email};
                return next();
            }
        })
    } catch (error) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    return next();
}

function signToken(payload: any, secret: any, options: any) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, options, (err: any, token: any) => {
            if(err) {
                reject(err);
            } else {
                resolve(token);
            }
        })
    })
}

module.exports = {
    auth,
    signToken
};