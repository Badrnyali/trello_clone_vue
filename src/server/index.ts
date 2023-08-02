import express, { Request, Response } from "express";
import cors from "cors";
import { Board, NewUser, Tasks, User } from "../interfaces";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";
import cookieParser from "cookie-parser";
import JsonWebToken from "jsonwebtoken";

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

let boardsList: Board[] = [];
let tasksList: Tasks[] = [];

const allUsers: User[] = [];

app.get("/tasks", (req, res) => {
  res.json({ boardsList, tasksList });
});

app.get("/test", (req, res) => {
  res.json(allUsers);
});

app.post<{}, {}, Board[] | Tasks[]>("/tasks", (req, res) => {
  const { board, task } = req.body as { board?: Board[]; task?: Tasks[] };
  if (board) {
    boardsList = board;
  }
  if (task) {
    tasksList = task;
  }
  res.json({ board, task });
});

const SECRET = "my-secret";
const COOKIE = "vuejs-jwt";

function authenticate(id: string, req: Request, res: Response) {
  //token sign it
  const token = JsonWebToken.sign({ id }, SECRET, {
    issuer: "badr",
    expiresIn: "30 days",
  });
  res.cookie(COOKIE, token, { httpOnly: true });
  // set a cookie
}

app.get("/current-user", (req, res) => {
  try {
    const token = req.cookies[COOKIE];
    const result = JsonWebToken.verify(token, SECRET) as { id: string };
    res.json({ id: result.id });
  } catch (e) {
    res.status(404).end();
  }
});

app.post<{}, {}, NewUser>("/login", (req, res) => {
  const user = allUsers.find((x) => x.username === req.body.username);
  if (!user || user.password !== req.body.password) {
    res.status(401).end();
  } else {
    authenticate(user.id, req, res);
    res.status(200).end();
  }
});

app.post("/logout", (req, res) => {
  res.cookie(COOKIE, "", { httpOnly: true });
  res.status(200).end();
});

app.post<{}, {}, NewUser>("/users", (req, res) => {
  const user = allUsers.find((x) => x.username === req.body.username);
  if (user) {
    res.status(401).end();
  } else {
    const newUser = { ...req.body, id: uuidv4() };
    allUsers.push(newUser);
    authenticate(newUser.id, req, res);
    const { password, ...rest } = newUser;
    res.json(rest);
  }
});

app.listen(8080, () => {
  console.log("Listening");
});
