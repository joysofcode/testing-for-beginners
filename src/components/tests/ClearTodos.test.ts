import { render, screen } from '@testing-library/svelte'

import ClearTodos from '../ClearTodos.svelte'

function renderCompletedTodos(completedTodos = 0) {
  let props = {
    clearCompleted: jest.fn(),
    completedTodos,
  }
  render(ClearTodos, { ...props })
  return props
}

test('should be hidden if there are no completed todos', () => {
  renderCompletedTodos(0)
  let clearButtonElement = screen.getByRole('button')
  expect(clearButtonElement).toHaveClass('hidden')
})

test('should be visible if there is at least one completed todo', () => {
  renderCompletedTodos(1)
  let clearButtonElement = screen.getByRole('button')
  expect(clearButtonElement).not.toHaveClass('hidden')
})
