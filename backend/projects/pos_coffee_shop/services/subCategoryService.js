const { pos: prisma } = require('../../../models/client');

const subCategoryService = {
  async getAllByMerchant(merchantId) {
    return await prisma.subCategory.findMany({
      where: { merchantId },
      orderBy: { name: 'asc' },
    });
  },

  async getByMerchantAndCategory(merchantId, category) {
    return await prisma.subCategory.findMany({
      where: { merchantId, category },
      orderBy: { name: 'asc' },
    });
  },

  async create({ name, category, merchantId }) {
    // Check for duplicate
    const exists = await prisma.subCategory.findFirst({
      where: { name, category, merchantId },
    });

    if (exists) {
      throw new Error('Subcategory already exists');
    }

    return await prisma.subCategory.create({
      data: { name, category, merchantId },
    });
  },

  async update(id, { name }) {
    return await prisma.subCategory.update({
      where: { id },
      data: { name },
    });
  },

  async remove(id) {
    return await prisma.subCategory.delete({
      where: { id },
    });
  },
};

module.exports = subCategoryService;
