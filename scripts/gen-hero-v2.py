import os
from google import genai
from google.genai import types
from PIL import Image
import io

API_KEY = "AIzaSyBSfZkFfvg3atNTD_IVX53TnvM8BmwyCvY"
client = genai.Client(api_key=API_KEY)

OUTPUT_PATH = "/Users/enriquepabon/Documents/onza-website/public/images/hero/hero-bg-v2.jpg"

prompt = """
Generate a cinematic editorial photograph for a premium AI consulting firm website.

## TECHNICAL SPECIFICATIONS
- Aspect ratio: 16:9 landscape
- Style: High-contrast cinematic photography, editorial magazine
- NO text anywhere in the image

## SCENE
A wide-angle low-angle view of a dramatic modern glass and concrete office building interior at night.
Floor-to-ceiling windows. City lights visible through the glass creating streaks of warm amber and gold light.
The interior is very dark (#0C0C0C) but with strong architectural light beams — thin horizontal bands of warm golden light (#D4AF37) cutting across the dark space from left to right.
In the far background, blurred city skyline at dusk with warm orange and deep navy tones.
The foreground is pure deep black, giving the image cinematic depth.
Strong chiaroscuro: extreme contrast between the near-total darkness and the sharp golden light beams.

## LIGHTING
- Dominant: warm golden hour amber (#D4AF37) light beams
- Secondary: deep navy blue (#1A2A3A) city glow through windows
- Contrast ratio: very high — 90% dark, 10% bright golden light
- Cinematic lens flare: subtle, elegant, not distracting
- No cool/blue tones dominating — warm amber/gold is king

## MOOD & REFERENCES
- Stanley Kubrick architectural cinematography
- Blade Runner 2049 (golden hour scenes)
- Apple Park interior photography
- McKinsey & Company annual report photography
- Premium: authoritative, silent power, executive gravity

## RESTRICTIONS
- NO people
- NO technology/screens/circuits
- NO text
- NO generic stock photo feel
- NO blue dominant lighting
- Must feel architectural, cinematic, original

Generate the photograph now.
"""

print("Generando hero-bg-v2.jpg (versión arquitectura nocturna)...")

response = client.models.generate_content(
    model="gemini-3-pro-image-preview",
    contents=prompt,
    config=types.GenerateContentConfig(
        response_modalities=["IMAGE", "TEXT"],
        temperature=0.9,
    ),
)

image_saved = False
for part in response.candidates[0].content.parts:
    if part.inline_data is not None:
        image_data = part.inline_data.data
        img = Image.open(io.BytesIO(image_data))
        img = img.convert("RGB")
        img.save(OUTPUT_PATH, "JPEG", quality=95)
        print(f"✅ Guardada: {OUTPUT_PATH}")
        print(f"   Dimensiones: {img.size}")
        image_saved = True
        break

if not image_saved:
    for part in response.candidates[0].content.parts:
        if hasattr(part, 'text') and part.text:
            print(f"❌ Sin imagen. Texto: {part.text[:200]}")
