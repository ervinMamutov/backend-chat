import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';
import validateEmail from '../utils/validateEmail.js';
import validatePassword from '../utils/validatePassword.js';
import matchPasswords from '../utils/matchPasswords.js';

const userControllers = {
  register: async (req, res) => {},
  login: async (req, res) => {},
  logout: async (req, res) => {}
};

export default userControllers;
