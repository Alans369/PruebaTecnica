module.exports = {
    secret: 'pollitopio', // En producción, usa variables de entorno
    accessTokenExpiration: '2h',  // Token principal dura 2 horas
    refreshTokenExpiration: '7d', // Token de refresco dura 7 días
    cookieOptions: {
        httpOnly: true,      // No accesible vía JavaScript
        secure: false,       // En producción cambiar a true para requerir HTTPS
        sameSite: 'strict',  // Protección contra CSRF
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 días en milisegundos
    }
};
