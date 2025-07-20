import prisma from '../../config/database';

async function createScheduling(serviceId: number, status: string, timeId: number, customerId: number) {
    try {
        const scheduling = await prisma.scheduling.create({
            data: {
                date: new Date().toISOString(),
                status: status,
                serviceId: serviceId,
                timeId: timeId,
                customerId: customerId,
            }
        });
        await prisma.time.update({
            where: { id: timeId },
            data: { isBusy: true }
        });
        return scheduling;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default {
    createScheduling
}