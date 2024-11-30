import http.server
import socketserver

PORT = 80
Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("0.0.0.0", PORT), Handler) as httpd:
    print(f"Serveur démarré sur le port {PORT}")
    print("Pour accéder depuis votre iPhone, utilisez : http://[votre_adresse_ip]")
    httpd.serve_forever()
