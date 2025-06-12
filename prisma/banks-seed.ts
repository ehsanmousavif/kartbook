import { PrismaClient } from "@db";
const prisma = new PrismaClient();

const rawBanks = [
  {
    bin: "502938",
    logoUrl: "/logos/dey.png",
    color: "#00B3E3",
  },
  {
    bin: "627412",
    logoUrl: "/logos/eghtesad-novin.png",
    color: "#6E2594",
  },
  {
    bin: "505416",
    logoUrl: "/logos/gardeshgari.png",
    color: "#B40204",
  },
  {
    bin: "639599",
    logoUrl: "/logos/ghavamin.png",
    color: "#007A33",
  },
  {
    bin: "627488",
    logoUrl: "/logos/karafarin.png",
    color: "#157F62",
  },
  {
    bin: "585947",
    logoUrl: "/logos/khavar-mianeh.png",
    color: "#FBAF00",
  },
  {
    bin: "603770",
    logoUrl: "/logos/keshavarzi.png",
    color: "#205A23",
  },
  {
    bin: "628023",
    logoUrl: "/logos/maskan.png",
    color: "#FF6600",
  },
  {
    bin: "606256",
    logoUrl: "/logos/melall.png",
    color: "#C144A3",
  },
  {
    bin: "610433",
    logoUrl: "/logos/mellat.png",
    color: "#C70039",
  },
  {
    bin: "603799",
    logoUrl: "/logos/melli.png",
    color: "#D72638",
  },
  {
    bin: "507677",
    logoUrl: "/logos/noor.png",
    color: "#058ED9",
  },
  {
    bin: "622106",
    logoUrl: "/logos/parsian.png",
    color: "#000000",
  },
  {
    bin: "502229",
    logoUrl: "/logos/pasargad.png",
    color: "#F7B733",
  },
  {
    bin: "627760",
    logoUrl: "/logos/post.png",
    color: "#009658",
  },
  {
    bin: "589463",
    logoUrl: "/logos/refah.png",
    color: "#007BFF",
  },
  {
    bin: "603769",
    logoUrl: "/logos/saderat.png",
    color: "#2F2FA2",
  },
  {
    bin: "62198610",
    logoUrl: "/logos/saman.png",
    color: "#00AEEF",
  },
  {
    bin: "62198619",
    logoUrl: "/logos/blu.png",
    color: "#1900D5",
  },
  {
    bin: "627961",
    logoUrl: "/logos/sanat-madan.png",
    color: "#FFD700",
  },
  {
    bin: "639607",
    logoUrl: "/logos/sarmayeh.png",
    color: "#444444",
  },
  {
    bin: "589210",
    logoUrl: "/logos/sepah.png",
    color: "#FFBF00",
  },
  {
    bin: "504706",
    logoUrl: "/logos/shahr.png",
    color: "#F44336",
  },
  {
    bin: "639346",
    logoUrl: "/logos/sina.png",
    color: "#1565C0",
  },
  {
    bin: "627353",
    logoUrl: "/logos/tejarat.png",
    color: "#003399",
  },
];

export async function main() {
  await prisma.bank.createMany({
    data: rawBanks,
    skipDuplicates: false,
  } as Parameters<typeof prisma.bank.createMany>[0]);
}
