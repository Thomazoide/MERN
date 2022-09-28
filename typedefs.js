const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type Medics{
        id: ID!
        tipo: String!
        nombre: String
        rut: String!
        email: String
        cell: String
        pass: String!
    }

    type Admins{
        id: ID!
        deIns: Boolean!
        nombre: String
        rut: String!
        email: String
        cell: String
        pass: String!
    }

    type Nurses{
        rut: String!
        nombre: String!
        email: String
        pass: String!
    }

    type JAuxs{
        nombre: String!
        rut: String!
        email: String
        pass: String!
    }

    type SPacientes{
        nombre: String!
        rut: String!
        rutPaciente: String
        seguro: String
    }

    type Pacientes{
        nombre: String!
        rut: String!
        rutSostenedor: String
        desc: String
    }
    
    type Query{
        hello: String
        getAllMedics: [Medics]
        getAllAdmins: [Admins]
        getAllNurses: [Nurses]
        getAllAuxs: [JAuxs]
        getAllSPacientes: [SPacientes]
        getAllPacientes: [Pacientes]
        getMedics(rut: String): Medics
        getAdmins(rut: String): Admins
        getNurses(rut: String): Nurses
        getAux(rut: String): JAuxs
        getSPaciente(rut: String): SPacientes
        getPaciente(rut: String): Pacientes
    }

    type Mutation{
        crearMed(tipo: String, nombre: String, rut: String, email: String, cell: String, pass: String): Medics
        crearAdmin(deIns: Boolean, nombre: String, rut: String, email: String, cell: String, pass: String): Admins
        crearNurse(rut: String, nombre: String, email: String, pass: String): Nurses
        deleteMed(rut: String): String
        deleteAdmin(rut: String): String
        deleteNurse(rut: String): String
    }
`
module.exports = {typeDefs};