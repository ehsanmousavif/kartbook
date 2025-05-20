import { db } from "./lib/prisma";
import { main } from "./prisma/card-seed";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    try {
      await db?.$connect();
      console.log(main(), "دیتا اضافه شد");
    } catch {
      console.log("");
    }
  }
}
