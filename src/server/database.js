import mongoose from 'mongoose';

//connect to mongo w mongoose
mongoose.connect('mongodb://localhost:27017/LLTest', {useNewUrlParser: true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected');
});

//create upload schema
let uploadSchema = new mongoose.Schema({
  filename: String,
  // data: Array,
  data: [
    {
      // id: String,
      first_name: String,
      last_name: String,
      hours: String,
      currentClass: String,
      language: String,
      reading: Number,
      writing: Number,
      listening: Number,
      speaking: Number
    }
  ],
  date: { type: Date, default: Date.now },
});

//create upload model w schema and collection
let UploadModel = mongoose.model('Test', uploadSchema, 'TestData');

export default UploadModel;
