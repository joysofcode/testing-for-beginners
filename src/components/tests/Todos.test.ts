import {
  fireEvent,
  queryByText,
  render,
  screen,
  waitFor,
} from '@testing-library/svelte'

import Todos from '../Todos.svelte'

afterEach(() => {
  localStorage.clear()
})

test('able to add a todo item', async () => {
  render(Todos)

  let value = 'Todo Item'

  let todoInputElement = screen.getByPlaceholderText(/what needs to be done?/i)
  await fireEvent.input(todoInputElement, { target: { value } })
  await fireEvent.submit(todoInputElement)

  expect(screen.getByText(value)).toBeInTheDocument()
})

test('able to add multiple todo items', async () => {
  render(Todos)

  let todoInputElement = screen.getByPlaceholderText(/what needs to be done?/i)
  let values = ['Todo Item 1', 'Todo Item 2', 'Todo Item 3', 'Todo Item 4']

  for (let value of values) {
    await fireEvent.input(todoInputElement, { target: { value } })
    await fireEvent.submit(todoInputElement)
    expect(screen.getByText(value)).toBeInTheDocument()
  }
})

test('able to edit a todo item', async () => {
  render(Todos)

  let value = 'Todo Item'
  let changedValue = 'Edited Todo Item'

  let todoInputElement = screen.getByPlaceholderText(/what needs to be done?/i)
  await fireEvent.input(todoInputElement, { target: { value } })
  await fireEvent.submit(todoInputElement)

  let currentTodoText = screen.getByText(value)
  await fireEvent.dblClick(currentTodoText)

  let newTodoInput = screen.getByTestId('edit')
  await fireEvent.change(newTodoInput, { target: { value: changedValue } })
  await fireEvent.keyDown(newTodoInput, { key: 'Enter' })

  expect(currentTodoText).toHaveTextContent(changedValue)
})

test('able to remove a todo item', async () => {
  let { container } = render(Todos)

  let value = 'Todo Item'

  let todoInputElement = screen.getByPlaceholderText(/what needs to be done?/i)
  await fireEvent.input(todoInputElement, { target: { value } })
  await fireEvent.submit(todoInputElement)

  expect(screen.getByText(value)).toBeInTheDocument()

  let removeTodoBtn = screen.getByTestId('remove')
  await fireEvent.click(removeTodoBtn)

  // we need to wait for the animation to finish
  await waitFor(() => {
    expect(queryByText(container, value)).not.toBeInTheDocument()
  })
})

test('able to filter todo items', async () => {
  let { container } = render(Todos)

  let todoInputElement = screen.getByPlaceholderText(/what needs to be done?/i)
  let values = ['Todo Item 1', 'Todo Item 2', 'Todo Item 3', 'Todo Item 4']

  for (let value of values) {
    await fireEvent.input(todoInputElement, { target: { value } })
    await fireEvent.submit(todoInputElement)
  }

  fireEvent.click(screen.getByTestId(/todo item 1/i))
  fireEvent.click(screen.getByTestId(/todo item 2/i))

  let allFilterBtn = screen.getByRole('button', { name: 'all' })
  let activeFilterBtn = screen.getByRole('button', { name: 'active' })
  let completedFilterBtn = screen.getByRole('button', { name: 'completed' })

  await fireEvent.click(activeFilterBtn)

  // for some reason even if animations have no duration
  // we have to wait for it to "finish", it's also worth
  // noting that queryBy is used to avoid errors from getBy
  // https://testing-library.com/docs/guide-disappearance
  await waitFor(() => {
    expect(queryByText(container, /todo item 1/i)).not.toBeInTheDocument()
    expect(queryByText(container, /todo item 2/i)).not.toBeInTheDocument()
  })

  await fireEvent.click(completedFilterBtn)

  await waitFor(() => {
    expect(queryByText(container, /todo item 3/i)).not.toBeInTheDocument()
    expect(queryByText(container, /todo item 4/i)).not.toBeInTheDocument()
  })

  await fireEvent.click(allFilterBtn)

  await waitFor(() => {
    expect(queryByText(container, /todo item 1/i)).toBeInTheDocument()
    expect(queryByText(container, /todo item 2/i)).toBeInTheDocument()
    expect(queryByText(container, /todo item 3/i)).toBeInTheDocument()
    expect(queryByText(container, /todo item 4/i)).toBeInTheDocument()
  })
})

test('able to clear completed todo items', async () => {
  let { container } = render(Todos)

  let todoInputElement = screen.getByPlaceholderText(/what needs to be done?/i)
  let values = ['Todo Item 1', 'Todo Item 2', 'Todo Item 3', 'Todo Item 4']

  for (let value of values) {
    await fireEvent.input(todoInputElement, { target: { value } })
    await fireEvent.submit(todoInputElement)
  }

  fireEvent.click(screen.getByTestId(/todo item 1/i))
  fireEvent.click(screen.getByTestId(/todo item 2/i))
  fireEvent.click(screen.getByTestId(/todo item 3/i))
  fireEvent.click(screen.getByTestId(/todo item 4/i))

  let clearCompletedBtn = screen.getByRole('button', {
    name: /clear completed/i,
  })

  await fireEvent.click(clearCompletedBtn)

  await waitFor(() => {
    expect(queryByText(container, /todo item 1/i)).not.toBeInTheDocument()
    expect(queryByText(container, /todo item 2/i)).not.toBeInTheDocument()
    expect(queryByText(container, /todo item 3/i)).not.toBeInTheDocument()
    expect(queryByText(container, /todo item 4/i)).not.toBeInTheDocument()
  })
})
