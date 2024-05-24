-- AlterTable
CREATE SEQUENCE visitor_legacy_id_seq;
ALTER TABLE "Visitor" ALTER COLUMN "legacy_id" SET DEFAULT nextval('visitor_legacy_id_seq');
ALTER SEQUENCE visitor_legacy_id_seq OWNED BY "Visitor"."legacy_id";
