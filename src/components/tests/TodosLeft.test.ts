import { render, screen } from '@testing-library/svelte'

import TodosLeft from '../TodosLeft.svelte'

function renderTodosLeft(incompleteTodos = 4) {
  let props = { incompleteTodos }
  render(TodosLeft, { ...props })
  return props
}

test('should display how many incomplete todos are left', () => {
  renderTodosLeft(4)
  screen.getByText(/4 items left/i)
})

test('should say "1 item left" if there is only one todo', () => {
  renderTodosLeft(1)
  screen.getByText(/1 item left/i)
})

test('should say "2 items left" if there is more than one todo', () => {
  renderTodosLeft(2)
  screen.getByText(/2 items left/i)
})
