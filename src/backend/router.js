/*Rotas API */
const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const emailController = require('./controllers/emailController');

const usuariosController = require('./controllers/usuariosController');
const usuariosMiddleware = require('./middlewares/usuariosMiddleware');

const vagasController = require('./controllers/vagasController');
const vagasMiddleware = require('./middlewares/vagasMiddleware');

const candVagaController = require('./controllers/candidatoVagaController');

const router = express.Router();

router.all("*", function (req, res, next) {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,Authorization ,Accept"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Expose-Headers", "Authorization");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Authorization"
  );

  next();
});


router.get('/vagas', vagasController.listarVagasController);
router.post('/vagas', vagasMiddleware.validateBody, vagasController.criarVagaController);
router.post('/vagas-teste', multer(multerConfig).single("file"), vagasController.uploadTesteController);
router.get('/detalheVagas', vagasController.detalheVagaEspecificaController); /*Rota pra linkar os detalhes RH*/
router.get('/detalheVagasUser', vagasController.detalheVagaEspecificaUserController); /*Rota pra linkar os detalhes User*/
router.get('/remove-vaga/(:id)', usuariosMiddleware.usuarioLogado, vagasController.deletarVagaController);

router.post('/inscrever-vaga', candVagaController.inscreverVagaController);
router.put('/curriculo', multer(multerConfig).single("file"), candVagaController.uploadCurriculoController);

router.get('/usuarios', usuariosController.listarLoginController);
router.post('/usuarios', usuariosMiddleware.validateUser, usuariosController.cadastrarUsuarioController);
router.post('/usuarios-logar', usuariosController.logarController);
router.get('/usuarios-deslogar', usuariosController.deslogarController);

router.get('/enviar-email', usuariosMiddleware.usuarioLogado, emailController.enviarEmailController);


/* Configuração das rotas do servidor */
router.get('/', (req, res) => res.sendFile(__dirname.replace('backend', 'frontend/views/login.html')));
router.get('/cadastro-usuario', (req, res) => res.sendFile("cadastroUser.html", { root: 'frontend/views/' }));

router.get('/cadastro-vagas', usuariosMiddleware.usuarioLogado, (req, res) => res.sendFile("cadastroVagas.html", { root: 'frontend/views/' }))
router.get('/cadastro-teste', usuariosMiddleware.usuarioLogado, (req, res) => res.sendFile("cadastrarTesteVaga.html", { root: 'frontend/views/' }))

router.get('/lista-vagas-empresa', usuariosMiddleware.usuarioLogado, (req, res) => res.sendFile("listaDeVagasRH.html", { root: 'frontend/views/' }));
router.get('/lista-vagas', usuariosMiddleware.usuarioLogado, (req, res) => res.sendFile("listaDeVagasUsuario.html", { root: 'frontend/views/' }));

router.get('/detalhe-da-vaga', usuariosMiddleware.usuarioLogado, (req, res) => res.sendFile("detalhesVagaRH.html", { root: 'frontend/views/' }));
router.get('/detalhe-da-vaga-user', usuariosMiddleware.usuarioLogado, (req, res) => res.sendFile("detalheDaVagaUsuario.html", { root: 'frontend/views/' }));

module.exports = router;