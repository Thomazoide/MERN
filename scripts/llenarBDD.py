from pymongo import MongoClient
import random as r
cluster = MongoClient("mongodb+srv://Thomazoide:Thom1232!@mastercluster.hasjpif.mongodb.net/DataCenter")
db = cluster["DataCenter"]
medics = db["medics"]
admins = db["admins"]
nurses = db["nurses"]
auxs = db["auxs"]
spacientes = db["spacientes"]
pacientes = db["pacientes"]
"""
    La idea de este Script es que agarre el archivo "nentrada.txt" y lo manipule de 
forma que se llene la base de datos con estos datos, poniendo a cada persona 
de forma aleatoria como 'admin', 'medico gral', 'kinesiologo', 'enfermero', 
'jefe auxiliar', 'sostenedor paciente' o 'paciente'.

El archivo tiene datos que estan en el siguiente orden:
    <rut>, <nombre>, <pass>

El tipo de profesional debera tambien ser elegido por aleatoriedad, asi 
como el tipo de administrador(de sede o de institucion), si es enfermero/a,
si sera un paciente o un sostenedor de paciente, eliminando la variable <pass>.

Tambien se debe rellenar los objetos {Sede} y {Box}, cada uno con sus
respectivas caracteristicas.

"""

def extraerData():
    with open('nentrada.txt', 'r', encoding= 'UTF-8') as data:
        for linea in data.readlines():
            yield linea.split('\n')[0].split(',')
data = list(extraerData())

def generarUsuario(usr):
######## definicion de tipo de profesional
    tipoMed = ""
    t = r.randrange(1,4)
    if(t == 1):
        tipoMed = "Medico/a gral"
    elif(t == 2):
        tipoMed = "Kinesiologo/a"
    else:
        tipoMed = "Fonoaudiologo/a"
######## definicion si admin es de institucion o de sede
    deIns = False
    di = r.randrange(0,2)
    if(di == 0):
        deIns = False
    else:
        deIns = True
######## definicion de seguro de sostenedor de paciente
    seguro = ""
    s = r.randrange(0,3)
    if(s == 0):
        seguro = "fonasa"
    elif(s == 1):
        seguro = "isapre"
    else:
        seguro = "particular"
######## creacion de usuario
    rn = r.randrange(1, 7)
    #  1 = medico
    if (rn == 1):
        med = {
            "tipo": tipoMed,
            "nombre": usr[1],
            "rut": usr[0],
            "email": "",
            "cell": "",
            "pass": usr[2],
        }
        return [med, rn]
    # 2 = Admin
    elif (rn == 2):
        adm = {
            "deIns": deIns,
            "nombre": usr[1],
            "rut": usr[0],
            "email": "",
            "cell": "",
            "pass": usr[2],
        }
        return [adm, rn]
    # 3 = Enfermero
    elif (rn == 3):
        enf = {
            "rut": usr[0],
            "nombre": usr[1],
            "email": "",
            "pass": usr[2],
        }
        return [enf, rn]
    # 4 = Jefe auxiliar
    elif (rn == 4):
        aux = {
            "nombre": usr[1],
            "rut": usr[0],
            "email": "",
            "pass": usr[2],
        }
        return [aux, rn]
    # 5 = Sostenedor paciente
    elif (rn == 5):
        spac = {
            "nombre": usr[1],
            "rut": usr[0],
            "rutPaciente": "",
            "seguro": seguro,
        }
        return [spac, rn]
    # 6 = paciente
    else:
        pac = {
            "nombre": usr[1],
            "rut": usr[0],
            "rutSostenedor": "",
            "desc": "",
        }
        return [pac, rn]


def llenarBDD(d):
    for usr in data:
        aux = generarUsuario(usr)
        if (aux[1] == 1):
            medics.insert_one(aux[0])
        elif (aux[1] == 2):
            admins.insert_one(aux[0])
        elif (aux[1] == 3):
            nurses.insert_one(aux[0])
        elif (aux[1] == 4):
            auxs.insert_one(aux[0])
        elif (aux[1] == 5):
            spacientes.insert_one(aux[0])
        else:
            pacientes.insert_one(aux[0])

for usr in data:
    print(generarUsuario(usr))
