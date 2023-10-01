const express = require('express');
const multer = require('multer');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3001;

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  },
});
const upload = multer({ storage });

// Serve HTML form for adding new products
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle form submission and save data to JSON file
app.post('/api/add-product', upload.single('image'), (req, res) => {
  const { name, description, price, stock } = req.body;
  const imageFilename = req.file ? req.file.filename : null;

  // Read existing products from JSON file (if it exists)
  let products = [];
  try {
    const data = fs.readFileSync('products.json', 'utf8');
    products = JSON.parse(data);
  } catch (error) {
    console.log('No existing data found.');
  }

  // Add the new product to the array
  const newProduct = {
    name,
    description,
    price: parseFloat(price),
    stock: parseInt(stock),
    image: imageFilename,
  };
  products.push(newProduct);

  // Save the updated data back to the JSON file
  fs.writeFileSync('products.json', JSON.stringify(products, null, 2));

  res.send('Product added successfully!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
