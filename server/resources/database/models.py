"""All the different models used for the tables of the database.

Each table is represented by a class, with every attribute beign a column of it's assosiated table.
"""

from sqlalchemy import Column, Integer, String, BigInteger
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
    return """
           Asistente(doc_identidad={0},
                     serial={1},
                     nombre={2},
                     codigo={3},
                     ocupacion={4},
                     edad={5},
                     sexo={6},
                     id_evento={7}
                     )
            """.format(self.doc_identidad, self.serial, self.nombre, self.codigo, self.ocupacion, self.edad, self.sexo, self.id_evento)


class Evento(Base):
  """ Referencia a tabla 'Evento'.
      PK: id_evento
      Tiene relacion con 'Asistentes'.
  """
  __tablename__ = 'Eventos'

  id_evento = Column(BigInteger, primary_key=True)
  nombre = Column(String(100))
  lugar = Column(String(100))
  fecha = Column(String(10)) # TODO: cambiar a tipo de dato date luego

  personas = relationship('Asistente', backref='Evento')

  def __repr__(self):
      return """
             Evento(id_evento={0},
                    nombre={1},
                    lugar={2},
                    fecha={3}
                    )
             """.format(self.id_evento, self.nombre, self.lugar, self.fecha)


class Usuario(Base):
  """ Referencia a tabla 'Usuarios'.
      PK: nombre 
  """
  __tablename__ = 'Usuarios'

  nombre = Column(String(20), primary_key=True)
  password = Column(String(100))
  permiso = Column(String(20)) #Permission for Users
  
  def __repr__(self):
    return """
            Usuario(nombre={0},
                    password={1},
                    permiso={2}
                    )
            """.format(self.nombre, self.constraseña, self.permiso)
