const express = require('express');
const fs = require('fs');
const path = require('path');

const port = 3000;
const app = express()

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Endpoint to load files and send to client
app.get('/load-files', (req, res) => {
    const directoryPath = path.join(__dirname, 'public/files'); // Adjust 'files' to your subdirectory
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            return res.status(500).send({
                message: "Unable to scan files!",
                error: err
            });
        }
        let fileContents = [];
        files.forEach(function (file) {
            const filePath = path.join(directoryPath, file);
            const content = fs.readFileSync(filePath, 'utf8');
            fileContents.push({
                name: file,
                content: content
            });
        });
        res.send(fileContents);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
