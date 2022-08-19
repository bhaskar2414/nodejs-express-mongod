const db = require("../models");
const Book = db.books 

exports.create = (req,res) =>{
    if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }

      const book = new Book({
        title:req.body.title,
        description:req.body.description,
        published:req.body.published ? req.body.published : false,
      });

      book
      .save(book)
      .then(data=>{
        res.send({message:"Book inserted successfully.",data:data})
      })
      .catch(error=>{
        res.status(500).send({
            message:error.message || "Something went wrong with book"
        })
      })
};

exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  Book.find(condition)
    .then(data => {
      res.send({count:data.length,data:data});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving books."
      });
   });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Book.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Book with id " + id });
      else res.send({message:"Book find successfully.",data:data});
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Book with id=" + id });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  const id = req.params.id;
  Book.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Book with id=${id}. Maybe Book was not found!`
        });
      } else res.send({ message: "Book was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Book with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  
  const id = req.params.id;
  Book.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot deleted Book with id=${id}. Maybe Book was not found!`
        });
      } else res.send({ message: "Book was deleted successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error delete Book with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Book.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Books were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all books."
      });
    });
};

exports.findAllPublished = (req, res) => {
  Book.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving books."
      });
    });
};