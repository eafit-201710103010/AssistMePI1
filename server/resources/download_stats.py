"""All the logic for downloading statistics of a certain event is located here."""

# Import dependencies from flask_restful, as well as the database models necessary and the session to connect to it
from flask_restful import Resource
from resources.database.db_session import session, reconnect_to_db
from resources.database.models import Asistente, Evento

from sqlalchemy.exc import OperationalError

# This class will manage everything related to the registration process
class DownloadStats(Resource):
  """ Class used to manage all the logic for when an event's stats are downloaded """
  # when a get request arrives, parse the arguments, create that event's model and add it to the database
  # also returns a 200 HTTP status code indicating that the GET request was succesfull
  def get(self, nombre_evento):
    # looks for an event id in the table and returns the number if one, and only one, match is found
    try:
      id_evento = session.query(Evento.id_evento).filter(Evento.nombre.like(nombre_evento)).scalar()
    
    except OperationalError:
      session.rollback()
      reconnect_to_db()
      DownloadStats.get(self, nombre_evento)
    
    # create a list to store all of the assistants
    info_asistentes = []
    # look for all the assistants in the db
    try:
      asistentes_evento = session.query(Asistente).filter(Asistente.id_evento == id_evento).all()
    
    except OperationalError:
      session.rollback()
      reconnect_to_db()
      DownloadStats.get(self, nombre_evento)
    
    # add everyone to the list as a dict (json)
    for asistente in asistentes_evento:
      asistentes_auxiliar = {
                              "doc_identidad": asistente.doc_identidad,
                              "serial": asistente.serial,
                              "nombre": asistente.nombre,
                              "codigo": asistente.codigo,
                              "ocupacion": asistente.ocupacion,
                              "edad": asistente.edad,
                              "sexo": asistente.sexo,
                              "asistio": asistente.asistio,
                              "id_evento": asistente.id_evento  
                            }

      info_asistentes.append(asistentes_auxiliar)

    return info_asistentes, 200