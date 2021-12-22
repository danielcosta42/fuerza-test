const db = require("../models");
const Post = db.posts;

module.exports = () => {
  const controller = {};

  const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
  };

  controller.findAll = async (req, res) => {
    const { page, size, title } = req.query;
    var condition = title
      ? { title: { $regex: new RegExp(title), $options: "i" } }
      : {};
  
    const { limit, offset } = getPagination(page, size);
  
    Post.paginate(condition, { offset, limit })
      .then(data => {
        res.send({
          totalItems: data.totalDocs,
          posts: data.docs,
          totalPages: data.totalPages,
          currentPage: data.page - 1,
        });
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

  controller.create = (req, res) => {
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