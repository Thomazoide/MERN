const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type Medics{
        id: ID!
        tipo: String!
        nombre: String
        rut: String!
        email: String
        cell: String
        pass: String
    }
    
    type Query{
        hello: String
        getAllMedics: [Medics]
        getMedics(rut: String): Medics
    }

    type Mutation{
        crearMed(tipo: String, nombre: String, rut: String, email: String, cell: String, pass: String): Medics
    }
`
module.exports = {typeDefs};