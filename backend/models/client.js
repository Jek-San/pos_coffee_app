const { PrismaClient: PortfolioClient } = require('../generated/portfolioClient')
const { PrismaClient: PosClient } = require('../generated/posClient')

const portfolio = new PortfolioClient()
const pos = new PosClient()

module.exports = {
  portfolio,
  pos,
}
