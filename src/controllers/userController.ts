import prisma from '../../config/database';

async function createUser(name: string, email: string, password: string, phone: string, type: string) {
    try {
        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: password,
                phone: phone,
                type: type
            },
        });
        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    createUser
}