import base64
import os
from PIL import Image, ImageDraw

def generate():
    img = Image.open('public/images/logo.png').convert('RGBA')
    w, h = img.size

    # Save 16, 32, 48, 180, 192, 512
    fav16 = img.resize((16, 16), Image.Resampling.LANCZOS)
    fav16.save('public/favicon-16x16.png', 'PNG')

    fav32 = img.resize((32, 32), Image.Resampling.LANCZOS)
    fav32.save('public/favicon-32x32.png', 'PNG')

    fav48 = img.resize((48, 48), Image.Resampling.LANCZOS)
    fav48.save('public/favicon-48x48.png', 'PNG')

    fav180 = img.resize((180, 180), Image.Resampling.LANCZOS)
    fav180.save('public/apple-touch-icon.png', 'PNG')

    fav192 = img.resize((192, 192), Image.Resampling.LANCZOS)
    fav192.save('public/android-chrome-192x192.png', 'PNG')

    fav512 = img.resize((512, 512), Image.Resampling.LANCZOS)
    fav512.save('public/android-chrome-512x512.png', 'PNG')

    # Multi-size ICO
    img.save('public/favicon.ico', format='ICO', sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])

    # SVG Favicon with high-res base64 image
    with open('public/favicon-48x48.png', 'rb') as f:
        b64 = base64.b64encode(f.read()).decode('utf-8')

    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
  <image href="data:image/png;base64,{b64}" x="0" y="0" width="48" height="48" />
</svg>'''

    with open('public/favicon.svg', 'w', encoding='utf-8') as f:
        f.write(svg_content)

    print("All favicons generated successfully!")

if __name__ == '__main__':
    generate()
