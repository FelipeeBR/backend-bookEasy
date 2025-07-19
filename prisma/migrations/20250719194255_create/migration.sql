-- CreateEnum
CREATE TYPE "Status" AS ENUM ('SCHEDULED', 'CANCELED');

-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "employeeId" INTEGER,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Time" (
    "id" SERIAL NOT NULL,
    "dayWeek" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "isBusy" BOOLEAN NOT NULL DEFAULT false,
    "serviceId" INTEGER NOT NULL,

    CONSTRAINT "Time_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scheduling" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "timeId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Scheduling_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Service_employeeId_key" ON "Service"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "Scheduling_timeId_key" ON "Scheduling"("timeId");

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Time" ADD CONSTRAINT "Time_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scheduling" ADD CONSTRAINT "Scheduling_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scheduling" ADD CONSTRAINT "Scheduling_timeId_fkey" FOREIGN KEY ("timeId") REFERENCES "Time"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scheduling" ADD CONSTRAINT "Scheduling_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
