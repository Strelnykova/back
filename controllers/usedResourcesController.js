const UsedResources = require('../models/UsedResources');
const Resources = require('../models/Resource');
const Units = require('../models/Unit');
const Users = require('../models/user');
const Resource = require('../models/Resource');
const Unit = require('../models/Unit');
const User = require('../models/user');

const createUsedResource = async (req, res) => {
  try {
    const { resourceId, quantityUsed, unitId, userId, description } = req.body;

    const resource = await Resources.findByPk(resourceId);
    if (!resource) {
      return res.status(404).json({ message: 'Основний ресурс не знайдено' });
    }

    const unit = await Units.findByPk(unitId);
    if (!unit) {
      return res.status(404).json({ message: 'Підрозділ не знайдено' });
    }

    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Користувача не знайдено' });
    }

    const usedResource = await UsedResources.create({
      resourceId,
      quantityUsed,
      unitId,
      userId,
      description,
    });

    res.status(201).json({
      message: 'Використаний ресурс успішно створено',
      usedResource,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Помилка при створенні використаного ресурсу', error });
  }
};

const getAllUsedResources = async (req, res) => {
  try {
    const usedResources = await UsedResources.findAll();

    res.status(200).json(usedResources);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Помилка при отриманні використаних ресурсів', error });
  }
};


const getUsedResourceById = async (req, res) => {
  try {
    const { id } = req.params;

    const usedResource = await UsedResources.findByPk(id);

    if (!usedResource) {
      return res.status(404).json({ message: 'Використаний ресурс не знайдено' });
    }

    res.status(200).json(usedResource);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Помилка при отриманні використаного ресурсу', error });
  }
};

const updateUsedResource = async (req, res) => {
  try {
    const { id } = req.params;
    const { resourceId, quantityUsed, unitId, userId, description } = req.body;

    const usedResource = await UsedResources.findByPk(id);
    if (!usedResource) {
      return res.status(404).json({ message: 'Використаний ресурс не знайдено' });
    }

    await usedResource.update({
      resourceId,
      quantityUsed,
      unitId,
      userId,
      description,
    });

    res.status(200).json({
      message: 'Використаний ресурс успішно оновлено',
      usedResource,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Помилка при оновленні використаного ресурсу', error });
  }
};

const deleteUsedResource = async (req, res) => {
  try {
    const { id } = req.params;

    const usedResource = await UsedResources.findByPk(id);
    if (!usedResource) {
      return res.status(404).json({ message: 'Використаний ресурс не знайдено' });
    }

    await usedResource.destroy();

    res.status(200).json({ message: 'Використаний ресурс успішно видалено' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Помилка при видаленні використаного ресурсу', error });
  }
};

module.exports = { createUsedResource, getAllUsedResources, getUsedResourceById, updateUsedResource, deleteUsedResource };
