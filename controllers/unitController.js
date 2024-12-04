const Unit = require("../models/Unit");
const UnitDTO = require("../dto/unit.dto");

const createUnit = async (req, res) => {
  try {
    const { name, location, description } = req.body;
    const unitDTO = new UnitDTO(name, location, description);
    const unit = await Unit.create(unitDTO);
    res.status(201).json(unit);
  } catch (error) {
    res.status(500).json({ message: "Помилка створення підрозділу", error });
  }
};

const getAllUnits = async (req, res) => {
  try {
    const units = await Unit.findAll();
    res.status(200).json(units);
  } catch (error) {
    res.status(500).json({ message: "Помилка отримання підрозділів", error });
  }
};

const getUnitById = async (req, res) => {
  try {
    const { id } = req.params;
    const unit = await Unit.findByPk(id);
    if (!unit) {
      return res.status(404).json({ message: "Підрозділ не знайдено" });
    }
    res.status(200).json(unit);
  } catch (error) {
    res.status(500).json({ message: "Помилка отримання підрозділу", error });
  }
};

const updateUnit = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, description } = req.body;
    const unit = await Unit.findByPk(id);
    if (!unit) {
      return res.status(404).json({ message: "Підрозділ не знайдено" });
    }
    await unit.update({ name, location, description });
    res.status(200).json(unit);
  } catch (error) {
    res.status(500).json({ message: "Помилка оновлення підрозділу", error });
  }
};

const deleteUnit = async (req, res) => {
  try {
    const { id } = req.params;
    const unit = await Unit.findByPk(id);
    if (!unit) {
      return res.status(404).json({ message: "Підрозділ не знайдено" });
    }
    await unit.destroy();
    res.status(200).json({ message: "Підрозділ успішно видалено" });
  } catch (error) {
    res.status(500).json({ message: "Помилка видалення підрозділу", error });
  }
};

module.exports= { deleteUnit, updateUnit, getUnitById, getAllUnits, createUnit }