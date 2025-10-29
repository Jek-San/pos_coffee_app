// index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


// portfolio Section
const viewRoutes = require('./projects/portfolio/routes/viewRoutes')
const portfolioRoutes = require('./projects/portfolio/routes');

app.use('/api', portfolioRoutes);


// POS Coffe Section

// loging what route that has been asking 
app.use((req, res, next) => {
  console.log(req.url);
  next();
})
const posRoutes = require('./projects/pos_coffee_shop/routes');


app.use('/api/pos', posRoutes);




// Static files
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));


// Start
const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () =>
  console.log(`✅ Backend running on http://0.0.0.0:${PORT}`)
);

