import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { handleSquareCheckout } from "../server/square-checkout-handler.ts";

const port = Number(process.env.SQUARE_SANDBOX_PORT || 8787);
const host = "127.0.0.1";

function isLocalOrigin(origin: string) {
  try {
    const url = new URL(origin);
    return url.hostname === "localhost" || url.hostname === "127.0.0.1";
  } catch {
    return false;
  }
}

function writeCors(req: IncomingMessage, res: ServerResponse) {
  const origin = req.headers.origin;
  if (typeof origin === "string" && isLocalOrigin(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  }
}

async function readBody(req: IncomingMessage) {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}

const server = createServer(async (req, res) => {
  writeCors(req, res);
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }
  if (req.url !== "/checkout" || req.method !== "POST") {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not found." }));
    return;
  }

  const body = await readBody(req);
  const request = new Request(`http://${host}:${port}/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });
  const response = await handleSquareCheckout(request);
  const text = await response.text();
  res.writeHead(response.status, { "Content-Type": "application/json" });
  res.end(text);
});

server.listen(port, host, () => {
  process.stdout.write(`Square sandbox checkout listening on http://${host}:${port}/checkout\n`);
});
