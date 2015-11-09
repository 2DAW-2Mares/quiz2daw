var path = require('path');

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite:
var sequelize = new Sequelize(null, null, null,
			{dialect: "sqlite", storage: "quiz.sqlite"}
		);

// Importar la definici�n de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

// Importar la definici�n de la tabla User en user.js
var User = sequelize.import(path.join(__dirname, 'user'));

var Cuestionario = sequelize.import(path.join(__dirname, 'cuestionario'));

// sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().then(function() {
	// then(..) ejecuta el manejador una vez creada la tabla
	Quiz.count().then(function(count) {
		if(count === 0) { // la tabla se inicializa solo si est� vac�a
		Quiz.create({ pregunta: 'Capital de Italia' ,
					  respuesta: 'Roma'
		});
		Quiz.create({ pregunta: 'Capital de Portugal' ,
					  respuesta: 'Lisboa'
		})
		.then(function(){console.log('Tabla Quiz inicializada')});
		};
	});
	User.count().then(function(count) {
		if(count === 0) { // la tabla se inicializa solo si est� vac�a
		User.create({ username: 'admin' ,
					  password: '1234'
		});
		User.create({ username: 'pepe' ,
					  password: '5678'
		})
		.then(function(){console.log('Tabla User inicializada')});
		};
	});
	
	Cuestionario.count().then(function(count){
		if(count === 0){
			Cuestionario.create({ creador: 2 ,
									observaciones: 'vacio' ,
									fechaFin: '2015-10-2',
				
			})
			.then(function(){console.log('Tabla Cuestionario inicializada')})
		}
		
	})
	
});

var comment_path = path.join(__dirname, 'comment');
var Comment = sequelize.import(comment_path);

var cuestionario_path = path.join(__dirname, 'cuestionario');
var Cuestionario = sequelize.import(cuestionario_path);

var profesor_path = path.join(__dirname, 'profesor');
var Profesor = sequelize.import(profesor_path);

Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

Cuestionario.belongsTo(Profesor);
Profesor.hasMany(Cuestionario);

exports.Quiz = Quiz; // exportar definici�n de tabla Quiz
exports.Comment = Comment;
exports.User = User;
exports.Cuestionario = Cuestionario;
