import { primaryKey } from "drizzle-orm/mysql-core";
import { pgTable,serial, text, varchar } from "drizzle-orm/pg-core";

export const AiOutput=pgTable('AiOutput',{
    id:serial('id').primaryKey(),
    formData:varchar('formData'),
    aiResponse:text('aiResponse'),
    templateSlug:varchar('templateSlug'),
    createdBy:varchar('createdBy'),
    createdAt:varchar('createdAt')
})