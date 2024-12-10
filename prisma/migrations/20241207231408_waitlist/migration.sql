-- CreateTable
CREATE TABLE "waitlist" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT,

    CONSTRAINT "waitlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "dob" TEXT,
    "lob" TEXT,
    "tob" TEXT,
    "relation" TEXT,
    "gender" TEXT,
    "email" TEXT,
    "userId" TEXT,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);
