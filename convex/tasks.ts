import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getTasks = query({
    args: {},
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) { 
            throw new Error("Not authenticated");
        }
        return await ctx.db.query("tasks").filter((q) => q.eq(q.field("author"), userId)).collect();
    }
});

export const addTask = mutation({
    args: { text: v.string() },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) { 
            throw new Error("Please sign in to add tasks");
        }
        return await ctx.db.insert("tasks", { text: args.text, completed: false, author: userId });
    }
});

export const removeTask = mutation({
    args: { id: v.id("tasks") },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) { 
            throw new Error("Please sign in to remove tasks");
        }
        const task = await ctx.db.get(args.id);
        if (!task) { throw new Error("Task not found"); }
        if (task.author !== userId) { 
            throw new Error("You can only remove your own tasks");
        }
        return await ctx.db.delete(args.id);
    }
});

export const toggleTask = mutation({
    args: { id: v.id("tasks"),
        completed: v.boolean()
     },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) { 
            throw new Error("Please sign in to toggle tasks");
        }
        const task = await ctx.db.get(args.id);
        if (!task) {
            throw new Error("Task not found");
        }
        if (task.author !== userId) { 
            throw new Error("You can only toggle your own tasks");
        }
        return await ctx.db.patch(args.id, { completed: args.completed });
    }
});
