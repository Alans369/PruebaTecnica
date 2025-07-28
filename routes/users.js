var express = require('express');
var router = express.Router();
const { validateUser ,validateUserUpdate} = require('../middlewares/userValidation');
const { requireAuth } = require('../middlewares/auth');
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
router.get('/',requireAuth,getAllUsers);

// Mostrar formulario de creación
router.get('/create',requireAuth,showCreateForm);

// Crear nuevo usuario
router.post('/create',requireAuth,validateUser,createUser);

// Mostrar formulario de edición
router.get('/edit/:id',requireAuth,showEditForm);


// Actualizar usuario
router.post('/edit/:id', requireAuth,validateUserUpdate, updateUser);


// Eliminar usuario
router.delete('/:id',requireAuth, deleteUser);

module.exports = router;
