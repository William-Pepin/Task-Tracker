const auth = require("../middleware/auth");
const { validate, Task } = require("../models/task");
const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", auth, async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM tasks WHERE user_id = $1", [
      req.user._id,
    ]);
    res.status(200).json({
      status: "ok",
      results: results.rows.length,
      data: {
        tasks: results.rows,
      },
    });
  } catch (e) {
    res.status(500).json({
      status: "Server error",
    });
  }
});

router.get("/:_id", auth, async (req, res) => {
  try {
    const _id = req.params._id;
    const results = await db.query("select * from tasks where _id = $1", [_id]);
    if (results.rows.length === 1) {
      res.status(200).json({
        status: "ok",
        results: results.rows.length,
        data: {
          task: results.rows[0],
        },
      });
    } else {
      res.status(404).json({
        status: "Task not found",
      });
    }
  } catch (e) {
    res.status(400).json({
      status: "Bad request",
    });
    console.log(e);
  }
});

router.post("/", auth, async (req, res) => {
  if (!req.body)
    return res.status(400).send("Body is empty or not a JSON format.");
  req.body.user_id = req.user._id;
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let task = new Task(
    req.body.user_id,
    req.body.title,
    req.body.description,
    req.body.flagged,
    req.body.priority,
    req.body.completed
  );
  try {
    const result = await db.query(
      "INSERT INTO tasks (user_id, title, description, flagged, priority, completed) VALUES ($1, $2, $3, $4, $5,$6) RETURNING _id;",
      [
        task.user_id,
        task.title,
        task.description,
        task.flagged,
        task.priority,
        task.completed,
      ]
    );
    task._id = result.rows[0]._id;
    return res.status(200).json({
      status: "ok",
      data: {
        task,
      },
    });
  } catch (e) {
    return res.status(500).send("Internal server error.");
  }
});

router.put("/:_id", auth, async (req, res) => {
  const _id = req.params._id;
  if (!req.body)
    return res.status(400).send("Body is empty or not a JSON format.");
  req.body.user_id = req.user._id;
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let task = new Task(
    req.body.user_id,
    req.body.title,
    req.body.description,
    req.body.flagged,
    req.body.priority,
    req.body.completed
  );
  try {
    const result = await db.query(
      "UPDATE tasks SET user_id = $1, title = $2, description = $3, flagged = $4, priority = $5, completed = $6 WHERE _id = $7",
      [
        task.user_id,
        task.title,
        task.description,
        task.flagged,
        task.priority,
        task.completed,
        _id,
      ]
    );
    return res.status(200).json({
      status: "ok",
      data: {
        task: { ...task, _id },
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send("Internal server error.");
  }
});

router.delete("/:_id", auth, async (req, res) => {
  try {
    const result = await db.query("DELETE FROM tasks WHERE _id = $1 ", [
      req.params._id,
    ]);
    return res.status(200).send("ok");
  } catch (e) {
    console.log(e);
    return res.status(500).send("Internal server error.");
  }
});

module.exports = router;
