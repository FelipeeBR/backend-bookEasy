import jwt from "jsonwebtoken";

export function generateTokens(payload: any) {
    const accessToken = jwt.sign(payload, process.env.JWT_TOKEN!, {
        expiresIn: "15m",
    });

    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN!, {
        expiresIn: "7d",
    });

    return { accessToken, refreshToken };
}

export function verifyRefreshToken(token: string): any {
    return jwt.verify(token, process.env.REFRESH_TOKEN!);
}