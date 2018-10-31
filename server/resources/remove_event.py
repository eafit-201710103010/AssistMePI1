"""All the logic for removing an event is located here."""

# Import dependencies from flask_restful, as well as the database models necessary and the session to connect to it
from flask_restful import Resource, reqparse
from resources.database.db_session import session
from resources.database.models import Asistente, Evento

from sqlalchemy.exc import IntegrityError

# Create the parser for the requests and remove all the expected arguments
rem_event_parser = reqparse.RequestParser()
rem_event_parser.add_argument("nombre")
rem_event_parser.add_argument("lugar")
rem_event_parser.add_argument("fecha")

def hash_event(name):
  """ Hashes the name of an event to generate a usable event id of type int (BigInteger on the database) """
  name_length = len(name)
  name_hash = 0

  # Based on the java hashCode() function
  for i in range(name_length):
    name_hash += ord(name[i])*3**(name_length-1-i)
    
  name_hash = int(name_hash/(name_length*1000))

  return name_hash

# This class will manage everything related to delete an event process
class RemoveEvent(Resource):
  """ Class used to manage all the logic for when an event is removed """
  # when a delete request arrives, parse the arguments, remove the event requested in the database
  # also returns a 201 HTTP status code indicating that the DELETE request was succesfull
  # or a 500 HTTP status code indicating an internal server error if the DELETE request was not successful
  def delete(self):

    #Parser arguments
    args = rem_event_parser.parse_args()

    # search for the assistants first then delete the event itself
    id_evento = session.query(Evento.id_evento).filter(Evento.nombre.like(args["nombre"])).scalar()
    asistentes_evento = session.query(Asistente).filter(Asistente.id_evento == id_evento).delete()

    #create the event id
    event_identifier = hash_event(args["nombre"])
    
    # Create model object
    evento = Evento(id_evento=event_identifier,
                    nombre=args["nombre"],
                    lugar=args["lugar"],
                    fecha=args["fecha"]
                    )
    
    # Variable to control error detection for return values
    error_found = False

    try:
      session.delete(evento)
      session.commit()

    except IntegrityError:
      # a entry was found in the db
      error_found = True
      print("\nDATABASE INTEGRITY ERROR! Aborting insersion of:\n{}".format(evento))
      session.rollback()

    evento_data = {
                   "id_evento": evento.id_evento,
                   "nombre": evento.nombre,
                   "lugar": evento.lugar,
                   "fecha": evento.fecha
                  }

    if error_found:
      return evento_data, 500 # Internal server error
    else:
      return evento_data, 204 # DELETE Success