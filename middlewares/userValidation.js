const { body, validationResult } = require('express-validator');
const Roles = require('../Model/rolesModel'); 
const Users = require('../Model/usersModel'); 

const validateUser = [
    // Validación del nombre
    body('name')
        .trim()
        .notEmpty().withMessage('El nombre es requerido')
        .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres')
        .escape(),

    // Validación del email
    body('email')
        .trim()
        .notEmpty().withMessage('El email es requerido')
        .isEmail().withMessage('Debe ser un email válido')
     
        .custom(async (email) => {
            const user = await Users.findByEmail(email); // Cambia esto según tu método de búsqueda
            if (user) {
                throw new Error('El email ya está registrado');
            }
            return true;
        }),

    // Validación de la contraseña
    body('password')
        .if(body('password').notEmpty()) // Solo valida si se proporciona una contraseña
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
        .matches(/\d/).withMessage('La contraseña debe contener al menos un número'),

    // Validación del rol
    body('role_id')
        .notEmpty().withMessage('El rol es requerido')
        .isInt().withMessage('El rol debe ser un número válido'),

    // Middleware para manejar los errores de validación
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
            return res.render('Users/Create', {
                roles:await Roles.readAll(),
                title: 'Crear Usuario',
                errors: validationErrors,
                oldData: req.body // Mantener los datos ingresados
            });
        }
        next();
    }
];

// Validación específica para actualización de usuario
const validateUserUpdate = [
    // Validación del nombre
    body('name')
        .trim()
        .notEmpty().withMessage('El nombre es requerido')
        .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres')
        .escape(),

    // Validación del email
    body('email')
        .trim()
        .notEmpty().withMessage('El email es requerido')
        .isEmail().withMessage('Debe ser un email válido')
       ,
    // Validación de la contraseña
    body('password')
        .if(body('password').notEmpty()) // Solo valida si se proporciona una contraseña
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
        .matches(/\d/).withMessage('La contraseña debe contener al menos un número'),

    // Validación del rol
    body('role_id')
        .notEmpty().withMessage('El rol es requerido')
        .isInt().withMessage('El rol debe ser un número válido'),

    // Middleware para manejar los errores de validación
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Preparar los errores para mostrarlos en la vista
            const validationErrors = {};
            errors.array().forEach(error => {
                validationErrors[error.path] = error.msg;
            });
            console.log(validationErrors);
            const user = await Users.readById(req.params.id); 
            console.log(user)// Obtener el usuario actual para mostrar sus datos
            
            // Re-renderizar el formulario con los errores y los datos ingresados
            return res.render('Users/Edit', {
                user:await Users.readById(req.params.id), // Obtener el usuario actual para mostrar sus datos
                roles:await Roles.readAll(),
                title: 'Editar Usuario',
                errors: validationErrors,
                oldData: req.body // Mantener los datos ingresados
            });
        }
        next();
    }
];

module.exports = {
    validateUser,
    validateUserUpdate
};
