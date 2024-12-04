const User = require("../models/user");
const UserDTO = require("../dto/user.dto");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    const { username, email, password, role, unitId } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userDTO = new UserDTO(username, email, hashedPassword, role, unitId);
    const user = await User.create(userDTO);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Помилка створення користувача", error });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Помилка отримання користувачів", error });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Користувача не знайдено" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Помилка отримання користувача", error });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password, role, unitId } = req.body;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Користувача не знайдено" });
    }
    const hashedPassword = password ? await bcrypt.hash(password, 10) : user.password;
    await user.update({ username, email, password: hashedPassword, role, unitId });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Помилка оновлення користувача", error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Користувача не знайдено" });
    }
    await user.destroy();
    res.status(200).json({ message: "Користувач успішно видалений" });
  } catch (error) {
    res.status(500).json({ message: "Помилка видалення користувача", error });
  }
};

const checkData = async (req, res) => {
  const { username, email } = req.body;
  console.log('====================================');
  console.log(req.body);  // Лог вхідних даних
  console.log('====================================');

  try {
    if (username) {
      const userByUsername = await User.findOne({
        where: { username: username }
      });
      
      if (userByUsername) {
        return res.json({ exists: true, field: 'username' });
      }
    }
    
    if (email) {
      const userByEmail = await User.findOne({
        where: { email: email }
      });
      
      if (userByEmail) {
        return res.json({ exists: true, field: 'email' });
      }
    }

    res.json({ exists: false });
  } catch (err) {
    console.error('Error occurred while checking user data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = { deleteUser, updateUser, getUserById, getAllUsers, createUser, checkData };