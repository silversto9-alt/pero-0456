import { readFile, stat } from "node:fs/promises";
import { extname, join } from "node:path";
import { serve } from "@hono/node-server";
import app from "./api";

const port = Number(process.env.PORT ?? 3000);
const distDir = join(import.meta.dirname, "..", "dist");
const indexPath = join(distDir, "index.html");

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".mjs": "text/javascript",
  ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png",
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".avif": "image/avif",
  ".gif": "image/gif", ".ico": "image/x-icon", ".woff": "font/woff", ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8", ".xml": "application/xml", ".mp4": "video/mp4", ".webm": "video/webm",
};

async function fileResponse(path: string): Promise<Response | null> {
  try {
    if (!(await stat(path)).isFile()) return null;
    const body = await readFile(path);
    return new Response(body, {
      headers: { "Content-Type": MIME[extname(path).toLowerCase()] ?? "application/octet-stream" },
    });
  } catch {
    return null;
  }
}

function getStaticFilePath(pathname: string) {
  const cleanPath = decodeURIComponent(pathname).replace(/^\/+/, "").replaceAll("..", "");
  return cleanPath ? join(distDir, cleanPath) : indexPath;
}

serve(
  {
    port,
    async fetch(request: Request) {
      const url = new URL(request.url);
      if (url.pathname.startsWith("/api")) return app.fetch(request);

      const file = await fileResponse(getStaticFilePath(url.pathname));
      if (file) return file;

      const index = await fileResponse(indexPath);
      if (index) return index;

      return new Response("Build output not found. Run `npm run build` first.", {
        status: 500,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    },
  },
  (info) => console.log(`Web server listening on http://localhost:${info.port}`),
);
