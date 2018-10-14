"""The connection to the database is established here through sqlalchemy's engine and sessionmaker."""

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Specify the database you whish to connect to HERE
# format: 'mysql://<user>:<password@<database-location>/<databse-name>'
engine = create_engine('mysql://root:@localhost/assistMe_test')
Session = sessionmaker(bind=engine)
session = Session()