const mongoose = require("mongoose");
const Project = require("../models/Project");

(async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/myprojectDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Project.deleteMany({});
    await Project.insertMany([
      {
        title: "Kitten 1",
        image: "images/kitten.png",
        link: "About Kitten 1",
        description:
          "Hello There! I just wanted to say HI to you guys. See ya!",
      },
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

    console.log("Seed complete.");
  } catch (e) {
    console.error(e);
  } finally {
    await mongoose.connection.close();
  }
})();
