const { pos: prisma } = require('../../../../models/client');


exports.getInitMenuData = async (merchantSlug, tableId) => {
  const [merchant, menus, table] = await Promise.all([
    prisma.merchant.findUnique({ where: { slug: merchantSlug } }),
    prisma.menuItem.findMany({
      where: {
        merchant: {
          slug: merchantSlug,
        },
      },
      include: {
        images: true,
        subCategory: true,
        menuVariants: {
          where: {
            deletedAt: null
          },
          include: {
            variantType: true,
          },
        }
      },
    }),
    prisma.table.findUnique({ where: { id: tableId } }),
  ]);

  return {
    merchant: {
      id: merchant.id,
      name: merchant.name,
    },
    table: {
      id: table.id,
      name: table.name,
    },
    menus,
  };
};
exports.getInitMenuDataOwner = async (merchantSlug) => {
  const [merchant, menus, table] = await Promise.all([
    prisma.merchant.findUnique({ where: { slug: merchantSlug } }),
    prisma.menuItem.findMany({
      where: {
        merchant: {
          slug: merchantSlug,

        },
        deletedAt: null
      },
      include: {
        images: true,
        subCategory: true,
        menuVariants: {
          where: {
            deletedAt: null,
            // Ensure variant type is also active
            variantType: {
              deletedAt: null
            }
          },
          include: {
            variantType: true,
          },
        }
      },
    }),

  ]);

  return {
    merchant: {
      id: merchant.id,
      name: merchant.name,
    },
    menus,
  };
};

exports.getInitDataMenuStall = async (stallId) => {
  const [merchant, menus, table] = await Promise.all([
    prisma.merchant.findUnique({ where: { slug: merchantSlug } }),
    prisma.menuItem.findMany({
      where: {
        merchant: {
          slug: merchantSlug,
        },
      },
      include: {
        images: true,
        subCategory: true,
        menuVariants: {
          where: {
            deletedAt: null
          },
          include: {
            variantType: true,
          },
        }
      },
    }),
    prisma.table.findUnique({ where: { id: tableId } }),
  ]);

  return {
    merchant: {
      id: merchant.id,
      name: merchant.name,
    },
    table: {
      id: table.id,
      name: table.name,
    },
    menus,
  };
}