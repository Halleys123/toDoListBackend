const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect(
    "mongodb+srv://toDoListMyApp:IrC8Fmq5rh7voKDu@todolist.zqznhka.mongodb.net/toDoList"
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

const model = require("./model/model");

app.use(express.json());
app.use(cors());

app.post("/user/login", (req, res) => {
  console.log(req.body);
  model.findOne(req.body).then((user) => {
    if (user) {
      console.log("Logged in");
      res.json({ status: "success", data: user });
    } else {
      console.log("Wrong username or password");
      res.json({ status: "fail" });
    }
  });
});
app.patch("/user/task/delete", (req, res) => {
  // console.log(req.body);
  // const data = await model.find({ username: req.body.username });
  // const data1 = data.json();
  // console.log("ief" + data);
  // console.log(data1);
  model
    .updateOne(
      { username: req.body.username },
      { $pull: { toDoList: { task: req.body.task } } }
    )
    .then((user) => {
      console.log(user);
      res.json({ status: "success", data: user });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.patch("/user/task/add", (req, res) => {
  const data = req.body;
  console.log(data);
  model
    .updateOne(
      { username: req.body.username },
      {
        $push: {
          toDoList: data.data,
        },
      }
    )
    .then((data) => {
      res.json({ status: "success", data: data });
    })
    .catch((err) => {
      res.json({ status: "fail", data: err });
    });
});
app.post("/user/signup", (req, res) => {
  const data = req.body;
  data.toDoList = [];
  console.log(data);

  model.findOne({ username: data.username }).then((user) => {
    if (user) {
      console.log("Username already exists", user);
      res.json({
        status: "fail",
        data: { errorCode: 400, message: "Username already exists" },
      });
    } else {
      model.create(data).then((user) => {
        try {
          console.log(data);
          res.json({ status: "success", data: data });
        } catch (err) {
          console.log(err);
          res.json({ status: "fail", data: err });
        }
      });
    }
  });
});

module.exports = app;
