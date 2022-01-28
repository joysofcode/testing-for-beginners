import { render, screen } from '@testing-library/svelte'

import FilterTodos from '../FilterTodos.svelte'

function renderFilterTodos(selectedFilter) {
  let props = {
    selectedFilter,
    setFilter: jest.fn(),
  }

  render(FilterTodos, { ...props })

  let filterAllElement = screen.getByText(/all/i)
  let filterActiveElement = screen.getByText(/active/i)
  let filterCompletedElement = screen.getByText(/completed/i)

  return {
    filterAllElement,
    filterActiveElement,
    filterCompletedElement,
  }
}

test('only "all" filter has selected styles', () => {
  let { filterAllElement, filterActiveElement, filterCompletedElement } =
    renderFilterTodos('all')

  expect(filterAllElement).toHaveClass('selected')
  expect(filterActiveElement).not.toHaveClass('selected')
  expect(filterCompletedElement).not.toHaveClass('selected')
})

test('only "active" filter has selected styles', () => {
  let { filterAllElement, filterActiveElement, filterCompletedElement } =
    renderFilterTodos('active')

  expect(filterAllElement).not.toHaveClass('selected')
  expect(filterActiveElement).toHaveClass('selected')
  expect(filterCompletedElement).not.toHaveClass('selected')
})

test('only "completed" filter has selected styles', () => {
  let { filterAllElement, filterActiveElement, filterCompletedElement } =
    renderFilterTodos('completed')

  expect(filterAllElement).not.toHaveClass('selected')
  expect(filterActiveElement).not.toHaveClass('selected')
  expect(filterCompletedElement).toHaveClass('selected')
})
