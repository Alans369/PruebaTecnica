var express = require('express');
var router = express.Router();


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

router.get('/', getAllUsers);


module.exports = router;
