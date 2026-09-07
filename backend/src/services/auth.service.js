const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'nexora_super_secret_jwt_key_2026';

// In-memory user store (fallback/mock if Prisma client isn't migrated yet)
const users = new Map();

// Seed a default verified user for quick local testing
(async () => {
  const hashedPassword = await bcrypt.hash('Password123!', 10);
  users.set('alice@nexora.com', {
    id: 'user_alice',
    fullName: 'Alice Smith',
    email: 'alice@nexora.com',
    password: hashedPassword,
    kycStatus: 'VERIFIED',
    createdAt: new Date().toISOString()
  });
})();

class AuthService {
  async register({ fullName, email, password }) {
    const normalizedEmail = email.toLowerCase().trim();
    if (users.has(normalizedEmail)) {
      throw new Error('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    const newUser = {
      id: userId,
      fullName,
      email: normalizedEmail,
      password: hashedPassword,
      kycStatus: 'PENDING',
      createdAt: new Date().toISOString()
    };

    users.set(normalizedEmail, newUser);

    const token = this.generateToken(newUser);
    return {
      user: { id: newUser.id, fullName: newUser.fullName, email: newUser.email, kycStatus: newUser.kycStatus },
      token
    };
  }

  async login({ email, password }) {
    const normalizedEmail = email.toLowerCase().trim();
    const user = users.get(normalizedEmail);

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    const token = this.generateToken(user);
    return {
      user: { id: user.id, fullName: user.fullName, email: user.email, kycStatus: user.kycStatus },
      token
    };
  }

  generateToken(user) {
    return jwt.sign(
      { id: user.id, email: user.email, kycStatus: user.kycStatus },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
  }

  async getUserById(userId) {
    for (const user of users.values()) {
      if (user.id === userId) {
        return { id: user.id, fullName: user.fullName, email: user.email, kycStatus: user.kycStatus };
      }
    }
    return null;
  }
}

module.exports = new AuthService();