"""Serve the current build without retaining stale HTML or styles."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from functools import partial

class PreviewHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, max-age=0')
        super().end_headers()

    def do_GET(self):
        # Old conditional requests must not reuse a cached document.
        for header in ('If-Modified-Since', 'If-None-Match'):
            if header in self.headers:
                del self.headers[header]
        super().do_GET()

if __name__ == '__main__':
    directory = Path(__file__).resolve().parent.parent / 'dist'
    server = ThreadingHTTPServer(('127.0.0.1', 8000), partial(PreviewHandler, directory=str(directory)))
    print('Preview: http://localhost:8000 (caching disabled)', flush=True)
    server.serve_forever()
