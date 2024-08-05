import { createTask, getTasks } from '../Controller/task.js'
import { openDb } from "../configSqlite.js";
import { jest } from '@jest/globals'

jest.mock("../configSqlite")

describe('Controller tests', () => {
  test('should send a status code of 201 when creating a new task', async () => {
    const req = {
      user: {
        name: 'jose'
      },
      body: {
        description: "fazer janta2",
        priority: "alta"
      }
    }
    const res = {
      status: jest.fn((x) => x),
      send: jest.fn((x) => x)
    }
    await createTask(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
  })

  test('should send a status code of 201 when getting tasks', async () => {
    const req = {
      user: {
        name: 'jose'
      },
      body: {
        description: "fazer janta2",
        priority: "alta"
      }
    }
    const res = {
      status: jest.fn((x) => x),
      send: jest.fn((x) => x)
    }
    await getTasks(req, res);
    expect(res.status).toHaveBeenCalledTimes(1);
  })

  test('should send a status code of 201 when getting tasks', async () => {
    const req = {
      user: {
        name: 'jose'
      },
      body: {
        description: "fazer janta2",
        priority: "alta"
      }
    }
    const res = {
      status: jest.fn((x) => x),
      send: jest.fn((x) => x)
    }
    await getTasks(req, res);
    expect(res.status).toHaveBeenCalledTimes(1);
  })




})



