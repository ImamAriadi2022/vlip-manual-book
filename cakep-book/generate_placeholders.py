"""
Script untuk generate placeholder images untuk manual book
Run: python generate_placeholders.py

Requirements: PIL (Pillow)
Install: pip install Pillow
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_placeholder_images(num_pages=6, output_dir="public/manuals"):
    """
    Generate placeholder images untuk manual book demo
    
    Args:
        num_pages: Jumlah halaman yang akan di-generate
        output_dir: Folder output untuk menyimpan gambar
    """
    
    # Pastikan folder output ada
    os.makedirs(output_dir, exist_ok=True)
    
    # Ukuran halaman (rasio standar buku)
    width = 550
    height = 733
    
    # Warna gradient untuk setiap halaman
    colors = [
        (255, 182, 193),  # Light pink
        (173, 216, 230),  # Light blue
        (144, 238, 144),  # Light green
        (255, 218, 185),  # Peach
        (221, 160, 221),  # Plum
        (255, 250, 205),  # Lemon chiffon
    ]
    
    for i in range(1, num_pages + 1):
        # Buat image baru
        img = Image.new('RGB', (width, height), color=colors[(i-1) % len(colors)])
        draw = ImageDraw.Draw(img)
        
        # Draw border
        border_width = 20
        draw.rectangle(
            [border_width, border_width, width-border_width, height-border_width],
            outline='white',
            width=3
        )
        
        # Tambahkan teks
        try:
            # Coba gunakan font yang lebih bagus
            font_large = ImageFont.truetype("arial.ttf", 60)
            font_small = ImageFont.truetype("arial.ttf", 30)
        except:
            # Fallback ke default font
            font_large = ImageFont.load_default()
            font_small = ImageFont.load_default()
        
        # Judul halaman
        title = f"Halaman {i}"
        
        # Hitung posisi teks untuk center alignment
        # Note: textbbox returns (left, top, right, bottom)
        bbox = draw.textbbox((0, 0), title, font=font_large)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        
        x = (width - text_width) // 2
        y = (height - text_height) // 2 - 50
        
        # Draw teks dengan shadow
        shadow_offset = 3
        draw.text((x + shadow_offset, y + shadow_offset), title, fill='gray', font=font_large)
        draw.text((x, y), title, fill='white', font=font_large)
        
        # Tambahkan subtitle
        subtitle = "Manual Book Cakep.id"
        bbox_sub = draw.textbbox((0, 0), subtitle, font=font_small)
        text_width_sub = bbox_sub[2] - bbox_sub[0]
        x_sub = (width - text_width_sub) // 2
        y_sub = y + 80
        
        draw.text((x_sub, y_sub), subtitle, fill='white', font=font_small)
        
        # Simpan image
        filename = os.path.join(output_dir, f"page{i}.png")
        img.save(filename, quality=95)
        print(f"✓ Berhasil dibuat: {filename}")
    
    print(f"\n✨ Berhasil generate {num_pages} gambar placeholder!")
    print(f"📁 Lokasi: {output_dir}/")
    print("\n💡 Tips:")
    print("   - Ganti gambar ini dengan halaman manual asli Anda")
    print("   - Pertahankan format penamaan: page1.png, page2.png, dst.")
    print("   - Resolusi yang direkomendasikan: 550x733 pixels")

if __name__ == "__main__":
    print("🎨 Membuat gambar placeholder untuk manual book...\n")
    
    # Generate 6 halaman placeholder
    create_placeholder_images(num_pages=6)
