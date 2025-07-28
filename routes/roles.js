var express = require('express');
var router = express.Router();
const { requireAuth } = require('../middlewares/auth');

const {ValidateRol} = require('../middlewares/RoleValidations'); // Importa el middleware
const { createRole, getAllRoles,deleteRole,showEditForm,updateRole } = require('../Controller/rolesController');

// Ruta para ver todos los roles
router.get('/',requireAuth, getAllRoles);

router.get('/create',requireAuth, function(req, res, next) {
  res.render('roles/Create',{errors:null});
});

router.put('/:id',requireAuth, updateRole);

router.get('/edit/:id',requireAuth, showEditForm);

router.post('/create',requireAuth,ValidateRol,createRole);

router.delete('/:id',requireAuth,deleteRole);





module.exports = router;