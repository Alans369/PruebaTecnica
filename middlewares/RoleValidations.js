const { body, validationResult } = require('express-validator');
const Roles = require('../Model/rolesModel'); 

const ValidateRol=[
     body('name')
        .trim()
        .notEmpty().withMessage('El nombre es requerido')
        .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres')
        .escape()
        .custom(async (name) => {
                    const user = await Roles.findByName(name); // Cambia esto según tu método de búsqueda
                    if (user) {
                        throw new Error('El rol ya está registrado');
                    }
                    return true;
                }),

        async (req, res, next) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    // Preparar los errores para mostrarlos en la vista
                    const validationErrors = {};
                    errors.array().forEach(error => {
                        validationErrors[error.path] = error.msg;
                    });
                    console.log(validationErrors);
                    
                    // Re-renderizar el formulario con los errores y los datos ingresados
                    return res.render('roles/Create', {
                        errors: validationErrors,
                        
                    });
                }
                next();
            }
]
module.exports = { ValidateRol };