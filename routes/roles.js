var express = require('express');
var router = express.Router();


const { createRole, getAllRoles,deleteRole } = require('../Controller/rolesController');

// Ruta para ver todos los roles
router.get('/', getAllRoles);

router.get('/create', function(req, res, next) {
  res.render('roles/Create',);
});

router.post('/create', createRole);

router.delete('/:id', deleteRole);





module.exports = router;