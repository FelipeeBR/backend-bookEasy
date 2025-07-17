import prisma from '../../config/database';
import bcrypt from 'bcrypt';
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPassword = (password) => password.length >= 8;
async function createUser(name, email, password, phone, type) {
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    try {
        const user = await prisma.user.create({
            data: {
                name: name,
                email: email.toLowerCase(),
                password: hashedPassword,
                phone: phone,
                type: type
            },
        });
        return user;
    }
    catch (error) {
        throw error;
    }
}
async function userExists(email) {
    const userExists = await prisma.user.findUnique({
        where: {
            email: email.toLowerCase()
        }
    });
    if (userExists)
        return true;
    return false;
}
export default {
    createUser,
    userExists,
    isValidEmail,
    isValidPassword
};
//# sourceMappingURL=userController.js.map