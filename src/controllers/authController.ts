import prisma from '../../config/database';
import { generateTokens, verifyRefreshToken } from '../services/tokenService';
import dotenv from "dotenv";
import { compare } from "bcrypt";

dotenv.config();

async function authenticate(email: string, password: string) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email.toLowerCase()
            }
        });
        if(!user) return false;
        
        if(!(await compare(password, user.password))) {
            return false;
        }
    
        const { accessToken, refreshToken } = generateTokens({ id: user.id, email: user.email, role: user.role });
        
        await prisma.refreshToken.create({
            data: {
                token: refreshToken,
                userId: user.id,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            }
        });
        return { accessToken, refreshToken };
    } catch (error) {
        return false;
    }
}

async function refresh(refreshToken: string) {
    if(!refreshToken) return false;
    try {
        const decoded = verifyRefreshToken(refreshToken);
        const tokenDb = await prisma.refreshToken.findUnique({
            where: {
                token: refreshToken
            }
        });

        if(!tokenDb || tokenDb.userId !== decoded.id || new Date(tokenDb.expiresAt) < new Date()) {
            return false;
        }
        const newTokens = generateTokens({ id: decoded.id, email: decoded.email, role: decoded.role });
        return newTokens;
    } catch (error) {
        return false;
    }
}

async function logout(refreshToken: string) {
    await prisma.refreshToken.deleteMany({
        where: {
            token: refreshToken
        }
    });
    return true;
}

export default {
    authenticate,
    refresh,
    logout
}
