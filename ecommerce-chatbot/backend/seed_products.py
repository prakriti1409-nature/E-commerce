import sqlite3
import random

# Connect to the database
conn = sqlite3.connect('ecommerce.db')
cursor = conn.cursor()

# Sample categories and product names
categories = {
    "electronics": ["Phone", "Laptop", "Tablet", "Headphones", "Smartwatch"],
    "books": ["Novel", "Biography", "Comics", "Textbook", "Magazine"],
    "clothing": ["T-Shirt", "Jeans", "Jacket", "Shoes", "Sweater"],
    "home": ["Lamp", "Chair", "Table", "Mattress", "Curtain"],
    "toys": ["Puzzle", "Action Figure", "Board Game", "Lego", "Doll"]
}

# Generate 100+ mock products
products = []
for i in range(1, 121):  # 120 products
    category = random.choice(list(categories.keys()))
    name = random.choice(categories[category]) + f" {random.randint(100, 999)}"
    price = round(random.uniform(10, 1000), 2)
    stock = random.randint(5, 100)
    description = f"This is a high-quality {name} in the {category} category."
    products.append((name, category, price, stock, description))

# Insert products into DB
cursor.executemany('''
    INSERT INTO products (name, category, price, stock, description)
    VALUES (?, ?, ?, ?, ?)
''', products)

conn.commit()
conn.close()

print("✅ Seeded 120 mock products successfully.")
