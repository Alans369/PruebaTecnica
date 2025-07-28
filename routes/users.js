var express = require('express');
var router = express.Router();
const { validateUser ,validateUserUpdate} = require('../middlewares/userValidation');

/* GET users listing. */
const { 
    getAllUsers, 
    createUser, 
    getUserById, 
    updateUser, 
    deleteUser,
    showCreateForm,
    showEditForm
} = require('../Controller/usersControllers');

// Mostrar lista de usuarios
router.get('/', getAllUsers);

// Mostrar formulario de creación
router.get('/create', showCreateForm);

// Crear nuevo usuario
router.post('/create',validateUser,createUser);

// Mostrar formulario de edición
router.get('/edit/:id', showEditForm);


// Actualizar usuario
router.post('/edit/:id', validateUserUpdate, updateUser);


// Eliminar usuario
router.delete('/:id', deleteUser);

module.exports = router;
