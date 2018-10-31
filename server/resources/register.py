"""All the logic for the registration process is located here."""

# Import dependencies from flask_restful, as well as the database models necessary and the session to connect to it
from flask_restful import Resource, reqparse
from resources.database.db_session import session
from resources.database.models import Asistente, Evento
# Import possible errors
from sqlalchemy.exc import IntegrityError

# Create the parser for the requests and add all the expected arguments
register_parser = reqparse.RequestParser()
register_parser.add_argument("serial")
register_parser.add_argument("nombre")
register_parser.add_argument("codigo")
register_parser.add_argument("doc_identidad")
register_parser.add_argument("ocupacion")
register_parser.add_argument("edad")
register_parser.add_argument("sexo")
register_parser.add_argument("nombre_evento")

# This class will manage everything related to the registration process
class Register(Resource):
  """ Class used to manage all the logic of the registration process """
  # when a post request arrives, parse the arguments, create that person's model and add it to the database
  # also returns a 201 HTTP status code indicating that the POST request was succesfull
  # or a 500 HTTP status code indicating an internal server error if the POST request was not successful
  def post(self):
    # Parse Arguments
    args = register_parser.parse_args()

    # look for the corresponding event id based on the event name
    id_evento_persona = session.query(Evento.id_evento).filter(Evento.nombre == args["nombre_evento"]).scalar()

    # Create model object
    persona = Asistente(doc_identidad=args["doc_identidad"],
                        serial=args["serial"],
                        nombre=args["nombre"],
                        codigo=args["codigo"],
                        ocupacion=args["ocupacion"],
                        edad=args["edad"],
                        sexo=args["sexo"],
                        asistio=False,
                        id_evento=id_evento_persona
                        )
    # Variable to control error detection for return values
    error_found = False

    try:
      session.add(persona)
      session.commit()

    except IntegrityError:
      # a duplicate entry was found in the db
      error_found = True
      print("\nDATABASE INTEGRITY ERROR! Aborting Registration for:\n{}".format(persona))
      session.rollback() # restart session to get rid of errors
    
    persona_data = {
                    "doc_identidad": persona.doc_identidad,
                    "serial": persona.serial,
                    "nombre": persona.nombre,
                    "codigo": persona.codigo,
                    "ocupacion": persona.ocupacion,
                    "edad": persona.edad,
                    "sexo": persona.sexo,
                    "id_evento": persona.id_evento
                   }

    if error_found:
      return persona_data, 500 # Internal Server Error
    else:
      return persona_data, 201 # POST Success