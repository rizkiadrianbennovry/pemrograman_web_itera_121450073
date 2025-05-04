from abc import ABC, abstractmethod

class LibraryItem(ABC):
    """Abstract base class untuk semua item perpustakaan"""
    def __init__(self, title, item_id):
        self._title = title  # Encapsulated attribute
        self._item_id = item_id
        self._availability = True
        
    @property
    def availability(self):
        """Property untuk mengakses status ketersediaan"""
        return "Tersedia" if self._availability else "Dipinjam"
    
    @availability.setter
    def availability(self, status):
        """Property setter untuk mengubah status ketersediaan"""
        self._availability = status
        
    @abstractmethod
    def display_info(self):
        """Abstract method untuk menampilkan informasi item"""
        pass

class Book(LibraryItem):
    """Subclass untuk merepresentasikan buku"""
    def __init__(self, title, item_id, author, pages):
        super().__init__(title, item_id)
        self.author = author
        self.pages = pages
        
    def display_info(self):
        """Implementasi method abstract untuk menampilkan info buku"""
        print(f"BUKU - ID: {self._item_id}")
        print(f"Judul: {self._title}")
        print(f"Penulis: {self.author}")
        print(f"Jumlah Halaman: {self.pages}")
        print(f"Status: {self.availability}\n")

class Magazine(LibraryItem):
    """Subclass untuk merepresentasikan majalah"""
    def __init__(self, title, item_id, issue_number):
        super().__init__(title, item_id)
        self.issue_number = issue_number
        
    def display_info(self):
        """Implementasi method abstract untuk menampilkan info majalah"""
        print(f"MAJALAH - ID: {self._item_id}")
        print(f"Judul: {self._title}")
        print(f"Edisi: {self.issue_number}")
        print(f"Status: {self.availability}\n")

class Library:
    """Class untuk mengelola koleksi perpustakaan"""
    def __init__(self):
        self.__items = []  # Private attribute untuk menyimpan koleksi
        
    def add_item(self, item):
        """Method untuk menambahkan item ke perpustakaan"""
        if isinstance(item, LibraryItem):
            self.__items.append(item)
            print(f"Item '{item._title}' berhasil ditambahkan!")
        else:
            print("Error: Hanya bisa menambahkan LibraryItem")
            
    def display_items(self):
        """Method untuk menampilkan semua item"""
        print("\nDaftar Koleksi Perpustakaan:")
        for item in self.__items:
            item.display_info()
            
    def search_item(self, search_term):
        """Method untuk mencari item berdasarkan judul atau ID"""
        found = False
        print("\nHasil Pencarian:")
        for item in self.__items:
            if (search_term.lower() in item._title.lower() or 
                search_term == item._item_id):
                item.display_info()
                found = True
        if not found:
            print("Item tidak ditemukan")

# Contoh penggunaan
if __name__ == "__main__":
    # Inisialisasi perpustakaan
    lib = Library()
    
    # Membuat beberapa item
    book1 = Book("Laskar Pelangi", "B001", "Andrea Hirata", 529)
    magazine1 = Magazine("National Geographic", "M001", 202)
    book2 = Book("Bumi Manusia", "B002", "Pramoedya Ananta Toer", 535)
    
    # Menambahkan item ke perpustakaan
    lib.add_item(book1)
    lib.add_item(magazine1)
    lib.add_item(book2)
    
    # Mengubah status ketersediaan
    book1._availability = False
    
    # Menampilkan semua item
    lib.display_items()
    
    # Mencari item
    lib.search_item("Bumi")
    lib.search_item("M001")