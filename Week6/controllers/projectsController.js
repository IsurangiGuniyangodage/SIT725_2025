const ProjectService = require('../services/projectService');

exports.list = async (_req, res) => {
  try {
    const items = await ProjectService.getAll();
    return res.json({ statusCode: 200, data: items, message: 'Success' });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ statusCode: 500, data: [], message: 'Server error' });
  }
};

exports.create = async (req, res) => {
  try {
    const created = await ProjectService.create(req.body);
    return res.status(201).json({ statusCode: 201, data: created });
  } catch (e) {

    if (e.name === 'ValidationError') {
      return res.status(400).json({ statusCode: 400, message: 'Validation error', details: e.message });
    }
    console.error(e);
    return res.status(500).json({ statusCode: 500, message: 'Server error' });
  }
};

exports.getOne = async (req, res) => {
  try {
    const item = await ProjectService.getById(req.params.id);
    if (!item) return res.status(404).json({ statusCode: 404, message: 'Not found' });
    return res.json({ statusCode: 200, data: item });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ statusCode: 500, message: 'Server error' });
  }
};

