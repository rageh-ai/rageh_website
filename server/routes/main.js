const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { marked } = require('marked');


const BLOG_POSTS_DIR = path.join(__dirname, '../../views/articles');

// Function to read files and generate post data
function getArticles() {
    return new Promise((resolve, reject) => {
        fs.readdir(BLOG_POSTS_DIR, (err, files) => {
            if (err) return reject(err);

            // Filter for text or markdown files
            const articleFiles = files.filter(file => file.endsWith('.md') || file.endsWith('.txt'));

            const articles = articleFiles.map(file => {
                // Extract the title and date from the filename (assuming format `title-date.md`)
                const fileName = path.basename(file, path.extname(file));
                const [title, date] = fileName.split('-');

                // Assuming description is in the file (you can change this according to your file structure)
                const filePath = path.join(BLOG_POSTS_DIR, file);
                const description = fs.readFileSync(filePath, 'utf-8').substring(0, 300); // First 100 chars as description

                return {
                    url: `/articles/${fileName}`,
                    title: title.replace(/_/g, ' '), // replace underscores with spaces in title
                    date: date,
                    description: description
                };
            });

            resolve(articles);
        });
    });
}





router.get('/articles/:post', (req, res) => {
    const filePath = path.join(BLOG_POSTS_DIR, `${req.params.post}.md`);
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(404).send('Post not found');
            return;
        }
        const htmlContent = marked(data);
        const fullContent = `<h1>${req.params.post}</h1>${htmlContent}`;

        res.render('layouts/main', {
            title: req.params.post,
            body: fullContent
        });
    });
});


//Routes
router.get('', async (req, res) =>{
    const posts = await getArticles()
    res.render("index", {posts: posts});
});

router.get('/about', (req, res) =>{
    res.render("about");
});

router.get('/contact', (req, res) =>{
    res.render('contact');
});

module.exports = router;