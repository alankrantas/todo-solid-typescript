import type { Accessor, Setter } from 'solid-js';
import { createSignal } from "solid-js";
import { nanoid } from "nanoid";

export type TodoItem = {
    taskId: string,
    name: Accessor<string>,
    setName: Setter<string>,
    completed: Accessor<boolean>,
    setCompleted: Setter<boolean>,
};

export function createTodoItem(name: string, completed: boolean = false): TodoItem {
    const [taskName, setTaskName] = createSignal<string>(name);
    const [taskCompleted, setTaskCompleted] = createSignal<boolean>(completed);
    
    return {
        taskId: `todo-${nanoid()}`,
        name: taskName,
        setName: setTaskName,
        completed: taskCompleted,
        setCompleted: setTaskCompleted,
    };
};