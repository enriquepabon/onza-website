#!/usr/bin/env python3
"""Generate editorial images for Onza website using Google Gemini API."""

import os
import time
import base64
from pathlib import Path

from google import genai
from google.genai import types

API_KEY = os.environ.get("GEMINI_API_KEY", "")
OUTPUT_DIR = Path("/Users/enriquepabon/Documents/onza-website/public/images/sections/generated")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

client = genai.Client(api_key=API_KEY)

IMAGES = {
    "hero-bg": (
        "Editorial photograph, dramatic cinematic lighting. Close-up of a business "
        "executive's hands resting on a dark mahogany conference table, with subtle "
        "reflections of data visualizations on the polished surface. Dark moody "
        "atmosphere, shallow depth of field, rim lighting in warm amber tones. "
        "Ultra-wide aspect ratio 16:9. Premium corporate feel like a McKinsey annual "
        "report cover. 8K UHD quality, shot on Hasselblad."
    ),
    "photobreak-work": (
        "Editorial photograph, overhead bird's-eye view of a modern minimalist dark "
        "desk workspace. Laptop showing abstract data dashboard with warm amber glow, "
        "premium notebook with fountain pen, espresso cup. Dark background, dramatic "
        "side lighting creating long shadows. Clean, organized, precision. Like an "
        "Apple product lifestyle shot but for corporate consulting. 16:9 landscape, "
        "8K UHD, shot on Phase One."
    ),
    "photobreak-meeting": (
        "Editorial photograph, silhouettes of two business executives in a modern "
        "glass office at golden hour. Dramatic backlight through floor-to-ceiling "
        "windows, creating a cinematic rim light effect. One person gesturing at a "
        "large screen with abstract data visualization. Dark, moody, premium feel. "
        "The figures are in soft silhouette, this is about the moment, not the "
        "people. 16:9 wide landscape, 8K UHD quality, shot on Leica."
    ),
    "photobreak-architecture": (
        "Architectural photograph, modern premium corporate building interior. Long "
        "corridor with clean geometric lines, dark polished floors reflecting subtle "
        "amber ceiling lights. Minimalist, precise, structured. Like a Tadao Ando "
        "concrete space meets a high-end consulting firm lobby. No people, just pure "
        "architectural precision. Dark mood, dramatic perspective vanishing point. "
        "16:9 wide landscape, 8K UHD quality."
    ),
}

# Models to try in order
MODELS = [
    ("imagen-4.0-generate-001", "imagen"),
    ("gemini-3-pro-image-preview", "gemini"),
    ("gemini-2.5-flash-image", "gemini"),
]


def generate_with_imagen(name: str, prompt: str, variant: int, model: str) -> bool:
    """Generate using Imagen API."""
    filename = f"{name}-{variant}.png"
    filepath = OUTPUT_DIR / filename
    print(f"  Generating {filename} with {model}...")

    try:
        response = client.models.generate_images(
            model=model,
            prompt=prompt,
            config=types.GenerateImagesConfig(
                number_of_images=1,
                aspect_ratio="16:9",
            ),
        )

        if response.generated_images and len(response.generated_images) > 0:
            img = response.generated_images[0]
            image_data = img.image.image_bytes
            if isinstance(image_data, str):
                image_data = base64.b64decode(image_data)
            with open(filepath, "wb") as f:
                f.write(image_data)
            size_kb = os.path.getsize(filepath) / 1024
            print(f"  ✓ Saved {filename} ({size_kb:.0f} KB)")
            return True

        print(f"  ✗ No image in response for {filename}")
        return False
    except Exception as e:
        print(f"  ✗ Error: {e}")
        return False


def generate_with_gemini(name: str, prompt: str, variant: int, model: str) -> bool:
    """Generate using Gemini generateContent API."""
    filename = f"{name}-{variant}.png"
    filepath = OUTPUT_DIR / filename
    print(f"  Generating {filename} with {model}...")

    try:
        response = client.models.generate_content(
            model=model,
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
                print(f"  ✓ Saved {filename} ({size_kb:.0f} KB)")
                return True

        print(f"  ✗ No image data in response for {filename}")
        return False
    except Exception as e:
        print(f"  ✗ Error: {e}")
        return False


def main():
    print("=" * 60)
    print("Onza Website — Image Generation via Gemini API")
    print("=" * 60)
    print(f"Output directory: {OUTPUT_DIR}")

    # Find a working model
    working_model = None
    working_type = None

    for model, mtype in MODELS:
        print(f"\nTesting model: {model} ({mtype})...")
        try:
            if mtype == "imagen":
                response = client.models.generate_images(
                    model=model,
                    prompt="A small dark square, minimalist",
                    config=types.GenerateImagesConfig(number_of_images=1),
                )
                if response.generated_images:
                    working_model = model
                    working_type = mtype
                    print(f"  ✓ {model} works!")
                    break
            else:
                response = client.models.generate_content(
                    model=model,
                    contents="Generate a small dark square",
                    config=types.GenerateContentConfig(
                        response_modalities=["IMAGE", "TEXT"],
                    ),
                )
                working_model = model
                working_type = mtype
                print(f"  ✓ {model} works!")
                break
        except Exception as e:
            err = str(e)[:120]
            print(f"  ✗ {model} failed: {err}")
            # If rate limited, wait and retry
            if "429" in str(e) or "RESOURCE_EXHAUSTED" in str(e):
                print("  Waiting 60s for rate limit...")
                time.sleep(60)
                # Retry same model
                try:
                    if mtype == "imagen":
                        response = client.models.generate_images(
                            model=model,
                            prompt="A small dark square",
                            config=types.GenerateImagesConfig(number_of_images=1),
                        )
                        if response.generated_images:
                            working_model = model
                            working_type = mtype
                            print(f"  ✓ {model} works after retry!")
                            break
                    else:
                        response = client.models.generate_content(
                            model=model,
                            contents="Generate a small dark square",
                            config=types.GenerateContentConfig(
                                response_modalities=["IMAGE", "TEXT"],
                            ),
                        )
                        working_model = model
                        working_type = mtype
                        print(f"  ✓ {model} works after retry!")
                        break
                except Exception as e2:
                    print(f"  ✗ Retry also failed: {str(e2)[:100]}")
            continue

    if not working_model:
        print("\n✗ No working image generation model found. Check API key billing.")
        return

    print(f"\nUsing model: {working_model}")

    success = 0
    total = len(IMAGES) * 2

    for name, prompt in IMAGES.items():
        print(f"\n{'─' * 40}")
        print(f"Image set: {name}")
        for variant in range(1, 3):
            if working_type == "imagen":
                ok = generate_with_imagen(name, prompt, variant, working_model)
            else:
                ok = generate_with_gemini(name, prompt, variant, working_model)
            if ok:
                success += 1
            time.sleep(5)  # Longer delay to avoid rate limits

    print(f"\n{'=' * 60}")
    print(f"RESULTS: {success}/{total} images generated successfully")
    print(f"{'=' * 60}")

    print(f"\nFiles in {OUTPUT_DIR}:")
    for f in sorted(OUTPUT_DIR.glob("*.png")):
        size_kb = f.stat().st_size / 1024
        print(f"  {f.name:40s} {size_kb:>8.0f} KB")

    print("\nDone.")


if __name__ == "__main__":
    main()
