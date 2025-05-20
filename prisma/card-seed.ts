import { db } from "../lib/prisma";

export async function main() {
  // داده‌های فیک
  const usersData = [
    {
      firstName: "Ali",
      lastName: "Ahmadi",
      phoneNumber: "09120000001",
      token: "token1",
      cardNumber: "1111-2222-3333-4444",
    },
    {
      firstName: "Sara",
      lastName: "Mohammadi",
      phoneNumber: "09120000002",
      token: "token2",
      cardNumber: "5555-6666-7777-8888",
    },
    // بقیه هم اضافه کن اگر خواستی
  ];
  // اول ببین در دیتابیس قبلاً هست داده‌ای با این شماره‌ها یا نه
  const existingUsers = await db?.user.findMany({
    where: {
      phoneNumber: {
        in: usersData.map((u) => u.phoneNumber),
      },
    },
  });

  if (existingUsers!.length > 0) {
    // اگر داده بود برگردونش
    console.log("✅ داده‌های موجود:");
    console.log(existingUsers);
    return existingUsers;
  }

  // اگر نبود، اضافه‌شون کن
  for (const user of usersData) {
    await db?.user.create({
      data: user,
    });
  }

  // بعد از ایجاد، داده‌ها رو برگردون
  const newUsers = await db?.user.findMany({
    where: {
      phoneNumber: {
        in: usersData.map((u) => u.phoneNumber),
      },
    },
  });

  if (newUsers?.length === 0) {
    throw new Error("❌ هیچ داده‌ای ایجاد نشد.");
  }

  console.log("✅ داده‌های جدید اضافه شدند:");
  console.log(newUsers);

  return newUsers;
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db?.$disconnect();
  });
