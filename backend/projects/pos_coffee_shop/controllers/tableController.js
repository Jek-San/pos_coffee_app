// controllers/tableController.js
const { pos: prisma } = require('../../../models/client');

exports.getTablesByMerchant = async (req, res) => {
  const id = req.query.id || req.params.id
  // console.log('Merchant ID:', id);

  if (!id) {
    return res.status(400).json({ message: 'Merchant ID is requiredddd' });
  }

  try {
    const tables = await prisma.table.findMany({
      where: { merchantId: id },
      orderBy: { name: 'asc' },
    });

    res.json(tables);
  } catch (error) {
    console.error('Error fetching tables:', error);
    res.status(500).json({ message: 'Failed to fetch tables' });
  }
};

exports.createTable = async (req, res) => {
  const { id } = req.params
  const { name } = req.body
  console.log('Merchant ID:', id);
  console.log('Table Name:', name);

  if (!name) return res.status(400).json({ message: 'Table name is required' })

  const newTable = await prisma.table.create({
    data: {
      name,
      merchantId: id,
    },
  })

  res.status(201).json(newTable)
}
// Add this inside tableController.js
exports.deleteTable = async (req, res) => {
  const { id, tableId } = req.params

  try {
    await prisma.table.delete({
      where: { id: tableId },
    })

    res.json({ success: true })
  } catch (error) {
    console.error("Error deleting table:", error)
    res.status(500).json({ message: "Failed to delete table" })
  }
}

exports.createMultipleTables = async (req, res) => {
  const { id } = req.params
  const tables = req.body // should be an array of { name }
  let filteredTables = []

  if (!Array.isArray(tables) || tables.length === 0) {
    return res.status(400).json({ message: "Tables array is required" })
  }

  const existingTables = await prisma.table.findMany({
    where: {
      merchantId: id,
    },
  })

  if (existingTables.length > 0) {
    filteredTables = tables.filter(
      (t) => !existingTables.some((et) => et.name === t.name)
    )
  } else {
    filteredTables = tables
  }

  try {
    const newTables = await prisma.table.createMany({
      data: filteredTables.map((t) => ({
        name: t.name,
        merchantId: id,
      })),
      skipDuplicates: true, // in case DB constraint is not enforced
    })

    res.status(201).json({ success: true, count: newTables.count })
  } catch (error) {
    console.error("Error creating multiple tables:", error)
    res.status(500).json({ message: "Failed to create multiple tables" })
  }
}

