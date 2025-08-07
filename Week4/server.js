const path = require("path");
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.port || 3004;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect("mongodb://localhost:27017/myprojectDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const ProjectSchema = new mongoose.Schema({
  title: String,
  image: String,
  link: String,
  description: String,
});
const Project = mongoose.model("Project", ProjectSchema);

(async () => {
  try {
    await Project.deleteMany({}); 
    await Project.insertMany([
      {
        title: "Kitten 2",
        image: "images/kitten-2.jpg",
        link: "About Kitten 2",
        description: "A playful tabby that loves naps and yarn balls.",
      },
      {
        title: "Kitten 3",
        image: "images/kitten-3.jpg",
        link: "About Kitten 3",
        description: "The curious one who will steal your heart.",
      },
    ]);
    console.log("Kittens inserted!");
  } catch (err) {
    console.error(err);
  }
})();


// Seed once if empty
mongoose.connection.once("open", async () => {
  console.log("Connected to MongoDB");
  const count = await Project.estimatedDocumentCount();
  if (!count) {
    await Project.insertMany(cardList);
    console.log("Seeded default kittens");
  }
});

// API with fallback
app.get("/api/projects", async (req, res) => {
  try {
    const projects = await Project.find({}).lean();
    const data = projects.length ? projects : cardList; // Fallback to default data
    res.json({ statusCode: 200, data, message: "Success" });
  } catch (e) {
    console.error(e);
    res.json({ statusCode: 500, data: [], message: "Server error" });
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
