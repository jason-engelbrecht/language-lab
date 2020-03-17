import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const saltRounds = 10;

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
  quarter: String,
  year: String,
  language: String,
  staffing: String,
  data: [
    {
      sid: String,
      // first_name: String,
      // last_name: String,
      hours: Number,
      currentClass: String,
      language: String
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
      // first_name: String,
      // last_name: String,
      speaking: Number,
      listening: Number,
      reading: Number,
      writing: Number,
      current_class: String
    }
  ],
  date: { type: Date, default: Date.now }
});

let userSchema = new mongoose.Schema({
  email: String,
  password: String
});

//before save - hash password
userSchema.pre('save', function(next) {
  //check if document is new or a new password has been set
  if (this.isNew || this.isModified('password')) {
    //save reference to this because of changing scopes
    const document = this;

    //hash the password
    bcrypt.hash(document.password, saltRounds, function(err, hashedPassword) {
      if (err) next(err);
      else {
        document.password = hashedPassword;
        next();
      }
    });
  }
  else next();
});

//export models
export const UploadModel = mongoose.model('Test', uploadSchema, 'TestData');
export const ProficiencyModel = mongoose.model('Proficiency', proficiencySchema, 'ProficiencyData');
export const UserModel = mongoose.model('Users', userSchema, 'Users');
