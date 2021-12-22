const mongoosePaginate = require('mongoose-paginate-v2');
module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        title: String,
        body: String,
        tags: Array
      },
      { timestamps: true }
    );
    schema.plugin(mongoosePaginate);
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const post = mongoose.model("post", schema);
    return post;
  };