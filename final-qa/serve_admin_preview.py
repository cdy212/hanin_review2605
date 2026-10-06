"""Serve unchanged admin sources with UTF-8; this is a static preview, not an API server."""
from functools import partial
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path


class Utf8Handler(SimpleHTTPRequestHandler):
    def guess_type(self, path):
        content_type = super().guess_type(path)
        if content_type.startswith("text/") or content_type in ("application/javascript", "application/json"):
            return content_type + "; charset=utf-8"
        return content_type


if __name__ == "__main__":
    static_root = Path(__file__).resolve().parents[2] / "koreaTaiwanApi/src/main/resources/static"
    if not static_root.is_dir():
        raise SystemExit("Admin static source directory is missing")
    print("Static preview only: http://localhost:8090/admin/index.html", flush=True)
    ThreadingHTTPServer(("127.0.0.1", 8090), partial(Utf8Handler, directory=str(static_root))).serve_forever()
