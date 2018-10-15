"""All the logic for adding an event is located here."""

# Import dependencies from flask_restful, as well as the database models necessary and the session to connect to it
from flask_restful import Resource, reqparse
from resources.database.db_session import session
from resources.database.models import Evento

from sqlalchemy.exc import IntegrityError

# Create the parser for the requests and add all the expected arguments
add_event_parser = reqparse.RequestParser()
add_event_parser.add_argument("id_evento")
add_event_parser.add_argument("nombre")
add_event_parser.add_argument("lugar")
add_event_parser.add_argument("fecha")

# This class will manage everything related to the registration process
class AddEvent(Resource):
  """ Class used to manage all the logic for when an event is added """
  # when a post request arrives, parse the arguments, create that event's model and add it to the database
  # also returns a 201 HTTP status code indicating that the POST request was succesfull
  # or a 500 HTTP status code indicating an internal server error if the POST request was not successful
  def post(self):
    # Parser arguments
    args = add_event_parser.parse_args()

    # Create model object
    evento = Evento(id_evento=int(args["id_evento"]),
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