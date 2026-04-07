#!/usr/bin/env python3
"""Generate editorial images for Onza /nosotros and /servicios pages."""

import os
import time
import base64
from pathlib import Path

from google import genai
from google.genai import types

API_KEY = "AIzaSyCnfRvZMPza5-SV7qc5QbdC3KxDvltntRI"
OUTPUT_DIR = Path("/Users/enriquepabon/Documents/onza-website/public/images/sections/generated")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

client = genai.Client(api_key=API_KEY)

IMAGES = {
    # For /nosotros hero - corporate strategy, dark editorial
    "nosotros-hero": (
        "Editorial photograph, dramatic cinematic lighting. A single executive "
        "standing at a floor-to-ceiling window of a dark modern office, looking out "
        "at a city skyline at dusk. Shot from behind, silhouette with rim lighting "
        "in warm amber. Reflective glass, deep shadows, contemplative mood. "
        "Like a Harvard Business Review cover. 16:9 landscape, 8K UHD, "
        "shot on Hasselblad. Dark, moody, premium."
    ),
    # For /servicios hero - technology + strategy
    "servicios-hero": (
        "Editorial photograph, dramatic overhead angle. A dark conference table "
        "with a single laptop, architectural blueprints, and a coffee cup. "
        "Warm amber desk lamp creating dramatic side light and long shadows. "
        "Minimal, precise, organized. The aesthetic of a premium strategy firm. "
        "Dark background, shallow depth of field. 16:9 landscape, 8K UHD quality."
    ),
    # For /servicios between sections - teamwork/workshop feel
    "servicios-workshop": (
        "Editorial photograph, cinematic lighting. Close-up of hands writing on "
        "a whiteboard with flowcharts and diagrams, in a dark modern meeting room. "
        "Selective focus on the writing hand, blurred background shows screens "
        "with data. Warm tones, dark environment, dramatic rim light. "
        "Strategic planning session feel. 16:9 wide landscape, 8K UHD quality."
    ),
}

MODEL = "gemini-2.5-flash-image"


def generate_image(name: str, prompt: str, variant: int) -> bool:
    filename = f"{name}-{variant}.png"
    filepath = OUTPUT_DIR / filename
    print(f"  Generating {filename}...")

    try:
        response = client.models.generate_content(
            model=MODEL,
            contents=prompt,
            config=types.GenerateContentConfig(
                response_modalities=["IMAGE", "TEXT"],
                temperature=0.8,
            ),
        )

        for part in response.candidates[0].content.parts:
            if part.inline_data is not None:
                image_data = part.inline_data.data
                if isinstance(image_data, str):
                    image_data = base64.b64decode(image_data)
                with open(filepath, "wb") as f:
                    f.write(image_data)
                size_kb = os.path.getsize(filepath) / 1024
                print(f"  OK {filename} ({size_kb:.0f} KB)")
                return True

        print(f"  FAIL No image in response for {filename}")
        return False
    except Exception as e:
        print(f"  FAIL {e}")
        return False


def main():
    print("Generating images for /nosotros and /servicios pages...")
    print(f"Model: {MODEL}\n")

    success = 0
    total = len(IMAGES) * 2

    for name, prompt in IMAGES.items():
        print(f"\n{name}:")
        for variant in range(1, 3):
            if generate_image(name, prompt, variant):
                success += 1
            time.sleep(5)

    print(f"\nRESULTS: {success}/{total}")
    for f in sorted(OUTPUT_DIR.glob("*.png")):
        size_kb = f.stat().st_size / 1024
        print(f"  {f.name:40s} {size_kb:>8.0f} KB")


if __name__ == "__main__":
    main()
