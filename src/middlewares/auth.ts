import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from "dotenv";
dotenv.config();


export interface AuthenticatedRequest extends Request {
    user?: {
        id: number;
        email: string;
        role: string;
    };
}

function auth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const bearedToken = token.split(" ")[1];

    try {
        const decoded = jwt.verify(bearedToken, process.env.JWT_TOKEN!) as any;
        (req as any).user = { id: decoded.id, email: decoded.email, role: decoded.role };
        return next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }
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

export {
    auth,
}