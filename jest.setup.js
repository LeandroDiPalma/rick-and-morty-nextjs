import { jest } from "@jest/globals"
import "@testing-library/jest-dom"

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
  writable: true,
})


global.fetch = jest.fn()


const beforeEach = () => {
  jest.clearAllMocks()
  localStorageMock.getItem.mockReturnValue(null)
}

beforeEach()
