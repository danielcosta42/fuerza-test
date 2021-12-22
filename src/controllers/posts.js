import paginationFormatter from '../helpers/paginationFormatter';
import { v4 as uuidv4 } from 'uuid';

var fs = require('fs');
const dataPath = 'src/db/posts.json';

const readFile = (
callback,
returnJson = true,
filePath = dataPath,
encoding = 'utf8'
) => {
fs.readFile(filePath, encoding, (err, data) => {
    if (err) {
    throw err;
    }

    callback(returnJson ? JSON.parse(data) : data);
});
};

const writeFile = (
fileData,
callback,
filePath = dataPath,
encoding = 'utf8'
) => {
fs.writeFile(filePath, fileData, encoding, err => {
    if (err) {
    throw err;
    }

    callback();
});
};

module.exports = () => {
  const controller = {};

  controller.findAll = async (req, res) => {

    let { page = 1, per_page: perPage = 10 } = req.query;
    if (Number(page) <= 0) page = 1;
    if (Number(perPage) < 0) perPage = 1000;

    readFile(data => {
      const postsCount = Object.keys(data).length;

      const paginatedResults = paginationFormatter(
        data,
        page,
        perPage,
        postsCount
      );

      return res.status(200).json(paginatedResults);
        //res.status(200).send(data);
      }, true);
  };

  controller.findOne = async (req, res) => {
    const { postId } = req.params;
    readFile(data => {
        if(postId != null){
            res.status(200).send(data[postId])    
          }
    }, true);
  };

  controller.create = async (req, res) => {
    readFile(data => {
        const postId = uuidv4();

        // add the new user
        data[postId] = req.body;

        writeFile(JSON.stringify(data, null, 2), () => {
          res.status(200).send(`post id: ${postId} created`);
          //console.log(res)
        });
    }, true);
  };

  controller.update = async (req, res) => {

    readFile(data => {

        // add the new user
        const { postId } = req.params;
        data[postId] = req.body;

        writeFile(JSON.stringify(data, null, 2), () => {
          res.status(200).send(`post id: ${postId} updated`);
        });
    }, true);
  };

  controller.delete = async (req, res) => {
    readFile(data => {

        // delete the user
        const postId = req.params["id"];
        delete data[postId];

        writeFile(JSON.stringify(data, null, 2), () => {
          res.status(200).send(`post id: ${postId} removed`);
        });
    }, true);
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