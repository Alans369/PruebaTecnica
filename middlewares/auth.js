const jwt = require('jsonwebtoken');
const config = require('../config/jwt.config');

// Función para generar tokens (acceso y refresco)
exports.generateTokens = (userId, roleName) => {
    try {
        // Token de acceso principal
        const accessToken = jwt.sign(
            { 
                id: userId,
                role: roleName
            },
            config.secret,
            { expiresIn: config.accessTokenExpiration }
        );

        // Token de refresco
        const refreshToken = jwt.sign(
            { 
                id: userId,
                role: roleName,
                type: 'refresh'
            },
            config.secret,
            { expiresIn: config.refreshTokenExpiration }
        );

        return { accessToken, refreshToken };
    } catch (error) {
        console.error('Error generando tokens:', error);
        throw error;
    }
};

// Función para verificar token
exports.verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, config.secret);
        return {
            valid: true,
            expired: false,
            payload: decoded
        };
    } catch (error) {
        return {
            valid: false,
            expired: error.name === 'TokenExpiredError',
            payload: null
        };
    }
};

// Función para renovar tokens usando el token de refresco
exports.refreshTokens = (refreshToken) => {
    try {
        // Verificar el token de refresco
        const { valid, expired, payload } = this.verifyToken(refreshToken);

        if (!valid) {
            throw new Error('Token de refresco inválido');
        }

        if (expired) {
            throw new Error('Token de refresco expirado');
        }

        if (payload.type !== 'refresh') {
            throw new Error('Tipo de token inválido');
        }

        // Generar nuevos tokens
        const newTokens = this.generateTokens(payload.id, payload.role);

        return newTokens;
    } catch (error) {
        console.error('Error renovando tokens:', error);
        throw error;
    }
};

// Middleware para verificar autenticación
exports.requireAuth = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken;

        if (!token) {
            return res.redirect('/login');
        }

        const { valid, expired, payload } = this.verifyToken(token);

        if (token) {
             console.log(token);
            // Decodificar el token para obtener el payload
            const decoded= this.verifyToken(token);
         
               if (decoded.payload.role == 'docente'){
                    res.render('index')
                }
                
        }


         
 

        
        if (!valid) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        

        if (expired) {
            // Intentar renovar usando el token de refresco
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) {
                return res.status(401).json({ message: 'Sesión expirada' });
            }

            try {
                const newTokens = this.refreshTokens(refreshToken);
                
                // Establecer nuevas cookies
                res.cookie('accessToken', newTokens.accessToken, config.cookieOptions);
                res.cookie('refreshToken', newTokens.refreshToken, config.cookieOptions);

                // Decodificar el nuevo token para obtener el payload
                const { payload: newPayload } = this.verifyToken(newTokens.accessToken);
                req.user = newPayload;
            } catch (error) {
                return res.status(401).json({ message: 'Error renovando la sesión' });
            }
        } else {
            req.user = payload;
        }

        next();
    } catch (error) {
        console.error('Error en middleware de autenticación:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
