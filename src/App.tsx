import type { Component } from 'solid-js';
import { createSignal, createMemo, For } from "solid-js";
import { Todo } from "./components/Todo";
import { Form } from "./components/Form";
import { FilterButton } from "./components/FilterButton";
import { TodoItem, createTodoItem } from "./data/entities";

interface Props {
    tasks: TodoItem[];
}

type filterOptions = {
    [key: string]: any
}

export const App: Component<Props> = (props) => {

    const [tasks, setTasks] = createSignal<TodoItem[]>(props.tasks);
    const [filter, setFilter] = createSignal<string>("All");

    const filterMap: filterOptions = {
        All: () => true,
        Active: (task: TodoItem) => !task.completed(),
        Completed: (task: TodoItem) => task.completed(),
    };
    const filterNames = Object.keys(filterMap);

    const filterList = (
        <For each={filterNames}>
            {(name) =>
                <FilterButton
                    name={name}
                    isPressed={name === filter()}
                    setFilter={setFilter}
                />}
        </For>
    );

    const addTask = (name: string) => {
        setTasks([...tasks(), createTodoItem(name)]);
    };

    const deleteTask = (id: string) => {
        setTasks(tasks().filter(task => id !== task.taskId));
    };

    const filteredTasks = createMemo(() => tasks().filter(filterMap[filter()]));

    const taskList = createMemo(() =>
        <For each={filteredTasks()}>
            {(task) => <Todo task={task} deleteTask={deleteTask} />}
        </For>
    );

    const headingText = createMemo(() =>
        `${filteredTasks().length} ${filteredTasks().length !== 1 ? 'tasks' : 'task'} remaining`);

    return (
        <div class="todoapp stack-large">
            <h1>TodoMatic</h1>
            <Form addTask={addTask} />
            <div class="filters btn-group stack-exception">
                {filterList}
            </div>
            <h2 id="list-heading">
                {headingText}
            </h2>
            <ul
                class="todo-list stack-large stack-exception"
                aria-labelledby="list-heading"
            >
                {taskList}
            </ul>
        </div>
    );
}

export default App;
