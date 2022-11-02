import "@testing-library/jest-dom";
import { render, screen, cleanup } from "@testing-library/react";
import App from "../../App";
import Form from "../Form";
import TodoList from "../TodoList";
import Todo from "../Todo";
import { useBoundStore } from "../../stores/useBoundStore";

const originalState = useBoundStore.getState();

// Reset all stores after each test run
beforeEach(() => {
  useBoundStore.setState(originalState);
});

afterEach(() => {
  useBoundStore.setState(originalState);
  cleanup();
});

test("Render form", () => {
  render(<Form />);
  const formElement = screen.getByTestId("form");
  expect(formElement).toBeInTheDocument();
});


test("Render todo list", () => {
  render(<TodoList />);
  const formElement = screen.getByTestId("todolist");
  expect(formElement).toBeInTheDocument();
});

test("Render app", () => {
  render(<App />);
  const formElement = screen.getByTestId("form");
  const todoListElement = screen.getByTestId("todolist");
  expect(formElement).toBeInTheDocument();
  expect(todoListElement).toBeInTheDocument();
});

test("Render todo", () => {
  const todo = { id: 1, text: "do laundry", completed: false };
  render(<Todo todo={todo} />);
  const todoElement = screen.getByTestId("todo-1");
  expect(todoElement).toBeInTheDocument();
  expect(todoElement).toHaveTextContent("do laundry");
  expect(todoElement).not.toContainHTML("<strike>");
});

test("Render completed todo", () => {
  const todo = { id: 2, text: "do dishes", completed: true };
  render(<Todo todo={todo} />);
  const todoElement = screen.getByTestId("todo-2");
  expect(todoElement).toBeInTheDocument();
  expect(todoElement).toHaveTextContent("do dishes");
  const todoText = screen.getByTestId("todo-text-2");
  expect(todoText).toHaveClass("completed");
});
