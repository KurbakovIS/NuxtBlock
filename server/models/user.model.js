const {model, Schema} = require('mongoose');


/**
 *
 * @type {Mongoose.Schema|*}
 */
const userSchema = new Schema({
  login: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  }
});

module.exports = model('users', userSchema);
