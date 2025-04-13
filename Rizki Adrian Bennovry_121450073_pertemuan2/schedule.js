export async function loadSchedule(containerId) {
  try {
    const response = await fetch("../data/jadwal.json");
    const data = await response.json();
    const container = document.getElementById(containerId);

    container.innerHTML = data.map(jadwal => 
      `<div><strong>${jadwal.hari}:</strong> ${jadwal.mata_kuliah} - ${jadwal.jam}</div>`
    ).join("");
  } catch (err) {
    console.error("Gagal memuat jadwal:", err);
  }
}
