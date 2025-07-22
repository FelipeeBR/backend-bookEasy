import { Request, Response, NextFunction } from 'express';

export const authorizeRoles = (roles: string[]) => {
    return (req: Request & { user?: { role: string } }, res: Response, next: NextFunction) => {
        if(!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ error: "Acesso negado" });
        }
        return next(); 
    };
};