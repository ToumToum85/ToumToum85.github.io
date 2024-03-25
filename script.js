document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    const image = document.getElementById("image");
    const clearButton = document.getElementById("clearButton");

    // Redimensionner le canvas à la taille de l'image
    canvas.width = image.width;
    canvas.height = image.height;

    // Dessiner l'image sur le canvas
    context.drawImage(image, 0, 0);

    let isDrawing = false;

    function startPosition(e) {
        isDrawing = true;
        draw(e);
    }

    function endPosition() {
        isDrawing = false;
        context.beginPath();
        // Sauvegarder le dessin dans le stockage local
        localStorage.setItem("canvasImage", canvas.toDataURL());
    }

    function draw(e) {
        if (!isDrawing) return;
        context.lineWidth = 5;
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        context.stroke();
        context.beginPath();
        context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    }

    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", endPosition);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseout", endPosition);

    clearButton.addEventListener("click", function() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0);
        // Effacer le dessin sauvegardé dans le stockage local
        localStorage.removeItem("canvasImage");
    });

    // Charger le dessin sauvegardé depuis le stockage local lors du chargement de la page
    const savedImage = localStorage.getItem("canvasImage");
    if (savedImage) {
        const img = new Image();
        img.onload = function() {
            context.drawImage(img, 0, 0);
        };
        img.src = savedImage;
    }
});
