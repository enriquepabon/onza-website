import os
import time
from google import genai
from google.genai import types
from PIL import Image
import io

API_KEY = "AIzaSyBSfZkFfvg3atNTD_IVX53TnvM8BmwyCvY"
client = genai.Client(api_key=API_KEY)

OUTPUT_PATH = "/Users/enriquepabon/Documents/onza-website/public/images/hero/hero-bg.jpg"

prompt = """
You are generating a premium editorial photograph for a luxury AI consulting firm website hero section.

## TECHNICAL SPECIFICATIONS
- Aspect ratio: 16:9 (1920 x 1080)
- Style: Cinematic editorial photography, magazine quality
- Output: Single full-bleed photograph, no text, no UI overlays

## PHOTOGRAPH DESCRIPTION

A dramatically lit top-down (bird's eye view) photograph of a sleek executive workspace.
Dark matte black desk surface. A closed premium laptop (matte black, no visible brand).
A small architectural concrete espresso cup with steam rising gently.
One single dried pampas grass stem in a minimal black ceramic vase.
A few loose papers arranged at a precise angle.
The scene is bathed in warm golden-hour light coming from a narrow off-camera window — one side of the desk is warmly lit in amber/gold tones (#D4AF37 palette), the other side falls into deep shadow (#0C0C0C).

## LIGHTING & MOOD
- Cinematic chiaroscuro: 70% dark, 30% warm golden light
- Rim lighting on object edges
- Deep shadows with no harsh reflections
- Warm amber and charcoal palette — NO blue tones, NO cool light
- Depth of field: everything in focus (f/8 equivalent)
- Film grain: subtle, high-end analog feel
- Mood: silent authority, precision, strategic calm

## STYLE REFERENCES
- Kinfolk magazine editorial
- Cereal magazine workspace
- Aesop product photography
- Apple product launch photography

## RESTRICTIONS
- NO text anywhere in the image
- NO screens showing content
- NO colorful objects
- NO people or hands
- NO technology/circuit board imagery
- NO blue/cool tones — strictly warm dark palette
- NO stock photo feel — must look editorial, intentional

Generate the photograph now. Pure image output only.
"""

print("Generando hero-bg.jpg con gemini-3-pro-image-preview (Nano Banana Pro 2)...")

response = client.models.generate_content(
    model="gemini-3-pro-image-preview",
    contents=prompt,
    config=types.GenerateContentConfig(
        response_modalities=["IMAGE", "TEXT"],
        temperature=0.8,
    ),
)

image_saved = False
for part in response.candidates[0].content.parts:
    if part.inline_data is not None:
        image_data = part.inline_data.data
        img = Image.open(io.BytesIO(image_data))
        img = img.convert("RGB")
        img.save(OUTPUT_PATH, "JPEG", quality=92)
        print(f"✅ Imagen guardada: {OUTPUT_PATH}")
        print(f"   Dimensiones: {img.size}")
        image_saved = True
        break

if not image_saved:
    print("❌ No se generó imagen. Respuesta de texto:")
    for part in response.candidates[0].content.parts:
        if hasattr(part, 'text'):
            print(part.text)
