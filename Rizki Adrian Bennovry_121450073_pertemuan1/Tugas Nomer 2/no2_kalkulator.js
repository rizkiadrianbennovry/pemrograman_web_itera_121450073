document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".btn");
    const hasilKalkulator = document.getElementById("hasil-kalkulator");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const angka1 = parseFloat(document.getElementById("angka1").value);
            const angka2 = parseFloat(document.getElementById("angka2").value);
            const operasi = this.getAttribute("data-op");

            if (isNaN(angka1)) {
                hasilKalkulator.innerHTML = "<p class='error'>Masukkan angka pertama!</p>";
                return;
            }

            let hasil;
            switch (operasi) {
                case "tambah":
                    hasil = angka1 + angka2;
                    break;
                case "kurang":
                    hasil = angka1 - angka2;
                    break;
                case "kali":
                    hasil = angka1 * angka2;
                    break;
                case "bagi":
                    hasil = angka2 === 0 ? "Error: Tidak bisa dibagi 0!" : angka1 / angka2;
                    break;
                case "pangkat":
                    hasil = Math.pow(angka1, angka2);
                    break;
                case "akar":
                    hasil = angka1 < 0 ? "Error: Tidak bisa akar negatif!" : Math.sqrt(angka1);
                    break;
                case "modulus":
                    hasil = angka1 % angka2;
                    break;
                default:
                    hasil = "Operasi tidak valid!";
            }

            hasilKalkulator.innerHTML = `<p>Hasil: <strong>${hasil}</strong></p>`;
        });
    });
});
