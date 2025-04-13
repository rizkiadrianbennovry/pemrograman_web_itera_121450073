class MataKuliah {
  constructor(nama, hari, waktu) {
    this.nama = nama;
    this.hari = hari;
    this.waktu = waktu;
  }

  tampilkan() {
    return `${this.nama} - ${this.hari}, ${this.waktu}`;
  }
}

const jadwalKuliah = [
  new MataKuliah('Statistika Dasar', 'Senin', '08:00 - 10:00'),
  new MataKuliah('Pengantar Sains Data', 'Selasa', '10:00 - 12:00'),
  new MataKuliah('Matematika Diskrit', 'Rabu', '09:00 - 11:00'),
  new MataKuliah('Machine Learning', 'Kamis', '13:00 - 15:00'),
  new MataKuliah('Visualisasi Data', 'Jumat', '14:00 - 16:00')
];

const tampilkanJadwal = (filterHari = "Semua") => {
  const container = document.getElementById('schedule-container');
  container.innerHTML = '';
  jadwalKuliah.forEach((matkul) => {
    if (filterHari === "Semua" || matkul.hari === filterHari) {
      const div = document.createElement('div');
      div.textContent = matkul.tampilkan();
      container.appendChild(div);
    }
  });
};

class ToDoList {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('todo')) || [];
    this.todoListEl = document.getElementById('todo-list');
    this.init();
  }

  init = () => {
    this.render();
    document.getElementById('add-todo').addEventListener('click', this.tambahTugas);
  };

  tambahTugas = () => {
    const input = document.getElementById('todo-input');
    const deadlineInput = document.getElementById('deadline-input');
    const task = input.value.trim();
    const deadline = deadlineInput.value;

    if (task && deadline) {
      this.tasks.push({ task, deadline });
      this.simpan();
      this.render();
      input.value = '';
      deadlineInput.value = '';
    }
  };

  hapusTugas = (index) => {
    this.tasks.splice(index, 1);
    this.simpan();
    this.render();
  };

  render = () => {
    this.todoListEl.innerHTML = '';
    const now = new Date();
    this.tasks.forEach((item, index) => {
      const deadlineTime = new Date(item.deadline);
      const isNear = (deadlineTime - now) < 86400000; // kurang dari 24 jam
      const li = document.createElement('li');
      li.innerHTML = `
        <span style="color:${isNear ? 'red' : 'black'}">${item.task} - ${new Date(item.deadline).toLocaleString()}</span>
        <button onclick="todoList.hapusTugas(${index})">Hapus</button>
      `;
      this.todoListEl.appendChild(li);
    });
  };

  simpan = () => {
    localStorage.setItem('todo', JSON.stringify(this.tasks));
  };
}

const todoList = new ToDoList();
tampilkanJadwal();

document.getElementById('filter-hari').addEventListener('change', (e) => {
  tampilkanJadwal(e.target.value);
});

const tampilkanJam = () => {
  const el = document.getElementById('jam-digital');
  setInterval(() => {
    const now = new Date();
    el.textContent = now.toLocaleTimeString();
  }, 1000);
};
tampilkanJam();