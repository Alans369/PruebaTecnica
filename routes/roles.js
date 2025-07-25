var express = require('express');
var router = express.Router();


const { createRole, getAllRoles } = require('../Controller/rolesController');

// Ruta para ver todos los roles
router.get('/', getAllRoles);

module.exports = router;