document.getElementById("form-validasi").addEventListener("submit", function(event) {
    event.preventDefault();

    // Ambil input
    const nama = document.getElementById("nama").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Ambil elemen error message
    const errorNama = document.getElementById("error-nama");
    const errorEmail = document.getElementById("error-email");
    const errorPassword = document.getElementById("error-password");
    const successMessage = document.getElementById("success-message");

    // Reset pesan error
    errorNama.innerText = "";
    errorEmail.innerText = "";
    errorPassword.innerText = "";
    successMessage.innerText = "";

    let valid = true;

    // Validasi Nama
    if (nama.length < 3) {
        errorNama.innerText = "Nama harus lebih dari 3 karakter!";
        valid = false;
    }

    // Validasi Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorEmail.innerText = "Email tidak valid!";
        valid = false;
    }

    // Validasi Password
    if (password.length < 8) {
        errorPassword.innerText = "Password harus minimal 8 karakter!";
        valid = false;
    }

    // Jika valid, tampilkan pesan sukses
    if (valid) {
        successMessage.innerText = "Pendaftaran berhasil!";
    }
});