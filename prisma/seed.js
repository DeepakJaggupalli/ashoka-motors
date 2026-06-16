const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  await prisma.vehicle.deleteMany()
  
  const vehicles = [
    {
      name: 'Yamaha R15M',
      type: 'Sports',
      price: 196200,
      imageUrl: 'https://ashokamotors.in/wp-content/uploads/2024/03/gallery_03-1024x576.webp',
      specs: '155 CC Engine, 13 L Fuel capacity, Double Disc Brakes, Liquid Cooled'
    },
    {
      name: 'Yamaha R15 V4',
      type: 'Sports',
      price: 187000,
      imageUrl: 'https://ashokamotors.in/wp-content/uploads/2024/03/gallery_03-1024x576.webp',
      specs: '155 CC Engine, 10 L Fuel capacity, Disc Brakes, Liquid Cooled'
    },
    {
      name: 'MotoGP Edition',
      type: 'Sports',
      price: 197700,
      imageUrl: 'https://ashokamotors.in/wp-content/uploads/2024/03/Untitled-design-1-1024x576.jpg',
      specs: '155 CC Engine, 5.5 L Fuel capacity, Disc Brakes'
    },
    {
      name: 'Yamaha R15S',
      type: 'Sports',
      price: 165200,
      imageUrl: 'https://ashokamotors.in/wp-content/uploads/2024/03/Untitled-design-32-1024x576.png',
      specs: '249 CC Engine, 14 L Fuel capacity, Double Disc Brakes'
    },
    {
      name: 'MT-15 V2',
      type: 'Naked',
      price: 167700,
      imageUrl: 'https://ashokamotors.in/wp-content/uploads/2024/03/gallery02-1024x576.webp',
      specs: '149 CC Engine, 13 L Fuel capacity, Double Disc Brakes'
    },
    {
      name: 'Yamaha FZ-X',
      type: 'Street',
      price: 137200,
      imageUrl: 'https://ashokamotors.in/wp-content/uploads/2024/03/gallery_chrome-1024x576.webp',
      specs: '149 CC Engine, 13 L Fuel capacity, Double Disc Brakes'
    }
  ]

  for (const v of vehicles) {
    await prisma.vehicle.create({
      data: v
    })
  }

  console.log('Database seeded successfully with Ashoka Motors real data!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
