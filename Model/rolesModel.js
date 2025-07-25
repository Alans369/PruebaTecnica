const db = require('../config/db');
class Roles {


  constructor(id, name) {
    this.conexioon= testConnection();
    this.id = id;
    this.name = name;
  }

  static async create(name) {
    
    
    const [result] = await db.query('INSERT INTO roles (name) VALUES (?)', [name]);
    return { id: result.insertId, name };
  }

  static async readAll() {
   
    const [rows] = await db.query('SELECT * FROM roles');
    return rows;
  }

  static async readById(id) {
    
    const [rows] = await db.query('SELECT * FROM roles WHERE id = ?', [id]);
    return rows[0] || null;
  }

  static async update(id, name) {
   
    const [result] = await db.query('UPDATE roles SET name = ? WHERE id = ?', [name, id]);
    if (result.affectedRows > 0) {
      return { id, name };
    }
    return null;
  }

  static async delete(id) {
 
    const [result] = await db.query('DELETE FROM roles WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Roles;
