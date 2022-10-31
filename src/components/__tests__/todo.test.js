import "@testing-library/jest-dom";
import { render, screen, cleanup } from "@testing-library/react";
import App from "../../App";
import Form from "../Form";
import TodoList from "../TodoList";

afterEach(() => {
  cleanup();
});

test("Render form and todo list", () => {
  render(<App />);
  const formElement = screen.getByTestId("form");
  const todoListElement = screen.getByTestId("todolist");
  expect(formElement).toBeInTheDocument();
  expect(todoListElement).toBeInTheDocument();
});
