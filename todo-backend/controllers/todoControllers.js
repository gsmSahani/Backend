const TodoModels = require("../models/TodoModels");

module.exports.getToDo = async (req, res) => {
  try {
    const toDo = await TodoModels.find();
    res.send(toDo);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to fetch todos" });
  }
};

module.exports.saveTodo = async (req, res) => {
  const { text } = req.body;

  try {
    const data = await TodoModels.create({ text });
    console.log("Added Successfully");
    console.log(data);
    res.send(data);
  } catch (error) {
    res.status(500).send({ error: "Failed to add todo" });
  }
};

module.exports.updateTodo = async (req, res) => {
  const { id, text } = req.body;

  TodoModels.findByIdAndUpdate(id, { text }, { new: true })
    .then((data) => {
      if (data) {
        res.send("Updated Successfully");
      } else {
        res.status(404).send("Todo not found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Failed to update todo");
    });
};

module.exports.deleteTodo = async (req, res) => {
  const { id } = req.body;

  TodoModels.findByIdAndDelete(id)
    .then((data) => {
      if (data) {
        res.send("Deleted Successfully");
      } else {
        res.status(404).send("Todo not found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Failed to delete todo");
    });
};
