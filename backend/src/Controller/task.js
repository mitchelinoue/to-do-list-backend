import { openDb } from "../configSqlite.js";

export async function createTableTasks() {
  openDb().then(db => {
    db.exec('CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY, name TEXT NOT NULL, description TEXT NOT NULL, priority TEXT NOT NULL)');
    db.close();
  })
}

export async function createTask(req, res) {
  await openDb().then(db => {
    db.run('INSERT INTO tasks (name, description, priority) VALUES (?, ?, ?)', [req.user.name, req.body.description, req.body.priority]);
    db.close();
  })
  res.status(201);
  res.send({ "message": "Task created" })
  return res;
}

export async function getTasks(req, res) {
  let tasks = [];
  await openDb().then(async db => {
    tasks = await db.all('SELECT * FROM tasks WHERE name = ?', [req.user.name]);
  })

  res.status(200);
    res.send({ "tasks": tasks })
    return res;
}

export async function deleteTask(req, res, id) {
  openDb().then(async db => {
    const task = await db.all('SELECT * FROM tasks WHERE name = ? AND id = ?', [req.user.name, id]);
    if (task.length < 1) {
      db.close();
      return res.status(404).send({ "message": "Task not found" })
    }
    db.run('DELETE FROM tasks WHERE id = ?', [id]);
    db.close();
    return res.status(200).send({ "message": "Task deleted" })
  })
}