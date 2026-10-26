"""Vérifie que chaque serveur MCP (un conteneur par service) répond à `initialize`.

Usage : python scripts/check_mcp.py [service ...]
"""
import json
import queue
import subprocess
import sys
import threading

COMPOSE = ["docker", "compose", "-f", "docker-compose.mcp.yml"]
SERVICES = ["mcp-memory", "mcp-context7", "mcp-postgres", "mcp-playwright"]
TIMEOUT_S = 300  # premier lancement : build ou téléchargement d'image

INIT = {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "initialize",
    "params": {
        "protocolVersion": "2024-11-05",
        "capabilities": {},
        "clientInfo": {"name": "check-mcp", "version": "1.0"},
    },
}


def check(service: str) -> bool:
    proc = subprocess.Popen(
        COMPOSE + ["run", "--rm", "-T", service],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.DEVNULL,
        text=True,
    )
    lines: "queue.Queue[str]" = queue.Queue()
    threading.Thread(
        target=lambda: [lines.put(line) for line in proc.stdout], daemon=True
    ).start()
    try:
        proc.stdin.write(json.dumps(INIT) + "\n")
        proc.stdin.flush()
        while True:
            line = lines.get(timeout=TIMEOUT_S)
            try:
                msg = json.loads(line)
            except ValueError:
                continue
            if msg.get("id") == 1:
                info = msg.get("result", {}).get("serverInfo")
                print(f"OK    {service}: {info}" if info else f"ECHEC {service}: {msg}")
                return bool(info)
    except queue.Empty:
        print(f"ECHEC {service}: délai dépassé")
        return False
    finally:
        proc.terminate()


if __name__ == "__main__":
    targets = sys.argv[1:] or SERVICES
    results = [check(s) for s in targets]
    sys.exit(0 if all(results) else 1)
