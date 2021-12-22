import paginationFormatter from '../helpers/paginationFormatter';
import { v4 as uuidv4 } from 'uuid';
const db = require("../models");
const Post = db.posts;

module.exports = () => {
  const controller = {};

  controller.findAll = (req, res) => {

    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  
    Post.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving posts."
        });
      });
  };

  controller.findOne = async (req, res) => {
    const { postId } = req.params;

    Post.findById(postId)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found posts with id " + postId });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving post with id=" + postId });
      });
  };

  controller.create = async (req, res) => {
    const newPost = new Post({
      title: req.body.title,
      body: req.body.body,
      tags: req.body.tags
    });
  
    // Save post in the database
    newPost
      .save(newPost)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the post."
        });
      });
    
  };

  controller.update = async (req, res) => {

    const { postId } = req.params;

    Post.findByIdAndUpdate(postId, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update post with id=${postId}. Maybe Tutorial was not found!`
          });
        } else res.send({ message: "post was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating post with id=" + postId
        });
      });
  };

  controller.delete = async (req, res) => {
    const { postId } = req.params;

    Post.findByIdAndRemove(postId, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete post with id=${postId}. Maybe Tutorial was not found!`
          });
        } else {
          res.send({
            message: "post was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete post with id=" + postId
        });
      });
  };

  controller.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    return res.json({
      token: jwt.sign({ ...user }, 'mySecret', {
        expiresIn: '7d',
      }),
    });
  };

  return controller;
};