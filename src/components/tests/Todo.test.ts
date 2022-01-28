import { fireEvent, render, screen } from '@testing-library/svelte'

import Todo from '../Todo.svelte'

function renderTodo(todo) {
  let props = {
    editTodo: jest.fn(),
    removeTodo: jest.fn(),
    completeTodo: jest.fn(),
    duration: 0,
  }
  render(Todo, { todo, ...props })
  return props
}

test('should display todo item', () => {
  renderTodo({ id: 1, text: 'Todo Item', completed: false })
  expect(screen.getByText(/todo/i)).toBeInTheDocument()
})

test('should be able to check and uncheck todo item as completed', async () => {
  renderTodo({ id: 1, text: 'Todo Item', completed: false })

  let todoInput = screen.getByTestId(/todo/i)
  await fireEvent.click(todoInput)
  expect(todoInput).toBeChecked()

  await fireEvent.click(todoInput)
  expect(todoInput).not.toBeChecked()
})

test('should have class of completed when checked', async () => {
  renderTodo({ id: 1, text: 'Todo Item', completed: true })
  let todoItem = screen.getByText(/todo item/i)
  expect(todoItem).toHaveClass('completed')
})

test('should update todo item when you press enter', async () => {
  let { editTodo } = renderTodo({ id: 1, text: 'Todo Item', completed: false })

  let todoItem = screen.getByText(/todo item/i)
  await fireEvent.dblClick(todoItem)

  let editingInput = screen.getByTestId(/edit/i)
  await fireEvent.keyDown(editingInput, { key: 'Enter' })
  expect(editTodo).toHaveBeenCalled()
})

test('should save todo item when you press escape', async () => {
  let { editTodo } = renderTodo({ id: 1, text: 'Todo Item', completed: false })

  let todoItem = screen.getByText(/todo item/i)
  await fireEvent.dblClick(todoItem)

  let editingInput = screen.getByTestId(/edit/i)
  await fireEvent.keyDown(editingInput, { key: 'Escape' })
  expect(editTodo).toHaveBeenCalled()
})
