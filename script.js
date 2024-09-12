function generate() {
    const officeName = document.getElementById('officeName').value;

    // inputan harus terisi
    if (!officeName) {
        alert("Please enter an office name");
        return;
    }

    // Loading pop up
    document.getElementById('loadingPopup').style.display = 'flex';

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    //panjang dan lebar ukuran gambar
    canvas.width = 4500;
    canvas.height = 2030;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Load background image
    const img = new Image();
    img.src = './images/background.jpg'; // Background Image

    img.onload = function() {
        // Draw the background image on the canvas
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Pisahkan kata dari input
        const words = officeName.split(' ');
        let fontSize = '200pt';

        // Menyesuaikan ukuran font jika ada lebih dari 2 kata atau teks terlalu panjang
        if (words.length > 2 || officeName.length > 20) {
            fontSize = '150pt'; // Ukuran lebih kecil untuk lebih dari 2 kata
        }
        if (officeName.length > 30) {
            fontSize = '100pt'; // Ukuran lebih kecil lagi jika teks sangat panjang
        }

        // Set font and color for the text
        ctx.font = `${fontSize} Paytone One`;
        ctx.fillStyle = '#015963'; // Text color
        ctx.textAlign = 'left';

        // Mengatur posisi teks
        let yPosition = 1070; // Starting y position

        // Loop untuk menampilkan setiap kata
        words.forEach((word, index) => {
            ctx.fillText(word, 500, yPosition); 
            yPosition += 250; // Mengatur jarak baris antar kata
        });

        // Load gambar QR code
        const qrCode = new Image();
        qrCode.src = './images/QrCode2.jpeg';

        qrCode.onload = function() {
            // Gambar QR code di canvas
            ctx.drawImage(qrCode, canvas.width - 
                1675, //Posisi X
                555, //Posisi Y
                1100, // Panjang
                1100); // Lebar

            // Otomatis unduh gambar setelah generate
            downloadImage(canvas, officeName);

            // Loading popup menghilang ketika proses download
            document.getElementById('loadingPopup').style.display = 'none';
        };
    };
}

function downloadImage(canvas, officeName) {
    const link = document.createElement('a');
    
    // Mengatur penamaan file saat download
    link.download = `Hygienix-${officeName}.png`;
    link.href = canvas.toDataURL();
    link.click();
}

// Button hapus inputan
function clearInput() {
    document.getElementById('officeName').value = '';
}