"""All the logic for when uploading an event is located here."""

# Import dependencies from flask_restful, as well as the database models necessary and the session to connect to it
from flask_restful import Resource, reqparse
from resources.database.db_session import session
from resources.database.models import Asistente

# This class will manage everything related to the upload process
class UploadEvent(Resource):
  """ Class used to manage all the logic of the registration process """
  # when a post request arrives, parse the arguments, create that person's model and add it to the database
  # also returns a 201 HTTP status code indicating that the PUT request was succesfull
  # or a 500 HTTP status code indicating an internal server error if the PUT request was not successful
  def put(self, doc_identidad):

    # look up the specific person you are looking for
    persona = session.query(Asistente).filter(Asistente.doc_identidad == doc_identidad).first()

    # update the specified value
    persona.asistio = True

    # commit the changes
    session.commit()

    return '', 201 # PUT success
    