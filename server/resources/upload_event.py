"""All the logic for when uploading an event is located here."""

# Import dependencies from flask_restful, as well as the database models necessary and the session to connect to it
from flask_restful import Resource, reqparse
from sqlalchemy import and_
from resources.database.db_session import session, reconnect_to_db
from resources.database.models import Asistente

from sqlalchemy.exc import OperationalError

def hash_event(name):
  """ Hashes the name of an event to generate a usable event id of type in (BigInteger on the database) """
  name_length = len(name)
  name_hash = 0

  # Based on the java hashCode() function
  for i in range(name_length):
    name_hash += ord(name[i])*3**(name_length-1-i)
    
  name_hash = int(name_hash/(name_length*1000))

  return name_hash

# This class will manage everything related to the upload process
class UploadEvent(Resource):
  """ Class used to manage all the logic of the registration process """
  # when a post request arrives, parse the arguments, create that person's model and add it to the database
  # also returns a 201 HTTP status code indicating that the PUT request was succesfull
  # or a 500 HTTP status code indicating an internal server error if the PUT request was not successful
  def put(self, nombre_evento, doc_identidad):

    # Calculate the event id
    id_evento = hash_event(nombre_evento)
    # look up the specific person you are looking for
    try:
      persona = session.query(Asistente).filter( and_(Asistente.doc_identidad == doc_identidad, Asistente.id_evento == id_evento)).first()

    except OperationalError:
      session.rollback()
      reconnect_to_db()
      UploadEvent.put(self, nombre_evento, doc_identidad)

    # update the specified value
    persona.asistio = True

    # commit the changes
    session.commit()

    return '', 201 # PUT success
    