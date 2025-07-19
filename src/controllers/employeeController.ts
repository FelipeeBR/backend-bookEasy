import prisma from '../../config/database';

async function createEmployee(specialization: string, userId: string) {
    try {
        const employee = await prisma.employee.create({
            data: {
                specialization: specialization,
                userId: parseInt(userId)
            },
        });
        return employee;
    } catch (error) {
        throw error;
    }
}

export default {
    createEmployee
}