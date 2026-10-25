
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const catalog = [
  {
    category: {
      nameEn: 'AC & Appliances',
      nameBn: 'এসি ও যন্ত্রপাতি',
      icon: '❄️',
      sortOrder: 1,
    },
    nameEn: 'AC Servicing',
    nameBn: 'এসি সার্ভিসিং',
    description: 'AC cleaning, inspection and routine maintenance.',
    pricePaisa: 80000,
    pricingType: 'STARTING',
    durationMinutes: 90,
  },
  {
    category: {
      nameEn: 'Electrical',
      nameBn: 'ইলেকট্রিক্যাল',
      icon: '⚡',
      sortOrder: 2,
    },
    nameEn: 'Electrical Repair',
    nameBn: 'ইলেকট্রিক্যাল মেরামত',
    description: 'Switches, lights, wiring inspection and minor repairs.',
    pricePaisa: 50000,
    pricingType: 'STARTING',
    durationMinutes: 60,
  },
  {
    category: {
      nameEn: 'Plumbing',
      nameBn: 'প্লাম্বিং',
      icon: '🔧',
      sortOrder: 3,
    },
    nameEn: 'Plumbing Service',
    nameBn: 'প্লাম্বিং সার্ভিস',
    description: 'Tap, pipe, basin and water-line repair.',
    pricePaisa: 40000,
    pricingType: 'STARTING',
    durationMinutes: 60,
  },
  {
    category: {
      nameEn: 'Cleaning',
      nameBn: 'ক্লিনিং',
      icon: '🧹',
      sortOrder: 4,
    },
    nameEn: 'Home Cleaning',
    nameBn: 'বাসা পরিষ্কার',
    description: 'Reliable home cleaning for a fresh, comfortable space.',
    pricePaisa: 120000,
    pricingType: 'ESTIMATE',
    durationMinutes: 180,
  },
  {
    category: {
      nameEn: 'AC & Appliances',
      nameBn: 'এসি ও যন্ত্রপাতি',
      icon: '❄️',
      sortOrder: 1,
    },
    nameEn: 'Refrigerator Repair',
    nameBn: 'ফ্রিজ মেরামত',
    description: 'Inspection and troubleshooting for refrigerator issues.',
    pricePaisa: 60000,
    pricingType: 'INSPECTION',
    durationMinutes: 90,
  },
  {
    category: {
      nameEn: 'Home Repair',
      nameBn: 'হোম রিপেয়ার',
      icon: '🪚',
      sortOrder: 5,
    },
    nameEn: 'Carpentry',
    nameBn: 'কাঠমিস্ত্রির কাজ',
    description: 'Door, cabinet, furniture and household woodwork repairs.',
    pricePaisa: 50000,
    pricingType: 'STARTING',
    durationMinutes: 60,
  },
];

const areas = [
  'Panchlaish',
  'GEC',
  'Khulshi',
  'Agrabad',
  'Nasirabad',
];

async function main() {
  for (const item of catalog) {
    const category = await prisma.serviceCategory.upsert({
      where: { nameEn: item.category.nameEn },
      update: {
        nameBn: item.category.nameBn,
        icon: item.category.icon,
        sortOrder: item.category.sortOrder,
        active: true,
      },
      create: {
        ...item.category,
        active: true,
      },
    });

    const {
      category: ignoredCategory,
      ...serviceData
    } = item;

    const existing = await prisma.service.findFirst({
      where: {
        nameEn: item.nameEn,
        categoryId: category.id,
      },
    });

    const data = {
      ...serviceData,
      categoryId: category.id,
      active: true,
    };

    if (existing) {
      await prisma.service.update({
        where: { id: existing.id },
        data,
      });
    } else {
      await prisma.service.create({ data });
    }
  }

  for (const name of areas) {
    await prisma.serviceArea.upsert({
      where: { name },
      update: { active: true },
      create: { name, active: true },
    });
  }

  console.log('Seed completed: 6 services and 5 service areas.');
}

main()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
