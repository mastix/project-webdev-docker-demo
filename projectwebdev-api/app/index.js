var hapi = require('hapi');
var mongoose = require('mongoose');

// connect to database
mongoose.connect('mongodb://'+process.env.MONGODB_1_PORT_3333_TCP_ADDR+':'+process.env.MONGODB_1_PORT_3333_TCP_PORT+'/persons', function (error) {
    if (error) {
        console.log("Connecting to the database failed!");
        console.log(error);
    }
});

// Mongoose Schema definition
var PersonSchema = new mongoose.Schema({
    id: String,
    firstname: String,
    lastname: String
});

// Mongoose Model definition
var Person = mongoose.model('person', PersonSchema);

// Create a server with a host and port
var server = new hapi.Server();
server.connection({
    port: 3000
});

// Add the route to get a person by id.
server.route({
    method: 'GET',
    path:'/person/{id}',
    handler: PersonIdReplyHandler
});

// Add the route to get all persons.
server.route({
    method: 'GET',
    path:'/person',
    handler: PersonReplyHandler
});

// Add the route to add a new person.
server.route({
    method: 'POST',
    path:'/person',
    handler: PersonAddHandler
});

// Add the route to add a new person.
server.route({
    method: 'DELETE',
    path:'/person/{id}',
    handler: PersonDeleteHandler
});

// Return all users in the database.
function PersonReplyHandler(request, reply){
    Person.find({}, function (err, docs) {
        reply(docs);
    });
}

// Return a certain user based on its id.
function PersonIdReplyHandler(request, reply){
    if (request.params.id) {
        Person.find({ id: request.params.id }, function (err, docs) {
            reply(docs);
        });
    }
}

// Add new person to the database.
function PersonAddHandler(request, reply){
    var newPerson = new Person();
    newPerson.id = request.payload.id;
    newPerson.lastname = request.payload.lastname;
    newPerson.firstname = request.payload.firstname;
    newPerson.save(function (err) {
        if (!err) {
            reply(newPerson).created('/person/' + newPerson.id);    // HTTP 201
        } else {
            reply("ERROR SAVING NEW PERSON!!!"); // HTTP 403
        }
    });
}

// Remove person from the database.
function PersonDeleteHandler(request, reply){
    if (request.params.id) {
        Person.find({ id: request.params.id}).remove(function(){
            reply(true);
        });
    }
}

// Start the server
server.start();