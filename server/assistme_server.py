"""Flask based server for the AssistMe proyect.

This server is based on the flask-restful library, used to model the server as a RESTApi.

In this file you will find the main that makes the server run.
It also works as an index where you can find all of the resources and endpoints of the server.
"""

# Import dependecies from flask and flask-restful 
from flask import Flask
from flask_restful import Resource, Api

# Import all the resources to be used in the server
from resources.register import Register
from resources.add_event import AddEvent
from resources.download_event import DownloadEvent
from resources.manage_users import ManageUsers
from resources.remove_event import RemoveEvent
from resources.user_log_in import LogIn
from resources.upload_event import UploadEvent
from resources.download_stats import DownloadStats

# Create the app and define it as a rest api.
app = Flask(__name__)
api = Api(app)

# add every resource to a specific url endpoint
# every endpoint not specifying a variable expects a Json object
# in front of every resource you can find all of the arguments that it takes, as well as the HTTP method that it can take
api.add_resource(LogIn, "/log_in") # nombre, password    HTTP --> GET
api.add_resource(Register, "/register") # serial, nombre, codigo, doc_identidad, ocupacion, edad, sexo, nombre_evento  HTTP --> POST
api.add_resource(AddEvent, "/add_event") # nombre, lugar, fecha  HTTP --> POST
api.add_resource(ManageUsers, "/manage_users") # nombre, password, permiso  HTTP --> GET, POST, DELETE
api.add_resource(RemoveEvent, "/remove_event") # nombre  HTTP --> DELETE
api.add_resource(UploadEvent, "/upload_event/<string:doc_identidad>") # HTTP --> POST
api.add_resource(DownloadEvent, "/download_event/<string:nombre_evento>") # HTTP --> GET
api.add_resource(DownloadStats, "/download_stats/<string:nombre_evento>") # HTTP --> GET


# Main --> run the server
if __name__ == '__main__':
  app.run(debug=True)