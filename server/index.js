import express, { json } from "express";
import sql from "./db.js";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();

app.use(express.json());

//middlewares
app.use(cors({ origin: ["http://localhost:5173"] }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// First query to get the version of the database
async function getPgVersion() {
  const version = await sql`SELECT VERSION()`;
  return version;
}

// This endpoint returns the version of the postgres
app.get("/", async (req, res) => {
  try {
    const version = await getPgVersion();
    //res.render("/"); causees error when not found
    res.send(version);
  } catch (error) {
    res.send("Error occured");
  }
});

app.get("/api/todos", async (req, res) => {
  try {
    const todos = await sql`SELECT * FROM todos`;
    if (!todos) {
      res.status(403).send("Unable to select items from todos");
      return;
    }

    res.send(todos);
    return;
  } catch (error) {
    res.send(error);
  }
});

app.post("/api/todos2", async (req, res) => {
  try {
    const { task, is_completed } = req.body;
    //const data = { task, is_completed };
    //INSERT INTO todos ${sql(data, "task", "is_completed") RETURNING *
    const todos =
      await sql`INSERT INTO todos (task, is_completed) VALUES (${task}, ${is_completed}) RETURNING *`;
    res.json(todos);
  } catch (error) {
    res.status(402).json(error);
  }
});

app.delete("/api/todos/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the data from the db
    await sql`DELETE FROM todos WHERE id=${id}`;

    res.json({
      status: "success",
      message: "Successfully deleted",
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get("*", (req, res) => {
  res.send("Unknown route");
});

app.listen(3000, () => {
  console.log("Hello server started at port 3000");
});
