from flask_restful import Resource, reqparse

# Temporary dictionary used to store the data that's recieved before storing it in the DB
PERSONAS = {}

# Create the parser for the requests and add all the expected requests
register_parser = reqparse.RequestParser()
register_parser.add_argument("serial")
register_parser.add_argument("nombre")
register_parser.add_argument("codigo")
register_parser.add_argument("doc_identidad") # PK
register_parser.add_argument("ocupacion")
register_parser.add_argument("edad")
register_parser.add_argument("sexo")

# This class will manage everything related to the registration process
class Register(Resource):
  """ Class used to manage all the logic of the registration process """
  # when a post request arrives, parse the arguments and store everything in the temporal dictionary
  # also returns a 201 HTTP status code indicating that the POST request was succesfull
  def post(self):

    args = register_parser.parse_args()

    PERSONAS[args["doc_identidad"]] = {
      "serial": args["serial"],
      "nombre": args["nombre"],
      "codigo": args["codigo"],
      "ocupacion": args["ocupacion"],
      "edad": args["edad"],
      "sexo": args["sexo"]
    }
    #print(PERSONAS)
    return PERSONAS[args["doc_identidad"]], 201