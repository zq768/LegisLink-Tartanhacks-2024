const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

const CSV_FILE_PATH = './public/data.csv'
//path.join(__dirname, 'public', 'data.csv');

app.post('/add-coordinate', (req, res) => {
  const { data } = req.body;

  if (data) {
    // Append data to the CSV file
    const stream = fs.createWriteStream(CSV_FILE_PATH, { flags: 'a' });
    stream.write(data + '\n');
    stream.end();

    stream.on('finish', () => {
      console.log('Coordinates added to CSV:', data);
      res.json({ success: true });
    });

    stream.on('error', (err) => {
      console.error('Error appending coordinates to CSV:', err);
      res.status(500).json({ error: 'Failed to append coordinates to CSV' });
    });
  } else {
    res.status(400).json({ error: 'Invalid data' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
