const Medics = require('./models/Medics');
const Admins = require('./models/Admins');
const Nurses = require('./models/Nurses');
const resolvers = {
    Query: {
        hello: () => 'Usuario no encontrado',
        getAllMedics: async () => {
            const meds = await Medics.find();
            return meds;
        },
        async getMedics(_, {rut}){
            const meds = await Medics.find();
            let fmed = null;
            for(let med of meds){
                if (rut == med.rut){
                    fmed = med;
                }
            }
            if(fmed != null){
                return fmed;
            }
            
        },
        getAllAdmins: async () => {
            const admns = await Admins.find();
            return admns;
        },
        getAdmins: async (_, {rut}) => {
            const admns = await Admins.find();
            for(let admn of admns){
                if(admn.rut == rut){
                    return admn
                }
                else{
                    return {
                        message: "Usuario no encontrado",
                    };
                }
            }
        },
        getAllNurses: async () => {
            const nurses = await Nurses.find();
            return nurses;
        },
        getNurses: async (_, {rut}) => {
            const nurses = await Nurses.find();
            for(let nurse of nurses){
                if(nurse.rut == rut){
                    return nurse;
                }
                else{
                    return {
                        message: "Usuario no encontrado",
                    };
                }
            }
        }
    },

    Mutation: {
        crearMed: async (_, args) => {
            const {tipo, nombre, rut, email, cell, pass} = args;
            const nuevoMed = new Medics({tipo, nombre, rut, email, cell, pass});
            await nuevoMed.save();
            return nuevoMed;
        },
        crearAdmin: async (_, args) => {
            const {deIns, nombre, rut, email, cell, pass} = args;
            const nuevoAdmin = new Admins({deIns, nombre, rut, email, cell, pass});
            await nuevoAdmin.save();
            return nuevoAdmin;
        },
        crearNurse: async (_, args) => {
            const {rut, nombre, email, pass} = args;
            const nuevoNurse = new Nurses({rut, nombre, email, pass});
            await nuevoNurse.save();
            return nuevoNurse;
        },
        deleteMed: async (_, args) => {
            const meds = await Medics.find();
            let dMed = null;
            for(let med of meds){
                if(med.rut == args.rut){
                    dMed = med;
                }
            }
            await dMed.delete();
            return `Usuario de rut ${args.rut} eliminado de base de datos.`
        },
        deleteAdmin: async (_, args) => {
            const admns = await Admins.find();
            let dAdmn = null;
            for(let admn of admns){
                if(admn.rut == args.rut){
                    dAdmn = admn;
                }
            }
            await dAdmn.delete();
            return `Usuario de rut ${args.rut} eliminado de base de datos.`
        },
        deleteNurse: async (_, args) => {
            const nurses = await Nurses.find();
            let dNurs = null;
            for(let nurse of nurses){
                if(nurse.rut == args.rut){
                    dNurs = nurse;
                }
            }
            await dNurs.delete();
            return `Usuario de rut ${args.rut} eliminado de base de datos.`
        }
    },
}

module.exports = {resolvers};