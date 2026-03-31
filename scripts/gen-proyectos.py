from google import genai
from google.genai import types
from PIL import Image
import io, time

API_KEY = "AIzaSyBSfZkFfvg3atNTD_IVX53TnvM8BmwyCvY"
client = genai.Client(api_key=API_KEY)

BASE = "/Users/enriquepabon/Documents/onza-website/public/images/proyectos"

import os
os.makedirs(BASE, exist_ok=True)

photos = [
    {
        "name": "grupo-mexico.jpg",
        "prompt": """
Abstract cinematic photograph evoking large-scale knowledge transfer and learning.
Dark background (#0C0C0C). Hundreds of tiny warm gold light points (#D4AF37)
arranged in an expanding wave pattern — like a constellation or neural network
spreading outward from a bright center point.
The light points suggest people, nodes, connections — scale and reach.
The composition has energy, movement, expansion. Inspiring, not corporate.
No people. No text. No screens. Pure abstraction of light and scale.
Cinematic. Film grain. 8K UHD. Style: Ryoji Ikeda, National Geographic space photography.
"""
    },
    {
        "name": "oleoflores-formacion.jpg",
        "prompt": """
Abstract macro cinematic photograph evoking organic growth and transformation.
A single warm amber light (#D4AF37) radiates from the right side of the frame,
casting long shadows across a dark textured surface — like rich dark soil or bark.
The light reveals intricate organic patterns in the material.
Intimate scale. Warm. Grounded. Suggests agricultural roots + technological transformation.
No people. No text. No plants. Pure light on dark organic texture.
Cinematic. Film grain. 8K UHD. Style: Kinfolk magazine, Aesop brand photography.
"""
    },
    {
        "name": "oleoflores-apps.jpg",
        "prompt": """
Abstract macro cinematic photograph evoking interconnected digital systems and supply chain.
Dark background (#0C0C0C). A web of ultra-thin gold lines (#D4AF37) and red lines (#FF3B30)
forms a precise geometric network pattern — like circuit traces, supply chain nodes,
or a logistics map seen from above.
The lines intersect at precise points that glow slightly brighter.
Clean, architectural, precise. Suggests multiple connected systems working in harmony.
No screens. No devices. No people. Pure geometric abstraction.
Cinematic. Film grain. 8K UHD. Style: infographic art, Tadao Ando, Bang & Olufsen.
"""
    },
    {
        "name": "latroupe.jpg",
        "prompt": """
Abstract cinematic photograph evoking European luxury hospitality and precision operations.
A long, perfectly symmetrical dark corridor or hallway receding into the distance.
Warm amber wall sconces create pools of golden light at regular intervals along the walls.
The floor is dark polished stone that reflects the lights softly.
The perspective creates a precise vanishing point — elegant, ordered, infinite.
Mood: European luxury hotel, private club, silent excellence.
No people. No signs. No text. Just architecture and light.
Cinematic. Deep shadows. Film grain. 8K UHD.
Style: Stanley Kubrick The Shining corridor, Ritz Paris, IWC Schaffhausen editorial.
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
                temperature=0.88,
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
