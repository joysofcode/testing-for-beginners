import { fireEvent, render, screen } from '@testing-library/svelte'

import AddTodo from '../AddTodo.svelte'

function renderAddTodo(amount = 0) {
  let props = {
    addTodo: jest.fn(),
    toggleCompleted: jest.fn(),
    todosAmount: amount,
  }
  render(AddTodo, { ...props })
  return props
}

test('input should have focus on page load', () => {
  renderAddTodo()
  let todoInputElement = screen.getByPlaceholderText(/what needs to be done/i)
  expect(todoInputElement).toHaveFocus()
})

test('user is able to type into the input', async () => {
  renderAddTodo()

  let inputValue = 'Todo Item'

  let todoInputElement = screen.getByPlaceholderText(/what needs to be done/i)
  await fireEvent.change(todoInputElement, { target: { value: inputValue } })
  expect(todoInputElement).toHaveValue(inputValue)
})

test('user is able to submit todo', async () => {
  let { addTodo } = renderAddTodo()

  let inputValue = 'Todo Item'

  let todoInputElement = screen.getByPlaceholderText(/what needs to be done/i)
  await fireEvent.change(todoInputElement, { target: { value: inputValue } })
  await fireEvent.submit(todoInputElement)

  expect(addTodo).toHaveBeenCalledTimes(1)
})
