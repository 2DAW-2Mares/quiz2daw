var models = require('../models/models.js');
// Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
	models.Quiz.find({
            where: { id: Number(quizId)},
            include: [{ model: models.Comment }]
        }).then(function(quiz) {
				if(quiz) {
					req.quiz = quiz;
					next();
				} else { next(new Error('No existe quizId=' + quizId)); }
			}
	).catch(function(error) { next(error);});
};

// GET /quizes
exports.index = function(req, res) {
	models.Quiz.findAll().then(
                function(quizes) {
    //res.render('quizes/index.ejs', {quizes: quizes});
	req.cuestionario.getQuizzes().then(function(preguntasAsociadas){
		res.render('quizes/index', {quizes: quizes, cuestionario: req.cuestionario, preguntasAsociadas: preguntasAsociadas});
	})
});
}

// GET /quizes/:quizId
exports.show = function(req, res) {
    res.render('quizes/show', {quiz: req.quiz});
};


// GET /quizes/:id/answer
exports.answer = function(req, res) {

	var resultado = 'Incorrecto';
	if(req.query.respuesta === req.quiz.respuesta){
		resultado = 'Correcto';
	}
	res.render('quizes/answer', {respuesta: resultado, quiz: req.quiz});
        };

// GET /quizes/new
exports.new = function(req, res) {
	var quiz = models.Quiz.build( //crea objeto quiz
	{pregunta: "Pregunta", respuesta: "Respuesta"}
	);
    res.render('quizes/new', {quiz: quiz, cuestionario: req.cuestionario});
};

// POST /quizes/create
exports.create = function(req, res) {
	var quiz = models.Quiz.build( req.body.quiz );
	quiz.CuestionarioId = req.cuestionario.id;
	
	//guarda en DB los campos pregunta y respuesta de quiz
	quiz.validate()
	.then(
		function(err){
			if(err) {
			res.render('quizes/new', {quiz: quiz, errors: err.errors});
			} else {
				quiz.save({fields: ["pregunta", "respuesta","CuestionarioId"]
			
			}).then(function(){
					res.redirect('/admin/cuestionarios/'+ req.cuestionario.id +'/quizes/');
				})	//Redireccion HTTP (URL relativo) lista de preguntas
			}
		}
	);
};

// GET /quizes/:id/edit
exports.edit = function(req, res) {
    var quiz = req.quiz; //autoload de instancia de quiz
    res.render('quizes/edit', {quiz: quiz, cuestionario:req.cuestionario});
};

exports.update = function(req, res) {
    req.quiz.pregunta = req.body.quiz.pregunta;
    req.quiz.respuesta = req.body.quiz.respuesta;
    
    req.quiz
            .validate()
            .then(
            function(err){
                if(err){
                    res.render('quizes/edit',{quiz: req.quiz, cuestionario:req.cuestionario});
                }else{
                    req.quiz
                            .save({fields:["pregunta","respuesta"]})
                            .then(function(){res.redirect('/admin/cuestionarios/'+ req.cuestionario.id +'/quizes');});
                }
            }
        );
};


exports.destroy = function(req, res) {
    req.quiz.destroy().then( function(){
        res.redirect('/admin/cuestionarios/'+ req.cuestionario.id +'/quizes/');
    }).catch(function(error){next(error)});
};

exports.batch = function(req, res){/*asociar preguntas con cuestionario***/
	var preguntasPorAsociar = [];
	
	for(key in req.body.quizes) {console.log(key+' - '+req.body.quizes[key]);preguntasPorAsociar.push(key);}
	models.Quiz.findAll({
            where: { id: {$in: preguntasPorAsociar}}
        }).then(function(quizes) {
			req.cuestionario.setQuizzes(quizes);
			req.cuestionario.save();
			res.redirect('/admin/cuestionarios/'+req.cuestionario.id+'/quizes');
		});
};
