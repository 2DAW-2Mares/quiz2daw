var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var autorController = require('../controllers/autor_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

/* Listado - Alex Baquerizo Jimenez */
var userController = require('../controllers/user_controller');
var profesorController = require('../controllers/profesor_controller');
var cuestionarioController = require('../controllers/cuestionario_controller');//para listado de cuestionario

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz', errors: [] });
});


// Autoload de comandos
router.param('quizId',quizController.load); //autoload :quizId
router.param('comentId',commentController.load); //autoload :commentId
router.param('userId', userController.load);//autoload :userId
router.param('profesorId', profesorController.load);//autoload :profesorId
router.param('cuestionarioId', cuestionarioController.load);//autoload :profesorId

//Rutas de sesion
router.get('/login', sessionController.new);
router.post('/login', sessionController.create);
router.get('/logout', sessionController.destroy);

router.get('/autores', autorController.list); // Ruta del listado de autores

router.get('/profesores', sessionController.adminRequired, profesorController.index); /* Listado - Alex Baquerizo Jimenez */
router.get('/profesores/new', sessionController.adminRequired, profesorController.new);
router.post('/profesores/create', sessionController.adminRequired, profesorController.create);
router.put('/profesores/:profesorId(\\d+)', sessionController.adminRequired, profesorController.update);
router.delete('/profesores/:profesorId(\\d+)', sessionController.adminRequired, profesorController.destroy);
router.get('/profesores/:profesorId(\\d+)/edit', sessionController.adminRequired, profesorController.edit);


// Cuestionarios

router.get('/cuestionarios', cuestionarioController.index);//ruta de listado de cuestionarios
router.delete('/cuestionarios/:cuestionarioId(\\d+)', sessionController.adminRequired, cuestionarioController.destroy);


router.get('/quizes', quizController.index);

router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', sessionController.loginRequired, quizController.new);
router.post('/quizes/create', sessionController.loginRequired, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.destroy);

router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);

router.get('/quizes/:quizId(\\d+)/comments/:comentId(\\d+)/publish', sessionController.loginRequired, commentController.publish);

router.get('/users', sessionController.adminRequired, userController.index); /* Listado - Alex Baquerizo Jimenez */
router.get('/users/:userId(\\d+)/edit',            sessionController.adminRequired, userController.edit);
router.put('/users/:userId(\\d+)',                  sessionController.adminRequired, userController.update);
router.delete('/users/:userId(\\d+)', sessionController.adminRequired, userController.destroy);


module.exports = router;
