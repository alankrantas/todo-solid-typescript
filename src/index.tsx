/* @refresh reload */
import { render } from 'solid-js/web';
import { TodoItem, createTodoItem } from "./data/entities"
import App from './App';
import './index.css';

let data: TodoItem[] = [
    createTodoItem("Learn JavaScript", true),
    createTodoItem("Understand TypeScript", true),
    createTodoItem("Build website with Solidjs", false),
];

render(() => <App tasks={data} />, document.getElementById('root') as HTMLElement);
