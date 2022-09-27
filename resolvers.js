const Medics = require('./models/Medics');
const Admins = require('./models/Admins');
const resolvers = {
    Query: {
        hello: () => 'Hello world',
        getAllMedics: async () => {
            const meds = await Medics.find();
            return meds;
        },
        async getMedics(_, {rut}){
            const meds = await Medics.find();
            const medic =null;
            for(med of meds){
                if (rut == med.rut){
                    return med;
                }
                else{
                    return {
                        message: "Usuario no encontrado",
                    }
                }
            }
        }
    },

    Mutation: {
        crearMed: async (_, {tipo, nombre, rut, email, cell, pass}) => {
            const nuevoMed = new Medics(tipo, nombre, rut, email, cell, pass);
            nuevoMed.save();
            return nuevoMed;
        }
    }
}

module.exports = {resolvers};