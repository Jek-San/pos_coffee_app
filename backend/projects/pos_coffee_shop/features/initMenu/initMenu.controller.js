const { getInitMenuData, getInitMenuDataOwner } = require('./initMenu.service');

exports.getInitMenu = async (req, res) => {
  try {
    const { merchantSlug, tableId } = req.params;

    const result = await getInitMenuData(merchantSlug, tableId);

    res.json(result);
  } catch (error) {
    console.error('[initMenu.controller] Error:', error);
    res.status(500).json({ error: 'Failed to load init menu data' });
  }
};
exports.getInitMenuOwner = async (req, res) => {
  try {
    const { merchantSlug } = req.params;

    const result = await getInitMenuDataOwner(merchantSlug);

    res.json(result);
  } catch (error) {
    console.error('[initMenu.controller] Error:', error);
    res.status(500).json({ error: 'Failed to load init menu data' });
  }
};

exports.getInitMenuStall = async (req, res) => {
  try {
    const { stallId } = req.params;

    const result = await getInitDataMenuStall(stallId)

    res.json(result);
  } catch (error) {
    console.error('[initMenu.controller] Error:', error);
    res.status(500).json({ error: 'Failed to load init menu data' });
  }
}
