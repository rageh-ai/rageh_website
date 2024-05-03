window.onload = function() {
    fetch('/load-files')
        .then(response => response.json())
        .then(files => {
            const container = document.getElementById('file-container');
            files.forEach(file => {
                const section = document.createElement('section');
                section.innerHTML = `<h2>${file.name}</h2><pre>${file.content}</pre>`;
                container.appendChild(section);
            });
        })
        .catch(error => console.error('Error loading the files:', error));
};