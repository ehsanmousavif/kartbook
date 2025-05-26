import { PrismaClient } from "@prisma/client";

// یک نمونه از PrismaClient ایجاد می‌کنیم
const prisma = new PrismaClient();

export async function main() {
  console.log(`Start seeding ...`);

  // داده‌های نمونه برای کاربران که می‌خواهیم در دیتابیس وجود داشته باشند
  const usersToSeed = [
    {
      email: "alice@example.com",
      name: "Alice Wonderland",
    },
    {
      email: "bob@example.com",
      name: "Bob The Builder",
    },
    {
      email: "sara@example.com",
      name: "Sara Conner",
    },
    {
      email: "john.doe@example.com",
      name: "John Doe",
    },
    {
      email: "mike@example.com",
      name: "Mike Newcomer",
    },
    {
      email: "lisa@example.com", // یک کاربر جدید دیگر
      name: "Lisa Code",
    },
  ];

  // ۱. خواندن تمام ایمیل‌های موجود در جدول User
  const existingUsers = await prisma.user.findMany({
    select: {
      email: true, // فقط فیلد ایمیل را انتخاب می‌کنیم
    },
  });

  // تبدیل لیست کاربران موجود به یک Set از ایمیل‌ها برای جستجوی سریع‌تر
  const existingEmails = new Set(existingUsers.map((user) => user.email));
  console.log("ایمیل‌های موجود در دیتابیس:", Array.from(existingEmails));

  // ۲. فیلتر کردن کاربرانی که ایمیلشان هنوز در دیتابیس وجود ندارد
  const newUsersToCreate = usersToSeed.filter(
    (seedUser) => !existingEmails.has(seedUser.email)
  );

  if (newUsersToCreate.length > 0) {
    console.log(
      `کاربران جدید برای ایجاد:`,
      newUsersToCreate.map((u) => u.email)
    );
    // ۳. ایجاد کاربران جدید با createMany
    // skipDuplicates: true باعث می‌شود اگر به هر دلیلی (مثلاً اجرای همزمان)
    // رکوردی با ایمیل تکراری در این بچ ایجاد شود، خطا ندهد و از آن رد شود.
    // (با توجه به فیلترینگ بالا، این اتفاق نباید بیفتد مگر در شرایط خاص)
    try {
      const createdResult = await prisma.user.createMany({
        data: newUsersToCreate,
        skipDuplicates: true, // مهم برای جلوگیری از خطا در صورت وجود ایمیل (هرچند فیلتر کردیم)
      });
      console.log(
        `تعداد ${createdResult.count} کاربر جدید با موفقیت ایجاد شد.`
      );
    } catch (error) {
      console.error("خطا در ایجاد کاربران با createMany:", error);
    }
  } else {
    console.log(
      "هیچ کاربر جدیدی برای ایجاد وجود ندارد. تمام کاربران نمونه از قبل موجود هستند."
    );
  }

  // اگر می‌خواهید کاربرانی که در usersToSeed هستند ولی نامشان با دیتابیس فرق دارد را آپدیت کنید،
  // باید یک منطق جداگانه برای آپدیت پیاده‌سازی کنید (مثلاً با یک حلقه و prisma.user.update).
  // این اسکریپت فعلی فقط کاربران *جدید* را اضافه می‌کند.

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // اتصال به دیتابیس را می‌بندیم
    await prisma.$disconnect();
  });
