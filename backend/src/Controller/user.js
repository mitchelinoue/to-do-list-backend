import { openDb } from "../configSqlite.js";
import bcrytp from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function createTableUsers() {
  openDb().then(db => {
    db.exec('CREATE TABLE IF NOT EXISTS users (id INTEGER NOT NULL PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL)');
    db.close();
  })
}

export async function createUser(req, res) {
  openDb().then(async db => {

    const verifyEmail = await db.get('SELECT * FROM users WHERE email = ?', [req.body.email]);
    if (verifyEmail != undefined) {
      db.close();
      return res.status(500).send({ "message": "User already registered" })
    }

    bcrytp.hash(req.body.password, 10, (errBcrypt, hash) => {
      if (errBcrypt) { return res.status(500).send({ error: errBcrypt + "eadsfaf" }) };
      db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [req.body.name, req.body.email, hash]);
      db.close();
      return res.status(201).send({ "message": "User created" })
    })
  })
}

export async function loginUser(req, res) {

  const segredo = "segredoJWT";

  openDb().then(db => {

    db.get('SELECT * FROM users WHERE email = ?', [req.body.email]).then(user => {
      db.close();
      if (user == undefined) {
        return res.status(404).send({ "message": "Email not found" })
      }
      bcrytp.compare(req.body.password, user.password, (errBcrypt, result) => {
        if(errBcrypt){
          return res.status(401).send({ "message": "Authentication failed" })
        }
        if(result){
          const token = jwt.sign({
            id: user.id,
            name: user.name,
            email: user.email
          }, segredo, {
            expiresIn: 6000
          })
          return res.status(200).send({ "token": token })
        }
        return res.status(401).send({ "message": "Authentication failed" })
      })
    });
  })
}

