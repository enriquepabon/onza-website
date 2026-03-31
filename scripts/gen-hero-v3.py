import os
from google import genai
from google.genai import types
from PIL import Image
import io

API_KEY = "AIzaSyBSfZkFfvg3atNTD_IVX53TnvM8BmwyCvY"
client = genai.Client(api_key=API_KEY)

prompts = [
    {
        "name": "hero-bg-v3.jpg",
        "desc": "Extreme close-up macro shot of a luxury premium mechanical watch movement — intricate golden gears, jewels, springs, precision-engineered metal parts. Dark matte black background. Dramatic side lighting with golden rim light illuminating the edges of each gear tooth. Shallow depth of field — front gears sharp, background blurs into bokeh. Palette: deep black + warm gold (#D4AF37) + charcoal. No text. No branding. Pure precision machinery. Cinematic, editorial, magazine quality. 8K UHD."
    },
    {
        "name": "hero-bg-v4.jpg",
        "desc": "Abstract macro photograph of dark liquid (black ink or oil) meeting a single stream of warm amber/gold liquid, captured mid-pour. The two liquids create an elegant, organic swirling pattern. Extremely high contrast. Background: pure black (#0C0C0C). The golden liquid catches light and glows. Cinematic depth of field. Editorial photography, like a luxury fragrance campaign. No text. 8K UHD."
    },
]

for p in prompts:
    OUTPUT_PATH = f"/Users/enriquepabon/Documents/onza-website/public/images/hero/{p['name']}"
    print(f"\nGenerando {p['name']}...")

    response = client.models.generate_content(
        model="gemini-3-pro-image-preview",
        contents=p["desc"],
        config=types.GenerateContentConfig(
            response_modalities=["IMAGE", "TEXT"],
            temperature=0.9,
        ),
    )

    for part in response.candidates[0].content.parts:
        if part.inline_data is not None:
            img = Image.open(io.BytesIO(part.inline_data.data))
            img = img.convert("RGB")
            img.save(OUTPUT_PATH, "JPEG", quality=95)
            print(f"✅ {OUTPUT_PATH} — {img.size}")
            break

    import time
    time.sleep(2)
