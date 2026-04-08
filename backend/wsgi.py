# wsgi.py — Entry point untuk PythonAnywhere WSGI
# Di PythonAnywhere, arahkan file WSGI kamu ke file ini.
# Pastikan path sesuai dengan lokasi project kamu di server.

import sys
import os

# Ganti path ini sesuai lokasi project kamu di PythonAnywhere
# Contoh: /home/namauser/myporto/backend
project_home = os.path.dirname(os.path.abspath(__file__))
if project_home not in sys.path:
    sys.path.insert(0, project_home)

from app import app as application  # noqa: E402, F401
