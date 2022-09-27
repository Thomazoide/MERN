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
    
    type Query{
        hello: String
        getAllMedics: [Medics]
        getAllAdmins: [Admins]
        getAllNurses: [Nurses]
        getMedics(rut: String): Medics
        getAdmins(rut: String): Admins
        getNurses(rut: String): Nurses
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