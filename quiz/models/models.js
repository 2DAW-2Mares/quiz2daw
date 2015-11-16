var path = require('path');

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite:
var sequelize = new Sequelize(null, null, null,
			{dialect: "sqlite", storage: "quiz.sqlite"}
		);

// Importar la definición de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

// Importar la definición de la tabla User en user.js
var User = sequelize.import(path.join(__dirname, 'user'));


// Importar la definición de la tabla Profesor en profesor.js
var Profesor = sequelize.import(path.join(__dirname, 'profesor'));


//Importar la definicion de la tabla CuestionarioAsignado en cuestionarioAsignado.js
var CuestionarioAsignado = sequelize.import(path.join(__dirname,'cuestionarioAsignado'));


// Importar la definición de la tabla Alumno en alumno.js
var Alumno = sequelize.import(path.join(__dirname, 'alumno'))

var Grupo = sequelize.import(path.join(__dirname, 'grupo'));



// Importar la definici�n de la tabla Profesor en profesor.js
var Profesor = sequelize.import(path.join(__dirname, 'profesor'));


var Cuestionario = sequelize.import(path.join(__dirname, 'cuestionario'));

//importa la definición de la tabla Materia en materia.js
var Materia = sequelize.import(path.join(__dirname, 'materia'));


var Observacion = sequelize.import(path.join(__dirname, 'observacion'));


// sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().then(function() {
	// then(..) ejecuta el manejador una vez creada la tabla
	Quiz.count().then(function(count) {
		if(count === 0) { // la tabla se inicializa solo si está vacía
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
		if(count === 0) { // la tabla se inicializa solo si está vacía
		User.create({ username: 'admin' ,
					  password: '1234'
		});
		User.create({ username: 'pepe' ,
					  password: '5678'
		})
		.then(function(){console.log('Tabla User inicializada')});
		};
	});

	Profesor.count().then(function(count) {
		if(count === 0) { // la tabla se inicializa solo si está vacía
		Profesor.create({ apellidos: 'Sierra Olmos' ,
					  nombre: 'Alberto',
					  email: 'albertosierra@gmail.com',
					  dni: '12345678E',
					  movil: '699699699',
					  departamento: 'Informatica'
		})
		.then(function(){console.log('Tabla Profesor inicializada')});
		};
	});

	Alumno.count().then(function(count) {
		if(count === 0) { // la tabla se inicializa solo si está vacía
		Alumno.create({ dni: '52748123A',
						apellido1: 'Pérez',
						apellido2: 'López',
						nombre: 'Juan',
						email: 'Juan@gmail.com'
		});
		Alumno.create({ dni: '65127382S',
						apellido1: 'Blazquez',
						apellido2: 'Guijarro',
						nombre: 'Davida',
						email: 'Davida@gmail.com'
		})
		.then(function(){console.log('Tabla Alumno inicializada')});
		};
	});
	Grupo.count().then(function(count) {
		if(count === 0) { // la tabla se inicializa solo si está vacía
		Grupo.create({ tutor: 'jose' ,
					  anyo: '2015' ,
					  grupo: "DAW" ,
					  subgrupo: "DAW" ,
					  ensenanza: "FP" ,
					  curso: "2" ,
					  horarioVisita: "12:00"
		});
		Grupo.create({ tutor: 'alberto' ,
					  anyo: '2015' ,
					  grupo: "DAW" ,
					  subgrupo: "DAW" ,
					  ensenanza: "FP" ,
					  curso: "1" ,
					  horarioVisita: "12:00"
		})
		.then(function(){console.log('Tabla Grupo inicializada')});
	};
	});
	Materia.count().then(function(count) {
		if(count === 0) { // la tabla se inicializa solo si esta vacia
		Materia.create({ id: '1' , materia: 'servidor', ensenanza: 'informatica', curso: '2DAW'
					 
		});
		Materia.create({ id: '2' , materia: 'cliente', ensenanza: 'informatica', curso: '2DAW'
		})
		.then(function(){console.log('Tabla Materia inicializada')});

		};
	});

	Cuestionario.count().then(function(count){
		if(count === 0){
			Cuestionario.create({ creador: 1 ,
                                            observaciones: 'vacio' ,
                                            fechaFin: '2015-10-2',
				
			})
			.then(function(){console.log('Tabla Cuestionario inicializada')})
		}
		
	});
	Observacion.count().then(function(count) {
		if(count === 0) { // la tabla se inicializa solo si está vacía
		Observacion.create({ profesor: 'Soro' ,
							 cuestionario: 1,
							 observacion:'Estoy muy feliz.'
		});
		Observacion.create({ profesor: 'Jose' ,
							 cuestionario: 2,
							 observacion:'Me encanta'
		});
		Observacion.create({ profesor: 'Alberto' ,
							 cuestionario: 3,
							 observacion:'Muy contento.'
		})
		.then(function(){console.log('Tabla Observacion inicializada')});
		};
	});



	CuestionarioAsignado.count().then(function(count) {
		if(count === 0) { // la tabla se inicializa solo si está vacía
		CuestionarioAsignado.create({ completado: '0'
		})
		.then(function(){console.log('Tabla CuestionarioAsignado inicializada')});
		};
	});



});


var comment_path = path.join(__dirname, 'comment');
var Comment = sequelize.import(comment_path);

var cuestionario_path = path.join(__dirname, 'cuestionario');
var Cuestionario = sequelize.import(cuestionario_path);

var profesor_path = path.join(__dirname, 'profesor');
var Profesor = sequelize.import(profesor_path);

Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

Profesor.belongsTo(User);
User.hasMany(Profesor, {foreignKey: 'idUsuario'});

Grupo.belongsTo(Profesor);
Profesor.hasMany(Grupo, {foreignKey: 'nombre'});


Cuestionario.belongsTo(Profesor, {foreignKey: 'creador'});
Profesor.hasMany(Cuestionario);


exports.Quiz = Quiz; 
exports.Comment = Comment;
exports.User = User;
exports.Profesor = Profesor;
exports.Alumno = Alumno;

exports.Grupo = Grupo;
exports.Cuestionario = Cuestionario;
exports.Observacion = Observacion;
exports.Materia = Materia;


Cuestionario.belongsTo(Profesor, {foreignKey: 'creador'});
Profesor.hasMany(Cuestionario);


exports.Quiz = Quiz; 
exports.Comment = Comment;
exports.User = User;

exports.Grupo = Grupo;

exports.Cuestionario = Cuestionario;
exports.Profesor = Profesor;

exports.Grupo = Grupo;

exports.Materia = Materia;

CuestionarioAsignado.belongsTo(Cuestionario, Alumno);	

exports.CuestionarioAsignado = CuestionarioAsignado;

