"""Module that contains encyption and decryption functionalities based on the AES cryptography algorithm

Taken from gustavohenrique Github's repository: https://gist.github.com/gustavohenrique/79cc95cc351d975a075f18a5c9f49319
and then modified.
"""

import base64
from Crypto.Cipher import AES

secret_key = 'XuoJmTxXql40gJOAY4doHPGJJKTsnpqr'

class AESCipher(object):
  """ Encryptor and Decryptor class based on the AES cryptography algoprithm.

  Parameters
  ----------
  key : str
    key used to encrypt and decrypt information

  """

  def __init__(self, key):
    self.bs = 16
    self.cipher = AES.new(key, AES.MODE_ECB)

  def encrypt(self, raw):
    """ Encrypt the intended string

    Parameters
    ----------
    raw : str
      String to be encrypted
          
    """
    raw = self._pad(raw)
    encrypted = self.cipher.encrypt(raw)
    encoded = base64.b64encode(encrypted)
    return str(encoded, 'utf-8')

  def decrypt(self, raw):
    """ Decrypt the intended string

    Parameters
    ----------
    raw : str
      String to be decrypted
          
    """
    decoded = base64.b64decode(raw)
    decrypted = self.cipher.decrypt(decoded)
    return str(self._unpad(decrypted), 'utf-8')

  def _pad(self, s):
    """ Private Method used to pad the string s """
    return s + (self.bs - len(s) % self.bs) * chr(self.bs - len(s) % self.bs)

  def _unpad(self, s):
    """ Private Method used to unpad the string s """
    return s[:-ord(s[len(s)-1:])]


# if __name__ == '__main__':
#     key = 'XuoJmTxXql40gJOAY4doHPGJJKTsnpqr'
#     cipher = AESCipher(key)

#     plaintext = '542#1504891440039'
#     encrypted = cipher.encrypt(plaintext)
#     print('Encrypted: %s' % encrypted)
#     ciphertext = '5bgJqIqFuT8ACuvT1dz2Bj5kx9ZAIkODHWRzuLlfYV0='

#     decrypted = cipher.decrypt(encrypted)
#     print('Decrypted: %s' % decrypted)