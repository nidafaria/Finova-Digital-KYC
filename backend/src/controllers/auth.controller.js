const authService = require('../services/auth.service');

exports.register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({ error: 'fullName, email, and password are required' });
    }

    const result = await authService.register({ fullName, email, password });
    return res.status(201).json({ message: 'User registered successfully', ...result });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'email and password are required' });
    }

    const result = await authService.login({ email, password });
    return res.status(200).json({ message: 'Login successful', ...result });
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await authService.getUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};