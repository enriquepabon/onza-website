from google import genai
from google.genai import types
from PIL import Image
import io, time

API_KEY = "AIzaSyBSfZkFfvg3atNTD_IVX53TnvM8BmwyCvY"
client = genai.Client(api_key=API_KEY)

BASE = "/Users/enriquepabon/Documents/onza-website/public/images/sections"

photos = [
    {
        "name": "services-bg.jpg",
        "prompt": """
Cinematic wide-angle photograph for a full-screen website section background.
LEFT 55% of frame: near-pure deep black (#0C0C0C) — empty, clean, space for overlaid text.
RIGHT 45%: extreme close-up macro of precision engineering components — golden gears, microchips, circuit board traces — emerging from darkness with warm amber rim lighting (#D4AF37).
The components bleed softly into the black on the left — very gradual, no hard edge.
Cinematic shallow depth of field. Front elements sharp, background dissolves into bokeh.
Mood: silent authority, precision technology, executive gravitas.
Film grain. No text. No branding. No human faces. No AI robot imagery.
8K UHD quality. Style: IWC watch catalog, Apple product photography.
"""
    },
    {
        "name": "differentiators-bg.jpg",
        "prompt": """
Abstract macro cinematic photograph for a premium website section background.
Full frame filled with dark liquid surface — black, almost mirror-like, like liquid mercury or dark oil.
A single diagonal shaft of warm gold light (#D4AF37) cuts across from top-right to bottom-left.
Where light hits, surface reveals microscopic texture — like carbon fiber or brushed titanium.
LEFT half: mostly pure black — space for white text overlay.
RIGHT half: the gold light shaft dominates, dramatic, almost blinding at its center.
No objects. No people. Pure abstraction. No AI imagery.
Cinematic. High contrast. Painterly. Film grain. No text. 8K UHD.
Style: Dior campaign photography, Hermès editorial, luxury fragrance advertising.
"""
    },
    {
        "name": "process-bg.jpg",
        "prompt": """
Cinematic macro photograph of a single luxury fountain pen or metal stylus lying on an ultra-dark matte surface (#0C0C0C).
The pen/stylus is placed on the RIGHT side of the frame, leaving LEFT 50% completely dark for text.
A thin warm rim light (#D4AF37 gold) catches the metal barrel, creating a precise highlight line.
Background: pure black, no distractions. Surface: dark leather or matte carbon texture visible only near the object.
Extreme shallow depth of field. One end sharp, the other fading into blur.
Mood: strategic thinking, deliberate precision, premium consulting.
Film grain. No text. No branding. 8K UHD. Style: Kinfolk magazine, Apple accessories photography.
"""
    },
    {
        "name": "stats-bg.jpg",
        "prompt": """
Abstract macro photograph of brushed titanium or carbon fiber surface texture.
Extreme close-up filling the entire frame — the material fills everything, no other objects.
The surface is mostly dark (#0C0C0C to #1A1A1A), with geometric woven or layered patterns.
A single thin diagonal line of deep red light (#FF3B30) cuts from top-left to bottom-right like a laser.
Where the red light hits the surface, the texture becomes hyper-detailed.
Moody, industrial, premium. No text. No people. No AI imagery.
Film grain. High contrast. 8K UHD. Style: Dior Homme campaign, Bang & Olufsen product photography.
"""
    },
    {
        "name": "cta-bg.jpg",
        "prompt": """
Cinematic editorial photograph of two executive hands in a strategic meeting.
Dark suit sleeves visible, one wrist shows the edge of a luxury mechanical watch.
Hands resting on or near a dark matte table surface — minimal gesture, reviewing an unseen document.
NO FACES visible — frame cuts below the shoulders. Only hands and table visible.
Side lighting: warm amber (#D4AF37) from the right, deep shadows on the left.
Background: pure dark (#0C0C0C), almost no depth. The hands are the only subject.
Mood: strategic decision-making, trust, premium consulting partnership.
Film grain. Cinematic shallow DOF. No text. No branding. 8K UHD.
Style: McKinsey editorial photography, financial services advertising, IWC campaign.
"""
    },
    {
        "name": "clients-bg.jpg",
        "prompt": """
Abstract cinematic photograph looking DOWN through dark glass or water at city lights far below.
Like the view from a skyscraper penthouse at night — floor-to-ceiling dark glass reflects scattered warm city lights.
The frame is mostly pure black (#0C0C0C) with small, scattered warm light points (gold #D4AF37, white) far in the distance below.
The glass surface itself shows barely-visible reflections — ghostly, dreamlike.
LEFT half: almost entirely dark — space for text overlay.
No people. No clear objects. Pure abstraction of light and darkness.
Cinematic. Dreamlike. Premium. Film grain. No text. 8K UHD.
Style: Hermès campaign, luxury hotel brand photography, architectural photography.
"""
    },
]

for p in photos:
    out = f"{BASE}/{p['name']}"
    print(f"\nGenerando {p['name']}...")
    try:
        response = client.models.generate_content(
            model="gemini-3-pro-image-preview",
            contents=p["prompt"],
            config=types.GenerateContentConfig(
                response_modalities=["IMAGE", "TEXT"],
                temperature=0.85,
            ),
        )
        for part in response.candidates[0].content.parts:
            if part.inline_data is not None:
                img = Image.open(io.BytesIO(part.inline_data.data)).convert("RGB")
                img.save(out, "JPEG", quality=95)
                print(f"  ✅ {img.size} → {out}")
                break
        else:
            print(f"  ⚠️  No image returned for {p['name']}")
    except Exception as e:
        print(f"  ❌ Error: {e}")
    time.sleep(2)

print("\n✅ Listo.")
