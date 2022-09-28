const {Schema, model} = require('mongoose');
//modelo pacientes
const Paciente = new Schema({
    nombre: String,
    rut: String,
    rutSostenedor: String,
    desc: String,
});

module.exports = model('pacientes', Paciente);