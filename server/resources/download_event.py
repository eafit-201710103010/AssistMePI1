
from flask_restful import Resource
from resources.database.db_session import session
from resources.database.models import Asistente, Evento

class DownloadEvent(Resource):
  def get(self, nombre_evento):
    # looks for an event id in the table and returns the number if one, and only one, match is found
    id_evento = session.query(Evento.id_evento).filter(Evento.nombre.like(nombre_evento)).scalar()
    
    info_asistentes = []
    asistentes_evento = session.query(Asistente).filter(Asistente.id_evento == id_evento).all()
    
    for asistente in asistentes_evento:
      asistentes_auxiliar = {
                              "doc_identidad": asistente.doc_identidad,
                              "serial": asistente.serial,
                              "nombre": asistente.nombre,
                              "codigo": asistente.codigo,
                              "ocupacion": asistente.ocupacion,
                              "edad": asistente.edad,
                              "sexo": asistente.sexo,
                              "id_evento": asistente.id_evento  
                            }

      info_asistentes.append(asistentes_auxiliar)

    return info_asistentes, 200