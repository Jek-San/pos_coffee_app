const subCategoryService = require('../services/subCategoryService');

const subCategoryController = {
  async getAllByMerchant(req, res) {
    const { merchantId } = req.params;
    const data = await subCategoryService.getAllByMerchant(merchantId);
    res.json(data);
  },

  async getByMerchantAndCategory(req, res) {
    const { merchantId, category } = req.params;
    const data = await subCategoryService.getByMerchantAndCategory(merchantId, category);
    res.json(data);
  },

  async create(req, res) {
    try {
      const sub = await subCategoryService.create(req.body);
      res.status(201).json(sub);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const updated = await subCategoryService.update(req.params.id, req.body);
      res.json(updated);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async remove(req, res) {
    try {
      await subCategoryService.remove(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = subCategoryController;
