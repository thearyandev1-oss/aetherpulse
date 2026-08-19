import http.server
import socketserver
import os

PORT = 30952
web_dir = os.path.join(os.path.dirname(__file__), 'dist')
os.chdir(web_dir)

Handler = http.server.SimpleHTTPRequestHandler
httpd = socketserver.TCPServer(("0.0.0.0", PORT), Handler)

print(f"➜  Local:   http://localhost:{PORT}/", flush=True)
httpd.serve_forever()
