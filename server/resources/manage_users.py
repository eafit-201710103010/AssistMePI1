"""All the logic for managing users process is located here."""

# Import dependencies from flask_restful, as well as the database models necessary and the session to connect to it
from flask_restful import Resource, reqparse
from resources.database.db_session import session
from resources.database.models import Usuario
# Import possible errors
from sqlalchemy.exc import IntegrityError

# Create the parser for the requests and add all the expected arguments
post_user_parser = reqparse.RequestParser()
post_user_parser.add_argument("nombre")
post_user_parser.add_argument("password")
post_user_parser.add_argument("permiso")

# This class will manage everything related to managing users process
class ManageUsers(Resource):
  """ Class used to manage all the logic for managing users process """
  # when a post request arrives, parse the arguments, create that person's model and add it to the database
  # also returns a 201 HTTP status code indicating that the POST request was succesfull
  # or a 500 HTTP status code indicating an internal server error if the POST request was not successful
  def post(self):
    # Parse Arguments
    args = post_user_parser.parse_args()

    # Create model object
    usuario = Usuario(nombre=args["nombre"],
                      password=args["password"],
                      permiso=args["permiso"]
                     )

    # Variable to control error detection for return values
    error_found = False

    try:
      session.add(usuario)
      session.commit()

    except IntegrityError:
      # a duplicate entry was found in the db
      error_found = True
      print("\nDATABASE INTEGRITY ERROR! Aborting Registration for:\n{}".format(usuario))
      session.rollback() # restart session to get rid of errors
    
    usuario_data = {
                    "nombre": usuario.nombre,
                    "password": usuario.password,
                    "permiso": usuario.permiso
                   }

    if error_found:
      return usuario_data, 500 # Internal Server Error
    else:
      return usuario_data, 201 # POST Success

    
  def get(self):
    # Process to get a list with all of the users  
    info_usuarios = []
    lista_usuarios = session.query(Usuario).all()
    
    for usuario in lista_usuarios:
      usuario_auxiliar = {
                          "nombre": usuario.nombre,
                          "password": usuario.password,
                          "permiso": usuario.permiso
                          }

      info_usuarios.append(usuario_auxiliar)

    return info_usuarios, 200