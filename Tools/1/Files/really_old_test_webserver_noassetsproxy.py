#!/usr/bin/env python3
import http.server
import socketserver
import urllib.parse
import json

PORT = 8000

# Headers required for Emscripten multithreading (COOP + COEP)
EM_HEADERS = {
    "Cross-Origin-Opener-Policy": "same-origin",
    "Cross-Origin-Embedder-Policy": "require-corp",
    # helpful for loading cross-origin resources; adjust as needed
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}

ADMINS = {
    232,
    71217160,
    3174711,
    1337617,
    170263,
    38542771,
    391038733,
    115,
    8243709,
    2723542,
    9009123,
}


class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        for k, v in EM_HEADERS.items():
            self.send_header(k, v)
        super().end_headers()

    def do_OPTIONS(self):
        # respond to preflight
        self.send_response(204)
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        qs = urllib.parse.parse_qs(parsed.query)

        # /userblock/getblockedusers -> return empty JSON object
        if "/userblock/getblockedusers" in path:
            body = "{}".encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return

        # /game/LuaWebService/HandleSocialRequest.ashx
        if "/game/LuaWebService/HandleSocialRequest.ashx" in path:
            # Set Content-Type as in original PHP: text/html; charset=utf-8
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            # disable caching to ease development
            self.send_header("Cache-Control", "no-store, no-cache, must-revalidate")
            # will fill body below
            # parse helper
            def g(name, default=""):
                v = qs.get(name)
                return v[0] if v else default

            method = g("method")
            body_text = ""

            if method == "IsBestFriendsWith":
                body_text = '<Value Type="boolean">false</Value>'
            elif method == "IsFriendsWith":
                body_text = '<Value Type="boolean">false</Value>'
            elif method == "IsInGroup":
                groupid = g("groupid")
                playerid = g("playerid")
                value = "false"
                if groupid == "1200769":
                    try:
                        if int(playerid) in ADMINS:
                            value = "true"
                    except Exception:
                        value = "false"
                body_text = f'<Value Type="boolean">{value}</Value>'
            elif method == "GetGroupRank":
                groupid = g("groupid")
                playerid = g("playerid")
                value = "false"
                if groupid == "1200769":
                    try:
                        if int(playerid) in ADMINS:
                            value = "true"
                    except Exception:
                        value = "false"
                body_text = f'<Value Type="boolean">{value}</Value>'
            else:
                # default: empty response (200)
                body_text = ""

            body = body_text.encode("utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            if body:
                self.wfile.write(body)
            return
        
        if "/Game/LuaWebService/HandleSocialRequest.ashx" in path:
            # Set Content-Type as in original PHP: text/html; charset=utf-8
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            # disable caching to ease development
            self.send_header("Cache-Control", "no-store, no-cache, must-revalidate")
            # will fill body below
            # parse helper
            def g(name, default=""):
                v = qs.get(name)
                return v[0] if v else default

            method = g("method")
            body_text = ""

            if method == "IsBestFriendsWith":
                body_text = '<Value Type="boolean">false</Value>'
            elif method == "IsFriendsWith":
                body_text = '<Value Type="boolean">false</Value>'
            elif method == "IsInGroup":
                groupid = g("groupid")
                playerid = g("playerid")
                value = "false"
                if groupid == "1200769":
                    try:
                        if int(playerid) in ADMINS:
                            value = "true"
                    except Exception:
                        value = "false"
                body_text = f'<Value Type="boolean">{value}</Value>'
            elif method == "GetGroupRank":
                groupid = g("groupid")
                playerid = g("playerid")
                value = "false"
                if groupid == "1200769":
                    try:
                        if int(playerid) in ADMINS:
                            value = "true"
                    except Exception:
                        value = "false"
                body_text = f'<Value Type="integer">255</Value>'
            else:
                # default: empty response (200)
                body_text = ""

            body = body_text.encode("utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            if body:
                self.wfile.write(body)
            return

        # fallback to static file serving from current directory
        return super().do_GET()


if __name__ == "__main__":
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Serving HTTP on 0.0.0.0 port {PORT} (http://0.0.0.0:{PORT}/) ...")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down")
            httpd.server_close()
