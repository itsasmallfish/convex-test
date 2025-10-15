"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Trash2, Plus } from "lucide-react";
import { useMutation, useQuery, Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { api } from "../convex/_generated/api";
import AuthButton from "./AuthButton";
import UserProfile from "./UserProfile";

export default function TaskList() {
  return (
    <>
      <AuthLoading>
        <LoadingState />
      </AuthLoading>
      <Unauthenticated>
        <SignInState />
      </Unauthenticated>
      <Authenticated>
        <TaskManager />
      </Authenticated>
    </>
  );
}

function LoadingState() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SignInState() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">Task Manager</CardTitle>
            <AuthButton />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              Please sign in to manage your tasks
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function TaskManager() {
  const [newTaskText, setNewTaskText] = useState("");
  
  const tasks = useQuery(api.tasks.getTasks);
  const addTask = useMutation(api.tasks.addTask);
  const removeTask = useMutation(api.tasks.removeTask);
  const toggleTask = useMutation(api.tasks.toggleTask);

  const addTaskMutation = async () => {
    if (newTaskText.trim()) {
      await addTask({ text: newTaskText.trim() });
      setNewTaskText("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTaskMutation();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">Task Manager</CardTitle>
            <UserProfile />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add Task Input */}
          <div className="flex gap-2">
            <Input
              placeholder="Add a new task..."
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
            />
            <Button onClick={addTaskMutation} size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Task List */}
          <div className="space-y-2">
            {tasks?.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No tasks yet. Add one above to get started!
              </p>
            ) : (
              tasks?.map((task) => (
                <div
                  key={task._id}
                  className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => toggleTask({id: task._id})}
                    className="flex-shrink-0"
                  />
                  <span
                    className={`flex-1 ${
                      task.completed
                        ? "line-through text-muted-foreground"
                        : ""
                    }`}
                  >
                    {task.text}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeTask({id: task._id})}
                    className="flex-shrink-0 h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </div>

          {/* Task Stats */}
          {Array.isArray(tasks) && tasks.length > 0 && (
            <div className="pt-4 border-t text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Total: {tasks?.length}</span>
                <span>Completed: {tasks?.filter(task => task.completed).length}</span>
                <span>Remaining: {tasks?.filter(task => !task.completed).length}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
