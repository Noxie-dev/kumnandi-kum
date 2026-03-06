import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { getDbHealth } from "../db";
import { getForgeHealth } from "./forge";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  app.get("/healthz", (_req, res) => {
    res.status(200).json({ ok: true });
  });

  app.get("/readyz", async (_req, res) => {
    const database = await getDbHealth();
    const forge = await getForgeHealth();
    const ok = database.ok && (forge.status === "up" || forge.status === "disabled");

    res.status(ok ? 200 : 503).json({
      ok,
      dependencies: {
        database: database.ok ? "up" : "down",
        forge: forge.status,
      },
      details: {
        database,
        forge,
      },
    });
  });

  app.get("/status/dependencies", async (_req, res) => {
    const database = await getDbHealth();
    const forge = await getForgeHealth();

    res.status(200).json({
      ok: database.ok && (forge.status === "up" || forge.status === "disabled"),
      dependencies: {
        database,
        forge,
      },
    });
  });
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const portFromEnv = process.env.PORT;
  const preferredPort = parseInt(portFromEnv || "3000");
  const port = portFromEnv ? preferredPort : await findAvailablePort(preferredPort);

  if (!portFromEnv && port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
