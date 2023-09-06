import express from "express";
import sql from './db.js'
import cors from "cors";

const app = express();

//middlewares
app.use(cors());


// First query to get the version of the database
async function getPgVersion(){
    const version = await sql`select version()`;
    return version;
}

// Dummy data for the todo
const data = [
    {
        "id": 1,
        "task": "Cook and eat",
        "is_completed": true
    },
    {
        "id": 1,
        "task": "Play and smile",
        "is_completed": false
    },
    {
        "id": 1,
        "task": "Pray and sleep",
        "is_completed": false
    }
]

app.get("/", async (req, res) => {
    try {
        const version = await getPgVersion();
        //res.render("/"); causees error when not found
        res.send(version);

    } catch (error) {
        res.send("Error occured");
    }
});

app.get("/api/v1/todos", async (req, res) => {
    try {
        res.json(data);

    } catch (error) {
        res.send(error);
    }
});

app.get("*", (req, res) =>{
    res.send("Unknown route")
});

app.listen(3000, () => {
    console.log("Hello");
});