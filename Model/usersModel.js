const { getPool } = require('../config/db');

class Users {
  constructor(id, roleid, name, email, password) {
    this.id = id;
    this.roleid = roleid;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static async create(roleid, name, email, password) {
    const pool = getPool();
    const [result] = await pool.query(
      'INSERT INTO users (role_id, name, email, password) VALUES (?, ?, ?, ?)',
      [roleid, name, email, password]
    );
    return { id: result.insertId, roleid, name, email, password };
  }

  static async readAll() {
    const pool = getPool();
    const [rows] = await pool.query('SELECT * FROM users');
    return rows;
  }

  static async readById(id) {
    const pool = getPool();
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0] || null;
  }

  static async update(id, roleid, name, email, password) {
    const pool = getPool();
    const [result] = await pool.query(
      'UPDATE users SET role_id = ?, name = ?, email = ?, password = ? WHERE id = ?',
      [roleid, name, email, password, id]
    );
    if (result.affectedRows > 0) {
      return { id, roleid, name, email, password };
    }
    return null;
  }

  static async delete(id) {
    const pool = getPool();
    const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Users;