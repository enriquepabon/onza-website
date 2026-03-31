from google import genai
from google.genai import types
from PIL import Image
import io, time

API_KEY = "AIzaSyBSfZkFfvg3atNTD_IVX53TnvM8BmwyCvY"
client = genai.Client(api_key=API_KEY)

prompts = [
    {
        "name": "hero-scrollpin-a.jpg",
        "prompt": """
Cinematic wide-angle photograph designed as a full-screen website hero background.
Strong compositional split: LEFT 55% is near-pure deep black (#0C0C0C) — empty, clean, space for overlaid text.
RIGHT 45%: extreme close-up macro of a luxury mechanical watch movement emerging from darkness.
Golden gears, jewels, intricate engineering, rim-lit with warm amber light (#D4AF37).
The watch movement bleeds into the black on the left — very gradual, no hard edge.
Mood: silent authority, precision engineering, executive gravitas.
Cinematic shallow depth of field. Film grain. No text. No branding. 8K UHD quality.
Style references: IWC watch catalog, Apple product photography, Kinfolk magazine.
"""
    },
    {
        "name": "hero-scrollpin-b.jpg",
        "prompt": """
Abstract macro cinematic photograph for a premium website hero background.
Full frame filled with dark liquid surface — black, almost mirror-like.
A single diagonal shaft of warm gold light (#D4AF37) cuts across from top-right to bottom-left.
Where the light hits, the liquid surface reveals microscopic texture — like carbon fiber or brushed titanium.
LEFT half: mostly dark, pure black, space for white text overlay.
RIGHT half: the gold light shaft dominates, dramatic, almost blinding at its center.
No objects. No people. Pure abstraction.
Cinematic. High contrast. Painterly. No text. 8K UHD.
Style: Dior campaign photography, Hermès editorial, luxury fragrance advertising.
"""
    },
]

for p in prompts:
    OUTPUT = f"/Users/enriquepabon/Documents/onza-website/public/images/hero/{p['name']}"
    print(f"Generando {p['name']}...")
    response = client.models.generate_content(
        model="gemini-3-pro-image-preview",
        contents=p["prompt"],
        config=types.GenerateContentConfig(
            response_modalities=["IMAGE", "TEXT"],
            temperature=0.9,
        ),
    )
    for part in response.candidates[0].content.parts:
        if part.inline_data is not None:
            img = Image.open(io.BytesIO(part.inline_data.data)).convert("RGB")
            img.save(OUTPUT, "JPEG", quality=95)
            print(f"  ✅ {img.size} → {OUTPUT}")
            break
    time.sleep(2)

print("\nListo.")
