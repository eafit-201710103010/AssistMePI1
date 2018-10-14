"""All the different models used for the tables of the database.

Each table is represented by a class, with every attribute beign a column of it's assosiated table.
"""

from sqlalchemy import Column, Integer, String, Numeric
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

# Create a base. this is necessary since every model class has to inherit from it
Base = declarative_base()


class Asistente(Base):
  """ Referencia a tabla 'Asistentes'.
      PK: doc_identidad
      FK: id:evento 
  """
  __tablename__ = 'Asistentes'

  doc_identidad = Column(String(10), primary_key=True)
  serial = Column(String(20))
  nombre = Column(String(20))
  codigo = Column(String(20))
  ocupacion = Column(String(20))
  edad = Column(Integer)
  sexo = Column(String(6)) # hombre o mujer
  
  id_evento = Column(Integer, ForeignKey('Eventos.id_evento'), primary_key=True)

  def __repr__(self):
    return """Asistente(doc_identidad={0},
           serial={1},
           nombre={2},
           codigo={3},
           ocupacion={4},
           edad={5},
           sexo={6},
           id_evento={7}
           )""".format(self.doc_identidad, self.serial, self.nombre, self.codigo, self.ocupacion, self.edad, self.sexo, self.id_evento)


class Evento(Base):
  """ Referencia a tabla 'Evento'.
      PK: id_evento
      Tiene relacion con 'Asistentes'.
  """
  __tablename__ = 'Eventos'

  id_evento = Column(Integer, primary_key=True)
  nombre = Column(String(100))

  personas = relationship('Asistente', backref='Evento')
