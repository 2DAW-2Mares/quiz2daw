
var models = require('../models/models.js'); //coje el modelo estructura de cuestionario

exports.load = function(req, res, next, cuestionarioId) {
		models.Cuestionario.find({
			where: {
				id: Number(cuestionarioId)
			},
                        include: [{ model: models.Profesor }]
		}).then(function(cuestionario) {
			if(cuestionario) {
				req.cuestionario = cuestionario;
				next();
			} else { next(new Error('No existe commentId=' + cuestionarioId))}	
		}
	).catch(function(error){next(error)});
}

//  GET/cuestioanrios VISTA DE LISTA CUESTIONARIOS
exports.index = function(req, res) {
	models.Cuestionario.findAll({
                include: [{ model: models.Profesor }]
		}).then(
                function(cuestionarios) {
    res.render('cuestionarios/index.ejs', {cuestionarios: cuestionarios});
});
}
// GET /cuestionarios/:id/edit
exports.edit = function(req, res) {
    var cuestionario = req.cuestionario; //autoload de instancia de cuestionario
    res.render('cuestionarios/edit', {cuestionario: cuestionario});
};

exports.update = function(req, res) {
    req.cuestionario.observaciones = req.body.cuestionario.observaciones;
    req.cuestionario.fechaFin = req.body.cuestionario.fechaFin;
    
    req.cuestionario
            .validate()
            .then(
            function(err){
                if(err){
                    res.render('cuestionarios/edit',{cuestionario: req.cuestionario});
                }else{
                    req.cuestionario
                            .save({fields:["observaciones","fechaFin"]})
                            .then(function(){res.redirect('/cuestionarios');});
                }
            }
        );
};

//Borrar cuestionarios
exports.destroy = function(req, res){
	req.cuestionario.destroy().then(function(){
        res.redirect('/cuestionarios');
    }).catch(function(error){next(error)});
}
// GET /cuestionarios/new
exports.new = function(req, res) {
	var cuestionario = models.Cuestionario.build( //crea objeto Cuestionario
	{observaciones: "observaciones", fechaFin: "fechaFin"}
	);
    res.render('cuestionarios/new', {cuestionario: cuestionario});
};
// POST /cuestionario/create
exports.create = function(req, res) {
	var cuestionario = models.Cuestionario.build( req.body.cuestionario );
	//guarda en DB los campos pregunta y respuesta de quiz
	cuestionario.validate()
	.then(
		function(err){
			if(err) {
			res.render('cuestionarios/new', {cuestionario: cuestionario, errors: err.errors});
			} else {
				cuestionario.save({fields: ["observaciones", "fechaFin"]}).then(function(){
					res.redirect('/cuestionarios');
				})	//Redireccion HTTP (URL relativo) lista de preguntas
			}
		}
	);
};
