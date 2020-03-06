import mongoose from 'mongoose';

//connect to mongo w mongoose
// mongoose.connect('mongodb://localhost:27017/LLTest', {useNewUrlParser: true});
mongoose.connect('mongodb://Boolean:Hooligans1@ds023442.mlab.com:23442/heroku_8tbqhjvr', {useNewUrlParser: true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected');
});

//create upload schema
let uploadSchema = new mongoose.Schema({
  filename: String,
  // data: Array,
  quarter: String,
  year: String,
  language: String,
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

let proficiencySchema = new mongoose.Schema({
  filename: String,
  quarter: String,
  year: String,
  data: [
    {
      sid: String,
      first_name: String,
      last_name: String,
      speaking: Number,
      listening: Number,
      reading: Number,
      writing: Number,
      current_class: String
    }
  ],
  date: { type: Date, default: Date.now }
});

//create upload model w schema and collection
export const UploadModel = mongoose.model('Test', uploadSchema, 'TestData');
export const ProficiencyModel = mongoose.model('Proficiency', proficiencySchema, 'ProficiencyData');

// export default UploadModel;
