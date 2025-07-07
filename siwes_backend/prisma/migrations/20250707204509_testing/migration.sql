-- CreateTable
CREATE TABLE "Logbook" (
    "id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "establishment" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "day" INTEGER,

    CONSTRAINT "Logbook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Score" (
    "id" SERIAL NOT NULL,
    "scrore" INTEGER NOT NULL,
    "logbook_id" INTEGER NOT NULL,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Students" (
    "id" SERIAL NOT NULL,
    "matric_number" TEXT NOT NULL,
    "phone_number" TEXT,
    "fullname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "course" TEXT,
    "department" TEXT,
    "email" TEXT NOT NULL,

    CONSTRAINT "Students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentSupervisor" (
    "id" SERIAL NOT NULL,
    "std_id" INTEGER NOT NULL,
    "supervisor_id" INTEGER NOT NULL,

    CONSTRAINT "StudentSupervisor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Supervisors" (
    "PK" SERIAL NOT NULL,
    "UQ" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" TEXT,
    "fullname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "supervisor_id" INTEGER,

    CONSTRAINT "Supervisors_pkey" PRIMARY KEY ("PK")
);

-- CreateTable
CREATE TABLE "Weekly" (
    "id" SERIAL NOT NULL,
    "progress" TEXT NOT NULL,
    "logbook_id" INTEGER,
    "scores" INTEGER,
    "weekly_tract" INTEGER,
    "progress_file" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Weekly_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Logbook_student_id_establishment_key" ON "Logbook"("student_id", "establishment");

-- CreateIndex
CREATE UNIQUE INDEX "Students_matric_number_key" ON "Students"("matric_number");

-- CreateIndex
CREATE UNIQUE INDEX "Students_email_key" ON "Students"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Supervisors_UQ_key" ON "Supervisors"("UQ");

-- CreateIndex
CREATE UNIQUE INDEX "Supervisors_email_key" ON "Supervisors"("email");

-- CreateIndex
CREATE INDEX "Weekly_logbook_id_idx" ON "Weekly"("logbook_id");

-- AddForeignKey
ALTER TABLE "Logbook" ADD CONSTRAINT "Logbook_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_logbook_id_fkey" FOREIGN KEY ("logbook_id") REFERENCES "Logbook"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSupervisor" ADD CONSTRAINT "StudentSupervisor_std_id_fkey" FOREIGN KEY ("std_id") REFERENCES "Students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSupervisor" ADD CONSTRAINT "StudentSupervisor_supervisor_id_fkey" FOREIGN KEY ("supervisor_id") REFERENCES "Supervisors"("PK") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Weekly" ADD CONSTRAINT "Weekly_logbook_id_fkey" FOREIGN KEY ("logbook_id") REFERENCES "Logbook"("id") ON DELETE SET NULL ON UPDATE CASCADE;
