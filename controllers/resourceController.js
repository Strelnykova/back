const Resource = require('../models/Resource');
const ResourceDTO = require("../dto/resource.dto.js");

const createResource = async (req, res) => {
  try {
    const { type, name, quantity, unit, description } = req.body;
    const resourceDTO = new ResourceDTO(type, name, quantity, unit, description);
    const resource = await Resource.create(resourceDTO);
    res.status(201).json(resource);
  } catch (error) {
    res.status(500).json({ message: "Помилка при створенні ресурсу", error });
  }
};

const getAllResources = async (req, res) => {
  try {
    const resources = await Resource.findAll();
    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ message: "Помилка при отриманні ресурсів", error });
  }
};

const getResourceById = async (req, res) => {
  try {
    const { id } = req.params;
    const resource = await Resource.findByPk(id);
    if (!resource) {
      return res.status(404).json({ message: "Ресурс не знайдено" });
    }
    res.status(200).json(resource);
  } catch (error) {
    res.status(500).json({ message: "Помилка при отриманні ресурсу", error });
  }
};

const updateResource = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, name, quantity, unit, description } = req.body;
    const resource = await Resource.findByPk(id);
    if (!resource) {
      return res.status(404).json({ message: "Ресурс не знайдено" });
    }
    await resource.update({ type, name, quantity, unit, description });
    res.status(200).json(resource);
  } catch (error) {
    res.status(500).json({ message: "Помилка при оновленні ресурсу", error });
  }
};

const deleteResource = async (req, res) => {
  try {
    const { id } = req.params;
    const resource = await Resource.findByPk(id);
    if (!resource) {
      return res.status(404).json({ message: "Ресурс не знайдено" });
    }
    await resource.destroy();
    res.status(200).json({ message: "Ресурс успішно видалено" });
  } catch (error) {
    res.status(500).json({ message: "Помилка при видаленні ресурсу", error });
  }
};

module.exports = { deleteResource, updateResource, getResourceById, getAllResources, createResource }