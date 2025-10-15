import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
    ...authTables,
    tasks: defineTable({
        author: v.id("users"),
        text: v.string(),
        completed: v.boolean(),
    }),
});