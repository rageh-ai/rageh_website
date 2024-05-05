
window.onload = function() {
    fetch('/load-files')
        .then(response => response.json())
        .then(files => {
            const container = document.getElementById('articles');
            files.forEach(file => {
                const section = document.createElement('section');
                section.classList.add("sub_articles")
                let htmlContent = file.content;
                section.innerHTML = `<h3><a href=files/${file.name}>${file.name}</a></h3>`;
                const description = document.createElement("div");
                description.classList.add("context");
                description.innerHTML = `<p> quick desc </p>`
                section.appendChild(description);
                container.appendChild(section);
            });
        })
        .catch(error => console.error('Error loading the files:', error));
};