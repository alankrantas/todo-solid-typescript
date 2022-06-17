import type { Component, JSX } from 'solid-js';

interface Props {
    addTask: (name: string) => void
}

export const Form: Component<Props> = (props) => {

    let input: HTMLInputElement;

    const handleSubmit: JSX.EventHandler<HTMLFormElement, Event & { submitter: HTMLElement; }> = (e) => {
        e.preventDefault();
        props.addTask(input.value.trim() !== "" ? input.value.trim() : "(new todo task)");
        input.value = "";
    };

    return (
        <form onSubmit={handleSubmit} >
            <h2 class="label-wrapper">
                <label for="new-todo-input" class="label__lg">
                    What needs to be done?
                </label>
            </h2>
            <input
                ref={input!}
                type="text"
                id="new-todo-input"
                class="input input__lg"
                name="text"
                autocomplete="off"
            />
            <button type="submit" class="btn btn__primary btn__lg">
                Add
            </button>
        </form >
    );
}