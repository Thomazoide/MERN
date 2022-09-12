const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const {merge} = require("lodash");
const Usuario = require("./models/usuario");
const {ApolloServer, gql} = require("apollo-server-express");
//const usuario = require("./models/usuario");
mongoose.connect("mongodb+srv://Thomazoide:Thom1232!@mastercluster.hasjpif.mongodb.net/DataPpal", {useNewUrlParser: true, useUnifiedTopology: true});
const app = express();
const typeDefs = gql`
    type Usuario{
        id: ID!
        email: String!
        pass: String!
    }
    type Alert{
        message: String
    }
    input UsuarioInput {
        email: String!
        pass: String!
    }
    type Query{
        getUsuarios: [Usuario]
        getusuario(id: ID!): Usuario
    }
    type Mutation{
        addUsuario(input: UsuarioInput): Usuario
        updateUsuario(id: ID!, input: UsuarioInput): Usuario
        deleteUsuario(id: ID!): Alert
    }
`;
const resolvers = {
    Query: {
        async getUsuarios(obj){
            const usuarios = await Usuario.find();
            return usuarios;
        },
        async getusuario(obj, {id}){
            const usuario = await Usuario.findById(id);
            return usuario;
        }
    },
    Mutation: {
        async addUsuario(obj, {input}){
            const usuario = new Usuario(input);
            await usuario.save();
            return usuario;
        },
        async updateUsuario(obj, {id, input}){
            const usuario = await Usuario.findByIdAndUpdate(id, input);
            return usuario;
        },
        async deleteUsuario(obj, {id}){
            await Usuario.deleteOne({_id: id});
            return {
                message: "Usuario eliminado..."
            }
        }
    }
}
let apolloServer = null;
const corsOptions = {
    origin: "httpl://localhost:8090",
    credentials: false
};
async function startServer(){
    const apolloServer = new ApolloServer({typeDefs, resolvers, corsOptions});
    await apolloServer.start();
    apolloServer.applyMiddleware({app, cors: false});
}
app.use(cors());
app.listen(8090, function(){
    console.log("servidor iniciado...");
});
startServer();