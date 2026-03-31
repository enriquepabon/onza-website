from google import genai
from google.genai import types
from PIL import Image
import io, time

API_KEY = "AIzaSyBSfZkFfvg3atNTD_IVX53TnvM8BmwyCvY"
client = genai.Client(api_key=API_KEY)

BASE = "/Users/enriquepabon/Documents/onza-website/public/images/sections"

photos = [
    {
        "name": "abstract-a.jpg",
        "prompt": """
Abstract macro photograph. Pure black background (#0C0C0C).
A single razor-thin beam of warm gold light (#D4AF37) enters from the top-right corner,
cuts diagonally across the frame, and disappears bottom-left.
Where the beam passes, it illuminates microscopic dust particles suspended in air —
they glow like tiny stars caught in a spotlight.
The rest of the frame: absolute darkness, deep velvet black.
No objects. No surfaces. Pure light and void.
Ultra cinematic. Painterly. 8K UHD. Film grain. No text.
Style: Dior Homme campaign, Stanley Kubrick lighting, luxury watch editorial.
"""
    },
    {
        "name": "abstract-b.jpg",
        "prompt": """
Abstract macro photograph. Extreme close-up of dark liquid surface —
like black ink or mercury, perfectly still, mirror-like.
A single point of warm amber light (#D4AF37) reflects on the surface,
creating a long, thin reflection line that stretches vertically across the frame.
The surface reveals tiny imperfections — microscopic ripples, tension lines.
Background: pure void, no depth cues.
No objects. No people. No AI imagery.
Meditative, premium, editorial. Film grain. No text. 8K UHD.
Style: Hermès campaign, Wolfgang Tillmans photography, luxury fragrance.
"""
    },
    {
        "name": "abstract-c.jpg",
        "prompt": """
Abstract cinematic photograph. Dense black smoke or vapor rising slowly upward
against a pure black background (#0C0C0C).
A thin shaft of deep red light (#FF3B30) cuts horizontally through the smoke,
illuminating it from behind — the smoke glows crimson where the light passes through.
The smoke forms organic, cloud-like shapes. Wispy. Ethereal.
Pure abstraction. No objects. No faces.
Dramatic. Moody. Cinematic. Film grain. No text. 8K UHD.
Style: Nick Knight photography, Comme des Garçons campaign, editorial fashion.
"""
    },
    {
        "name": "abstract-d.jpg",
        "prompt": """
Abstract macro photograph. Extreme close-up of a dark glass or crystal surface
that has been slightly fogged — a breath on cold glass.
Light rakes across the surface from the right, warm gold (#D4AF37),
revealing the fog texture in exquisite detail — microscopic water droplets,
interference patterns, ghostly gradients.
The left side fades to pure black. Right side catches the raking light.
No objects in frame beyond the surface itself.
Tactile. Premium. Intimate. Film grain. No text. 8K UHD.
Style: Aesop brand photography, minimalist editorial, Kinfolk magazine.
"""
    },
    {
        "name": "abstract-e.jpg",
        "prompt": """
Abstract long-exposure photograph. Pure black background.
A single thin arc of light — like a laser or fiber optic strand —
curves gracefully from the bottom-left to the upper-right of the frame.
The arc is warm gold (#D4AF37) at center, fading to near-invisible at both ends.
The surrounding black is absolute, infinite.
No motion blur. The arc is sharp, precise, architectural.
Minimal. Elegant. Almost mathematical in its precision.
No objects. No text. Film grain. 8K UHD.
Style: Ryoji Ikeda art, Bang & Olufsen campaign, Swiss graphic design.
"""
    },
    {
        "name": "abstract-f.jpg",
        "prompt": """
Abstract macro photograph. Extreme close-up of layered dark surfaces —
like stacked sheets of dark glass, carbon, or slate — seen edge-on.
Each layer is separated by a hairline gap that catches a warm amber light (#D4AF37).
The layers create a rhythm of thin glowing lines against darkness.
The composition is architectural, geometric, almost typographic.
Right side illuminated, left fades to pure black.
No recognizable objects. Pure form and light.
Architectural. Precise. Premium. Film grain. No text. 8K UHD.
Style: Tadao Ando architecture photography, Herzog & de Meuron, IWC Schaffhausen.
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
                temperature=0.9,
            ),
        )
        for part in response.candidates[0].content.parts:
            if part.inline_data is not None:
                img = Image.open(io.BytesIO(part.inline_data.data)).convert("RGB")
                img.save(out, "JPEG", quality=95)
                print(f"  ✅ {img.size} → {out}")
                break
        else:
            print(f"  ⚠️  No image returned")
    except Exception as e:
        print(f"  ❌ Error: {e}")
    time.sleep(2)

print("\n✅ Listo.")
