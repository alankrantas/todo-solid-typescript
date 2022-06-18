import type { Component, JSX } from 'solid-js';
import { createSignal } from "solid-js";
import { Dynamic } from "solid-js/web";
import { TodoItem } from "./data/entities";

interface Props {
    task: TodoItem,
    deleteTask: (id: string) => void;
}

export const Todo: Component<Props> = (props) => {

    let input: HTMLInputElement;

    const [isEditing, setEditing] = createSignal<boolean>(false);

    const handleSubmit: JSX.EventHandler<HTMLFormElement, Event & { submitter: HTMLElement; }> = (e) => {
        e.preventDefault();
        props.task.setName(input.value.trim() !== "" ? input.value.trim() : "(new todo task)");
        setEditing(false);
    }

    const editingTemplate = () => (
        <form class="stack-small" onSubmit={handleSubmit}>
            <div class="form-group">
                <label class="todo-label" for={props.task.taskId}>
                    New name for "{props.task.name()}"
                </label>
                <input
                    ref={input!}
                    id={props.task.taskId}
                    class="todo-text"
                    type="text"
                    value={props.task.name()}
                />
            </div>
            <div class="btn-group">
                <button
                    type="button"
                    class="btn todo-cancel"
                    onClick={() => setEditing(false)}
                >
                    Cancel
                    <span class="visually-hidden">renaming {props.task.name()}</span>
                </button>
                <button type="submit" class="btn btn__primary todo-edit">
                    Save
                    <span class="visually-hidden">new name for {props.task.name()}</span>
                </button>
            </div>
        </form>
    );

    const viewTemplate = () => (
        <div class="stack-small">
            <div class="c-cb">
                <input
                    id={props.task.taskId}
                    type="checkbox"
                    checked={props.task.completed()}
                    onChange={() => { props.task.setCompleted(!props.task.completed()) }}
                />
                <label class="todo-label" for={props.task.taskId}>
                    {props.task.name()}
                </label>
            </div>
            <div class="btn-group">
                <button type="button" class="btn" onClick={() => setEditing(true)}>
                    Edit <span class="visually-hidden">{props.task.name()}</span>
                </button>
                <button
                    type="button"
                    class="btn btn__danger"
                    onClick={() => props.deleteTask(props.task.taskId)}
                >
                    Delete <span class="visually-hidden">{props.task.name()}</span>
                </button>
            </div>
        </div>
    );

    return (
        <li class="todo">
            <Dynamic component={isEditing() ? editingTemplate : viewTemplate} />
        </li>
    );
};
