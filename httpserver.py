#!/usr/bin/env python
import time
from subprocess import Popen, DEVNULL
from http.server import BaseHTTPRequestHandler, HTTPServer
 
seen = {}

class http(BaseHTTPRequestHandler):
  def do_GET(self):
        self.send_response(201)
        url = self.path[2:]
        last_seen = seen.get(url, 0)
        now = time.time()
        if now - last_seen < 5:
            print("Seen less than 5 seconds ago.. debouncing")
            return
        seen[url] = now
        p = Popen(['mpv', url], stdin=DEVNULL) #, stdout=DEVNULL, stderr=DEVNULL)
        return
 
def run():
  print('starting server...')
  server_address = ('127.0.0.1', 12345)
  httpd = HTTPServer(server_address, http)
  httpd.serve_forever()
 
run()
