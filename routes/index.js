var express = require('express');
var router = express.Router();
const {loginUser} = require('../Controller/usersControllers');
const { requireAuth } = require('../middlewares/auth');



/* GET home page. */
router.get('/',requireAuth);

router.get('/login',async function(req, res, next) {

res.render('Login', {
    errors: null,        // Objeto con errores de validación
    oldData: null,     // Datos del formulario para mantenerlos
    error: null          // Mensaje de error general
});
  
});

router.post('/auth/login',loginUser)

module.exports = router;
