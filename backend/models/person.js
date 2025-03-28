const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

// I don't want to log the password, so find the @ to get where it's safe to log.
const urlAtPoint = url.indexOf('@')
console.log('connecting to MongoDB url: ...', url.substring(urlAtPoint))

mongoose.connect(url)

  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: function(v) {
        return /\d{2,3}-\d+/.test(v);
      },
      message: props => `${props.value} is not a valid phone number! (must be in the format XX-XXXXX... or XXX-XXXXX...)`
    },
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Person', personSchema)