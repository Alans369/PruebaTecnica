var express = require('express');
var router = express.Router();

const {ValidateRol} = require('../middlewares/RoleValidations'); // Importa el middleware
const { createRole, getAllRoles,deleteRole,showEditForm,updateRole } = require('../Controller/rolesController');

// Ruta para ver todos los roles
router.get('/', getAllRoles);

router.get('/create', function(req, res, next) {
  res.render('roles/Create',{errors:null});
});

router.put('/:id', updateRole);

router.get('/edit/:id', showEditForm);

router.post('/create',ValidateRol,createRole);

router.delete('/:id', deleteRole);





module.exports = router;