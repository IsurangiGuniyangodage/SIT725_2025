const Project = require("../models/Project");

// fallback used only when DB is empty
const fallback = [
  {
    title: "Kitten 02",
    image: "images/kitten-2.jpg",
    link: "About Kitten 02",
    description: "Demo description about kitten 2",
  },
  {
    title: "Kitten 03",
    image: "images/kitten-3.jpg",
    link: "About Kitten 03",
    description: "Demo description about kitten 3",
  },
];

exports.getAll = async () => {
  const docs = await Project.find({}).lean();
  return docs.length ? docs : fallback;
};

exports.create = async (payload) => {
  const doc = await Project.create(payload);
  return doc.toObject();
};

exports.getById = async (id) => {
  return Project.findById(id).lean();
};
