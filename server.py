import qrcode
import socket
import http.server
import socketserver
import os

# Get local IP
hostname = socket.gethostname()
local_ip = socket.gethostbyname(hostname)
port = 8001

# Create URL for tracking.html (mobile camera page)
url = f"http://{local_ip}:{port}/tracking.html"


# Generate QR code
qr = qrcode.make(url)
qr.save("connect_qr.png")
print(f"[INFO] QR saved as connect_qr.png for {url}")

# Serve website
os.chdir('.')  # Make sure your HTML and QR image are in the same directory
handler = http.server.SimpleHTTPRequestHandler
with socketserver.TCPServer(("", port), handler) as httpd:
    print(f"[INFO] Server running at http://{local_ip}:{port}")
    httpd.serve_forever()
