"""All the logic for the user log-in process is located here."""

# Import dependencies from flask_restful, as well as the database models necessary and the session to connect to it
from flask_restful import Resource, reqparse
from sqlalchemy import and_
from resources.database.db_session import session
from resources.database.models import Usuario
# Also import the AESCipher from tools in order to encrypt and decrypt user passwords, as well as it's key
from resources.tools.aes_encryption import AESCipher, secret_key

# Create the parser for the requests and add all the expected arguments
log_in_parser = reqparse.RequestParser()
log_in_parser.add_argument("nombre")
log_in_parser.add_argument("password")

class LogIn(Resource):
  """ Class used to manage all the logic for user log in """
  # when a post request arrives, parse the arguments, look for that user in the database and say if it exists or not
  # also returns a 200 HTTP status code indicating that the GET request was succesfull
  # or a 500 HTTP status code indicating an internal server error if the GET request was not successful
  def get(self):
    # Parse Aguments
    args = log_in_parser.parse_args()

    # Create the chiper object and encypt the password
    cipher = AESCipher(secret_key)
    user_password = args["password"]
    encrypted_password = cipher.encrypt(user_password)

    usuario = session.query(Usuario).filter( and_(
                                                  Usuario.nombre == args["nombre"],
                                                  Usuario.password == encrypted_password
                                                  )).first()

    if usuario is None:
      return {"message": "Incorrect password or username"}, 500

    else:     
      info_usuario = {
                      "nombre": usuario.nombre,
                      "password": usuario.password,
                      "permiso": usuario.permiso
                    }

      return info_usuario, 200

    
