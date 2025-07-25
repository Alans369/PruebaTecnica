const Roles = require('../Model/rolesModel');

// Crear un nuevo rol
exports.createRole = async (req, res) => {
  try {
    const { name } = req.body;
    const role = await Roles.create(name);
    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el rol', details: error.message });
  }
};

// Obtener todos los roles
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Roles.readAll();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los roles', details: error.message });
  }
};

// Obtener un rol por ID
exports.getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Roles.readById(id);
    if (role) {
      res.status(200).json(role);
    } else {
      res.status(404).json({ error: 'Rol no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el rol', details: error.message });
  }
};

// Actualizar un rol
exports.updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedRole = await Roles.update(id, name);
    if (updatedRole) {
      res.status(200).json(updatedRole);
    } else {
      res.status(404).json({ error: 'Rol no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el rol', details: error.message });
  }
};

// Eliminar un rol
exports.deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Roles.delete(id);
    if (deleted) {
      res.status(200).json({ message: 'Rol eliminado correctamente' });
    } else {
      res.status(404).json({ error: 'Rol no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el rol', details: error.message });
  }
};
