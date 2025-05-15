import { db } from "./lib/prisma";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    try {
      await db?.$connect();
    } catch {
      console.log("");
    }
  }
}
