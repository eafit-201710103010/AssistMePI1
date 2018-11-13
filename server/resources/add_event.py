"""All the logic for adding an event is located here."""

# Import dependencies from flask_restful, as well as the database models necessary and the session to connect to it
from flask_restful import Resource, reqparse
from resources.database.db_session import session
from resources.database.db_session import reconnect_to_db
from resources.database.models import Evento

from sqlalchemy.exc import IntegrityError, OperationalError

# Create the parser for the requests and add all the expected arguments
add_event_parser = reqparse.RequestParser()
add_event_parser.add_argument("nombre")
add_event_parser.add_argument("lugar")
add_event_parser.add_argument("fecha")

def hash_event(name):
  """ Hashes the name of an event to generate a usable event id of type in (BigInteger on the database) """
  name_length = len(name)
  name_hash = 0

  # Based on the java hashCode() function
  for i in range(name_length):
    name_hash += ord(name[i])*3**(name_length-1-i)
    
  name_hash = int(name_hash/(name_length*1000))

  return name_hash

# This class will manage everything related to the registration process
class AddEvent(Resource):
  """ Class used to manage all the logic for when an event is added """
  # when a post request arrives, parse the arguments, create that event's model and add it to the database
  # also returns a 201 HTTP status code indicating that the POST request was succesfull
  # or a 500 HTTP status code indicating an internal server error if the POST request was not successful
  def post(self):
    # Parser arguments
    args = add_event_parser.parse_args()

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
      session.add(evento)
      session.commit()

    except IntegrityError:
      # a duplicate entry was found in the db
      error_found = True
      print("\nDATABASE INTEGRITY ERROR! Aborting insersion of:\n{}".format(evento))
      session.rollback()
    
    except OperationalError:
      session.rollback()
      reconnect_to_db()
      AddEvent.post(self)

    evento_data = {
                   "id_evento": evento.id_evento,
                   "nombre": evento.nombre,
                   "lugar": evento.lugar,
                   "fecha": evento.fecha
                  }

    if error_found:
      return evento_data, 500 # Internal server error
    else:
      return evento_data, 201 # POST Success