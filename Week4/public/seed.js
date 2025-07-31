const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myprojectDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const ProjectSchema = new mongoose.Schema({
  title: String,
  image: String,
  link: String,
  description: String,
});

const Project = mongoose.model('Project', ProjectSchema);

const sampleData = [
  {
    title: "Kitten 2",
    image: "images/kitten-2.png",
    link: "About Kitten 2",
    description: "Fluffy and adorable kitten",
  },
  {
    title: "Kitten 3",
    image: "images/kitten-3.png",
    link: "About Kitten 3",
    description: "Loves to nap in sunbeams",
  },
];

Project.insertMany(sampleData)
  .then(() => {
    console.log("Sample data inserted");
    mongoose.connection.close();
  })
  .catch(err => console.error(err));