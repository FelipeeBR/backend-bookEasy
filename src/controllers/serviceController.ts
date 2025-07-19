import prisma from '../../config/database';

async function createService(name: string, duration: number, price: number, description: string, employeeId: number) {
    try {
        const service = await prisma.service.create({
            data: {
                name: name,
                duration: duration,
                price: price,
                description: description,
                employeeId: employeeId
            },
        });
        return service;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default {
    createService
}