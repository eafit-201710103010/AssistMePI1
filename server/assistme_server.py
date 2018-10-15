"""Flask based server for the AssistMe proyect.

This server is based on the flask-restful library, used to model the server as a RESTApi
"""

# Import dependecies from flask and flask-restful 
from flask import Flask
from flask_restful import Resource, Api

# Import all the resources to be used in the server
from resources.register import Register
from resources.add_event import AddEvent

# Create the app and define it as a rest api.
app = Flask(__name__)
api = Api(app)

# add every resource to a specific url endpoint
api.add_resource(Register, "/register")
api.add_resource(AddEvent, "/add_event")

# Main --> run the server
if __name__ == '__main__':
  app.run(debug=True)