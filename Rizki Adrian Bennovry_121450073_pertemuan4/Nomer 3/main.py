import math_operations as mo
from math_operations import luas_lingkaran, keliling_lingkaran

# Persegi
print("Persegi:")
print("Luas:", mo.luas_persegi(4))
print("Keliling:", mo.keliling_persegi(4))

# Persegi Panjang
print("\nPersegi Panjang:")
print("Luas:", mo.luas_persegi_panjang(5, 3))
print("Keliling:", mo.keliling_persegi_panjang(5, 3))

# Lingkaran
print("\nLingkaran:")
print("Luas:", luas_lingkaran(7))
print("Keliling:", keliling_lingkaran(7))

# Konversi Suhu
print("\nKonversi Suhu:")
c = 25
print(f"{c}°C ke Fahrenheit:", mo.celsius_to_fahrenheit(c))
print(f"{c}°C ke Kelvin:", mo.celsius_to_kelvin(c))
