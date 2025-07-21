import { Request, Response, NextFunction } from 'express';

export const authorizeRoles = (roles: string[]) => {
    return (req: Request & { user?: { role: string } }, res: Response, next: NextFunction) => {
        console.log('Role no token:', req.user?.role);
        if(!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ error: "Acesso negado" });
        }
        return next(); 
    };
};