const bcrypt = require("bcrypt");
const User = require("../models/user");
const Unit = require("../models/Unit");
const generateToken = require("../utils/generateToken");
require("dotenv").config(); 

exports.register = async (req, res) => {
    const { username, email, password, role, unitId } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            role,
            unitId,
        });
    
        res.status(201).json({ message: "Користувача створено успішно", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Помилка при реєстрації", error: error.message });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });
    
        if (!user) {
            return res.status(404).json({ message: "Користувача не знайдено" });
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
    
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Невірний пароль" });
        }
    
        const token = generateToken(user);
    
        res.status(200).json({ message: "Авторизація успішна", token: token, user: user });
    } catch (error) {
        res.status(500).json({ message: "Помилка при вході", error: error.message });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            include: [{ model: Unit, attributes: ["name"] }],
        });
    
        if (!user) {
            return res.status(404).json({ message: "Користувача не знайдено" });
        }
    
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Помилка отримання профілю", error: error.message });
    }
};