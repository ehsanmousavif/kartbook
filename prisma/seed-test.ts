import { PrismaClient, User } from "@prisma/client"; // User تایپ را هم ایمپورت می‌کنیم

// یک نمونه از PrismaClient ایجاد می‌کنیم
const prisma = new PrismaClient();

// داده‌های نمونه برای کاربران مطابق با مدل User شما
// مهم: phoneNumber باید یکتا باشد. email و cardNumber هم اگر مقداردهی شوند، باید یکتا باشند.
const usersToSeed: Omit<
  User,
  "id" | "createdAt" | "updatedAt" | "otpId" | "wallet" | "seller" | "otp"
>[] = [
  // Omit برای این است که id و فیلدهای اتوماتیک یا رابطه‌ای را در داده‌های اولیه نخواهیم
  {
    firstName: "علی",
    lastName: "محمدی",
    phoneNumber: "09121111111", // یکتا
    email: "ali.m@example.com", // اختیاری و یکتا
    isAdmin: true,
    token: "admin-token-xyz",
    cardNumber: "6037991000000001", // اختیاری و یکتا
  },
  {
    firstName: "سارا",
    lastName: "رضایی",
    phoneNumber: "09122222222", // یکتا
    email: "sara.r@example.com", // اختیاری و یکتا
    isAdmin: false,
    token: null,
    cardNumber: "6037991000000002", // اختیاری و یکتا
  },
  {
    firstName: "رضا",
    lastName: "احمدی",
    phoneNumber: "09123333333", // یکتا
    email: null, // ایمیل ندارد
    isAdmin: false,
    token: "user-token-abc",
    cardNumber: null, // شماره کارت ندارد
  },
  {
    firstName: "مریم",
    lastName: "صادقی",
    phoneNumber: "09124444444", // یکتا
    email: "maryam.s@example.com", // اختیاری و یکتا
    isAdmin: false,
    token: null,
    cardNumber: null,
  },
  {
    firstName: "کیان",
    lastName: "مرادی",
    phoneNumber: "09125555555", // یکتا
    email: "kian.moradi@example.com", // اختیاری و یکتا
    isAdmin: false,
    token: "kian-token-123",
    cardNumber: "6037991000000003", // اختیاری و یکتا
  },
];

export async function main() {
  console.log(`Start seeding users based on current schema...`);

  // ۱. خواندن تمام شماره تلفن‌های موجود در جدول User
  // phoneNumber یک فیلد الزامی و یکتا در مدل User شماست، پس برای بررسی مناسب است.
  const existingUsersPhoneNumbers = await prisma.user.findMany({
    select: {
      phoneNumber: true, // فقط فیلد شماره تلفن را انتخاب می‌کنیم
    },
  });

  // تبدیل لیست کاربران موجود به یک Set از شماره تلفن‌ها برای جستجوی سریع‌تر
  const existingPhones = new Set(
    existingUsersPhoneNumbers.map((user) => user.phoneNumber)
  );

  console.log("شماره تلفن‌های موجود در دیتابیس:", Array.from(existingPhones));

  // ۲. فیلتر کردن کاربرانی که شماره تلفنشان هنوز در دیتابیس وجود ندارد
  const newUsersToCreate = usersToSeed.filter(
    (seedUser) => !existingPhones.has(seedUser.phoneNumber)
  );

  if (newUsersToCreate.length > 0) {
    console.log(
      `کاربران جدید برای ایجاد (بر اساس phoneNumber):`,
      newUsersToCreate.map(
        (u) => `${u.firstName} ${u.lastName} (${u.phoneNumber})`
      )
    );

    // ۳. ایجاد کاربران جدید با createMany
    try {
      // داده‌ها را برای createMany آماده می‌کنیم.
      // createdAt و updatedAt توسط Prisma به طور خودکار مدیریت می‌شوند.
      // فیلدهای رابطه‌ای مانند otpId فعلاً null در نظر گرفته می‌شوند یا اصلاً ارسال نمی‌شوند.
      const dataForCreateMany = newUsersToCreate.map((user) => ({
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        email: user.email,
        isAdmin: user.isAdmin || false, // اطمینان از وجود مقدار پیش‌فرض اگر در داده نمونه نباشد
        token: user.token,
        cardNumber: user.cardNumber,
        // otpId: null, // در صورت نیاز
      }));

      const createdResult = await prisma.user.createMany({
        data: dataForCreateMany,
        // skipDuplicates: true, // بسیار مهم برای جلوگیری از خطا در صورت وجود هرگونه constraint یکتا (phoneNumber, email, cardNumber)
      });

      console.log(
        `تعداد ${createdResult.count} کاربر جدید با موفقیت ایجاد شد.`
      );
    } catch (error) {
      console.error("خطا در ایجاد کاربران با createMany:", error);
    }
  } else {
    console.log(
      "هیچ کاربر جدیدی برای ایجاد وجود ندارد. تمام کاربران نمونه (بر اساس phoneNumber) از قبل موجود هستند."
    );
  }

  console.log(`User seeding finished.`);
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
