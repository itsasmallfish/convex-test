import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getTasks = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("tasks").collect();
    }
});

export const addTask = mutation({
    args: { text: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db.insert("tasks", { text: args.text, completed: false });
    }
});

export const removeTask = mutation({
    args: { id: v.id("tasks") },
    handler: async (ctx, args) => {
        return await ctx.db.delete(args.id);
    }
});

export const toggleTask = mutation({
    args: { id: v.id("tasks") },
    handler: async (ctx, args) => {
        const task = await ctx.db.get(args.id);
        if (!task) {
            throw new Error("Task not found");
        }

        return await ctx.db.patch(args.id, { completed: !task.completed });
    }
});