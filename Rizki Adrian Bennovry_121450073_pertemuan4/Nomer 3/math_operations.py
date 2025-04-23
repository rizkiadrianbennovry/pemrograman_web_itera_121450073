# math_operations.py
PI = 3.14159

def luas_persegi(sisi):
    return sisi * sisi

def keliling_persegi(sisi):
    return 4 * sisi

def luas_persegi_panjang(panjang, lebar):
    return panjang * lebar

def keliling_persegi_panjang(panjang, lebar):
    return 2 * (panjang + lebar)

def luas_lingkaran(jari):
    return PI * jari * jari

def keliling_lingkaran(jari):
    return 2 * PI * jari

def celsius_to_fahrenheit(c):
    return (c * 9/5) + 32

def celsius_to_kelvin(c):
    return c + 273.15