const express = require("express");

const app = express();
const noteModel = require("./models/note.model.js");
const path = require("path");

const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use(express.static("./public"));

// POST /api/notes - create note in MongoDB
app.post("/api/notes", async (req, res) => {
    const { title, description } = req.body;

    const note = await noteModel.create({
        title, description
    });

    console.log("Hello")

    res.status(201).json({
        message: "Note created successfully!",
        note
    });
});

// GET /api/notes - Get all notes
app.get("/api/notes", async (req, res) => {
    const allNotes = await noteModel.find();

    return res.status(200).json({
        message: "Notes fetched successfully",
        allNotes
    });
});

// DELETE /api/notes/:id - Delete a note with its id
app.delete("/api/notes/:id", async (req, res) => {
    const { id } = req.params;

    await noteModel.findByIdAndDelete(id);;

    return res.status(200).json({
        message: "Note successfully deleted!"
    });
});

// DELETE /api/notes/deleteAll - Delete a All Notes
app.delete("/api/deleteAllNotes", async (req, res) => {
    await noteModel.deleteMany({});

    return res.status(200).json({
        message: "All notes successfully deleted!"
    });
});

// PATCH - /api/notes/:id - Update a note's description with its id
app.patch("/api/notes/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    const note = await noteModel.findByIdAndUpdate(id, { title, description });

    res.status(200).json({
        message: "Note's description successfully updated!"
    });
});

app.use("*name", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "/public/index.html"));
});

module.exports = app;