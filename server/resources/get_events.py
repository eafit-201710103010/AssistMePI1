"""All the logic for downloading all the event is located here."""

# Import dependencies from flask_restful, as well as the database models necessary and the session to connect to it
from flask_restful import Resource
from resources.database.db_session import session
from resources.database.models import Evento

# This class will manage everything related to the registration process
class GetEvents(Resource):
  """ Class used to manage all the logic for when downloading the list of avalilable events """
  # when a get request arrives, parse the arguments, create that event's model and add it to the database
  # also returns a 200 HTTP status code indicating that the GET request was succesfull
  def get(self):
    # looks for an event id in the table and returns the number if one, and only one, match is found
    eventos = session.query(Evento).all()
    
    # create a list to store all the events
    lista_eventos = []
    
    # add every event to the list
    for evento in eventos:
      evento_auxiliar = {
                          "nombre": evento.nombre,
                          "lugar": evento.lugar,
                          "fecha": evento.fecha
                        }

      lista_eventos.append(evento_auxiliar)

    return lista_eventos, 200