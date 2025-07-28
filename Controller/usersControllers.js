const Users = require('../Model/usersModel');
const Roles = require('../Model/rolesModel'); // Asegúrate de tener el modelo de Roles requerido

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
  try {
    const { role_id, name, email, password } = req.body;
    const user = await Users.create(role_id, name, email, password);
    res.redirect('/users'); // Redirige a la lista de usuarios después de crear uno nuevo
  } catch (error) {
    res.render('Users/Create', {
            errors: error.errors,
            oldData: req.body,
            roles: await Roles.readAll()
        });
  }
};

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const users = await Users.readAll(); // readAll ya incluye la información del rol
    console.log('Usuarios con roles:', users); // Para ver la estructura de datos
    res.render('Users/Index', { users });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al obtener los usuarios', details: error.message });
  }
};

// Obtener un usuario por ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.readById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario', details: error.message });
  }
};

// Actualizar un usuario
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { role_id, name, email, password } = req.body;
    const updatedUser = await Users.update(id, role_id, name, email, password);
    if (updatedUser) {
      res.redirect('/users'); 
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario', details: error.message });
  }
};

// Eliminar un usuario
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Users.delete(id);
    if (deleted) {
      res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario', details: error.message });
  }
};

// Mostrar formulario de creación
exports.showCreateForm = async (req, res) => {
    try {
        const roles = await Roles.readAll();
        res.render('Users/Create', { 
            roles,
            errors: null,
            oldData: null,
            title: 'Crear Usuario'
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al cargar el formulario de creación');
    }
};

// Mostrar el formulario de edición de usuario
exports.showEditForm = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Users.readById(id);
        const roles = await Roles.readAll();
        if (user) {
            res.render('Users/Edit', { user, roles ,errors: null,
            oldData: null,
            title: 'Editar Usuario'});
        } else {
            res.redirect('/users');
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
};


 exports.loginUser= async (req, res)=> {
    try {
        const { email, password } = req.body;
        const user = await Users.verifyLogin(email, password);
        
        if (!user) {
            // Usuario no encontrado o credenciales incorrectas
            return res.render('Login', {
                error: 'Email o contraseña incorrectos',
                oldData: { email }
            });
        }

        
        res.redirect('/users');

    } catch (error) {
        console.error(error);
        res.render('Login', {
            error: 'Error al intentar iniciar sesión',
            oldData: { email: req.body.email }
        });
    }
}

