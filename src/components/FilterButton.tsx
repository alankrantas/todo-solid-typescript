import type { Component, Setter } from 'solid-js';

interface Props {
    name: string,
    isPressed: boolean,
    setFilter: Setter<string>;
}

export const FilterButton: Component<Props> = (props) => {
    return (
        <button
            type="button"
            class="btn toggle-btn"
            aria-pressed={props.isPressed}
            onClick={() => props.setFilter(props.name)}
        >
            <span class="visually-hidden">Show </span>
            <span>{props.name}</span>
            <span class="visually-hidden"> tasks</span>
        </button>
    );
}