import FieldMessage from '../helpers/fieldmessage';

module.exports = () => {
  const validations = {};

  validations.findOne = async () => [];

  validations.findAll = async () => [];

  validations.create = async (req) => {
    const errors = [];

    if (!req.body.title) {
      errors.push(new FieldMessage('title', 'field required'));
    }

    if (!req.body.body) {
      errors.push(new FieldMessage('body', 'field required'));
    }

    if (!req.body.tags) {
      errors.push(new FieldMessage('tags', 'field required'));
    }

    return errors;
  };
  validations.update = async () => [];

  validations.delete = async () => [];

  return validations;
};
