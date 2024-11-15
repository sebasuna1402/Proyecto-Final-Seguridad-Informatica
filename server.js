/* eslint-env node */
/* eslint-disable no-trailing-spaces, quotes */
require('dotenv').config();
const express = require('express');
const http = require('http');
const { auth, requiresAuth } = require('express-openid-connect');
const socketio = require('socket.io');
const path = require('path');


const unaLib = require('./unalib/dashboard.js');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const port = process.env.PORT || 3000;

// Configuración Auth0 con variables de entorno
const config ={
  authRequired: false, // No es obligatorio para la raíz
  auth0Logout: true, 
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.AUTH0_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL
};

app.use(auth(config));

// Ruta para servir el index.html en la raíz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html')); // Muestra la página inicial
});

// Redirige al login y luego al chat/dashboard
app.get('/login', (req, res) => {
  res.oidc.login({ returnTo: '/chat' }); // Redirige al chat después de autenticarse
});

// Ruta protegida que muestra el chat (dashboard)
app.get('/chat', requiresAuth(), (req, res) => {
  res.sendFile(path.join(__dirname, '/dashboard.html')); // El archivo del chat (dashboard)
});

// Ruta protegida para mostrar los detalles del usuario
app.get('/userinfo', requiresAuth(), (req, res) => {
  res.json({
    nombre: req.oidc.user.name || 'Usuario Anónimo',
    email: req.oidc.user.email
  });
});

// Redirige al logout y luego al index
app.get('/logout', (req, res) => {
  res.oidc.logout({ returnTo: '/' }); // Al cerrar sesión redirige al index
});

// Configuración de Socket.io para el chat
io.on('connection', (socket) => {
  console.log('Un usuario se ha conectado.');

  socket.on('Evento-Mensaje-Server', (msg) => {
    const mensajeValidado = unaLib.validateMessage(msg);
    io.emit('Evento-Mensaje-Server', mensajeValidado);
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});

// Servir archivos estáticos (CSS, JS, imágenes)
app.use('/static', express.static('static'));

// Iniciar el servidor en el puerto definido
server.listen(port, () => {
  console.log('Listening on *:' + port);
});
