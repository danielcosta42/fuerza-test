import paginationFormatter from '../helpers/paginationFormatter';
import { v4 as uuidv4 } from 'uuid';

var fs = require('fs');
const dataPath = 'src/db/db.json';

const readFile = (
callback,
returnJson = false,
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
  const service = {};

  service.findAll = async (req, res) => {
    readFile(data => {
        res.status(200).send(data);
      }, true);
  };

  service.findOne = async (req, res) => {
    const { postId } = req.params;
    readFile(data => {
        if(postId != null){
            res.status(200).send(data[postId])    
          }
    }, true);
  };

  service.create = async (req, res) => {
    readFile(data => {
        const postId = uuidv4();

        // add the new user
        data[postId] = req.body;

        writeFile(JSON.stringify(data, null, 2), () => {
            res.status(200).send(`post id:${postId} created`);
            //console.log(res)
        });
    },
        true);
  };

  service.update = async (req, res) => {

    readFile(data => {

        // add the new user
        const { postId } = req.params;
        data[postId] = req.body;

        writeFile(JSON.stringify(data, null, 2), () => {
            res.status(200).send(`post id:${postId} updated`);
        });
    },
        true);
  };

  service.delete = async (req, res) => {
    readFile(data => {

        // delete the user
        const postId = req.params["id"];
        delete data[postId];

        writeFile(JSON.stringify(data, null, 2), () => {
            res.status(200).send(`post id:${postId} removed`);
        });
    },
        true);
  };

  service.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    return res.json({
      token: jwt.sign({ ...user }, 'mySecret', {
        expiresIn: '7d',
      }),
    });
  };

  return service;
};