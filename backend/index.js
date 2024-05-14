const express = require("express");
const { todoSchema, updateSchema } = require("./types");
const todo = require("./db");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.post("/todo", async function (req, res) {
    const body = req.body;
    const parsedSchema = todoSchema.safeParse(body);
    if (!parsedSchema.success) {
        res.status(411).json({
            msg: "Incorrect inputs"
        });
        return;
    }
    const { title, description } = body;
    const todoDb = await todo.create({
        title: title,
        description: description,
        completed: false
    });
    res.status(200).json({
        msg: "Successfully Created Todo"
    });
});

app.get("/todos", async function (req, res) {
    const todos = await todo.find({});
    res.json({
        todos
    });
});

app.put("/update", async function (req, res) {
    const parsedSchema = updateSchema.safeParse(req.body);
    if (!parsedSchema.success) {
        res.status(411).json({
            msg: "Incorrect inputs"
        });
        return;
    }
    const todoId = req.body._id;
    try {
        await todo.findByIdAndUpdate(todoId, { completed: true });
        res.status(200).json({
            msg: "Todo updated successfully"
        });
    } catch (error) {
        console.error("Error updating todo:", error);
        res.status(500).json({
            msg: "Internal server error"
        });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
