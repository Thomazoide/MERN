from pymongo import MongoClient
cluster = MongoClient("mongodb+srv://Thomazoide:Thom1232!@mastercluster.hasjpif.mongodb.net/DataCenter")
db = cluster["DataCenter"]
collections = [db["medics"], db["admins"], db["nurses"]]
"""
    La idea de este Script es que agarre el archivo "nentrada.txt" y lo manipule de 
forma que se llene la base de datos con estos datos, poniendo a cada persona 
de forma aleatoria como 'admin', 'medico gral', 'kinesiologo' o 'enfermero'.

    El archivo tiene datos que estan en el siguiente orden:
        <rut>, <nombre>, <pass>
    El tipo de profesional debera tambien ser elegido por aleatoriedad, asi como
el tipo de administrador(de sede o de institucion), si es enfermero/a o si sera un 
paciente, utilizando estos datos para llenar una ficha de paciente, con edad aleatoria
y eliminando la variable <pass>

"""