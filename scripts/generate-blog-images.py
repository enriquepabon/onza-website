#!/usr/bin/env python3
"""
Generate 16 premium editorial blog images for Onza website using Gemini API.
Dark, cinematic, infographic-style images aligned with Onza brand.

Usage:
  pip3 install google-genai
  python3 scripts/generate-blog-images.py
"""

from google import genai
from google.genai import types
import os
import time
import base64
from pathlib import Path

API_KEY = os.environ.get("GEMINI_API_KEY", "")
OUTPUT_DIR = Path("/Users/enriquepabon/Documents/onza-website/public/images/blog")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

client = genai.Client(api_key=API_KEY)

BLOG_IMAGES = [
    {
        "slug": "como-implementar-ia-en-tu-empresa",
        "prompt": "Dark premium editorial photograph, top-down view of a dark wooden desk with a strategic roadmap and flowchart sketched on dark charcoal paper, a golden fountain pen resting beside it, warm amber desk lamp casting dramatic side light. Minimal objects, clean composition. Dark background #0C0C0C, warm golden tones. No text, no words, no letters. Cinematic lighting, shallow depth of field. 16:9 aspect ratio."
    },
    {
        "slug": "diagnostico-ia-empresarial",
        "prompt": "Abstract dark infographic-style digital art: a diagnostic dashboard floating in dark space (#0C0C0C background). Circular gauges, bar meters, and health indicator dots glowing in amber (#D4AF37) and soft gold. Some indicators green, some red (#FF3B30). Clean geometric design, minimal, futuristic. No text, no words, no letters. Premium data visualization aesthetic. 16:9 aspect ratio."
    },
    {
        "slug": "automatizacion-procesos-vs-ia",
        "prompt": "Abstract split composition on dark background (#0C0C0C). Left half: mechanical silver gears and cogs, precise, industrial, cool-toned metallic. Right half: organic neural network pattern with golden (#D4AF37) glowing nodes and connections. Clean vertical divide between the two halves. No text, no words, no letters. Premium minimal aesthetic, cinematic lighting. 16:9 aspect ratio."
    },
    {
        "slug": "errores-comunes-implementar-ia",
        "prompt": "Dark premium photograph of a chess board on a dark surface. Several chess pieces have fallen over, dramatic side lighting in warm amber tones. One king piece standing among fallen pieces. Dark moody atmosphere, #0C0C0C background. Strategic failure metaphor. No text, no words, no letters. Cinematic, editorial quality. 16:9 aspect ratio."
    },
    {
        "slug": "ia-logistica-supply-chain-latam",
        "prompt": "Aerial night view of a large cargo port with shipping containers arranged in geometric patterns. Dramatic amber and warm lighting from port lamps. Dark moody atmosphere, deep shadows. Industrial scale, Latin American port feel. No text, no words, no letters. Cinematic drone photography style, dark background. 16:9 aspect ratio."
    },
    {
        "slug": "senales-empresa-lista-para-ia",
        "prompt": "Dark premium photograph of an industrial control panel with rows of toggle switches and circular indicator lights. Some indicators illuminated in warm amber/gold (#D4AF37), others dark and unlit. Ready/not-ready metaphor. Dark background #0C0C0C, dramatic focused lighting. No text, no words, no letters. Minimal, editorial quality. 16:9 aspect ratio."
    },
    {
        "slug": "ia-generativa-vs-predictiva-empresas",
        "prompt": "Abstract digital art on dark background (#0C0C0C). Two distinct light patterns side by side. Left: flowing, creative, organic light streams in warm gold, like generative energy. Right: structured precise grid of data points and geometric patterns in cool white and silver. Clean composition, premium minimal. No text, no words, no letters. 16:9 aspect ratio."
    },
    {
        "slug": "chatgpt-claude-gemini-cual-usar-empresa",
        "prompt": "Three abstract geometric spheres floating on dark background (#0C0C0C). Each sphere has a different subtle color tint - one warm amber, one cool blue-white, one soft red (#FF3B30). Dramatic rim lighting, reflective surfaces. Comparison concept, premium minimal aesthetic. No text, no words, no letters, no logos. Clean, cinematic. 16:9 aspect ratio."
    },
    {
        "slug": "roi-inteligencia-artificial-empresa",
        "prompt": "Abstract data visualization on dark background (#0C0C0C): ascending bar chart made of vertical golden (#D4AF37) light beams of increasing height from left to right. Financial growth visualization. Clean, minimal, geometric. Subtle glow and reflection on dark surface below. No text, no words, no numbers, no letters. Premium infographic style. 16:9 aspect ratio."
    },
    {
        "slug": "ia-retail-experiencia-cliente-latam",
        "prompt": "Modern premium dark retail store interior at night. Minimalist architecture, clean lines. Warm amber display lighting illuminating products on dark shelves. Empty, serene atmosphere. Dark floors and walls, luxury boutique feel like Apple Store or Aesop. No text, no words, no letters, no signs. Cinematic, editorial photography. 16:9 aspect ratio."
    },
    {
        "slug": "chatbots-ia-servicio-al-cliente",
        "prompt": "Abstract minimal art: several translucent conversation bubble shapes floating in dark space (#0C0C0C background). Bubbles have subtle rim lighting in warm amber and soft white glow. Different sizes, scattered composition. Not literal chat interface. No text, no words, no letters inside bubbles. Ethereal, premium, cinematic lighting. 16:9 aspect ratio."
    },
    {
        "slug": "formacion-ia-empresas-que-funciona",
        "prompt": "Dark modern workshop or classroom setting. Silhouettes of a few people at a long dark table, laptop screens glowing in warm amber light. Dramatic backlighting, editorial photography style. Dark walls, minimal furniture. Corporate training atmosphere. No text, no words, no letters. Cinematic, moody. 16:9 aspect ratio."
    },
    {
        "slug": "ia-manufactura-operaciones-latam",
        "prompt": "Dark factory floor at night. Robotic arms and industrial machinery with small amber (#D4AF37) indicator lights glowing. Dramatic cinematic lighting, deep shadows. Industrial precision, modern manufacturing. Dark atmosphere, #0C0C0C tones. No text, no words, no letters. Editorial documentary style. 16:9 aspect ratio."
    },
    {
        "slug": "agentes-ia-empresas-que-son",
        "prompt": "Abstract network visualization on dark background (#0C0C0C): interconnected glowing nodes of different sizes connected by thin luminous lines. Key nodes highlighted in red (#FF3B30) and gold (#D4AF37), smaller nodes in soft white. Neural network / agent network metaphor. No text, no words, no letters. Clean, geometric, premium infographic style. 16:9 aspect ratio."
    },
    {
        "slug": "seguridad-datos-ia-empresas-latam",
        "prompt": "Dark server room corridor with rows of server racks receding into distance. Cool blue-tinted security lighting, geometric precision. Small LED indicator lights on servers. Secure, controlled environment feel. Dark atmosphere, #0C0C0C tones. No text, no words, no letters. Cinematic, symmetric composition. 16:9 aspect ratio."
    },
    {
        "slug": "como-elegir-consultora-ia",
        "prompt": "Dark premium photograph of a conference table with two modern chairs facing each other. Warm amber light source between the chairs creating dramatic glow. Dark room, minimal furniture. Decision and meeting metaphor. #0C0C0C background tones. No text, no words, no letters. Editorial, cinematic lighting. 16:9 aspect ratio."
    },
]


def generate_image(slug: str, prompt: str) -> bool:
    """Generate a single blog image and save it."""
    output_path = OUTPUT_DIR / f"{slug}.png"

    if output_path.exists():
        print(f"  SKIP: {slug}.png already exists")
        return True

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash-image",
            contents=prompt,
            config=types.GenerateContentConfig(
                response_modalities=["IMAGE", "TEXT"],
            ),
        )

        # Extract image from response
        for part in response.candidates[0].content.parts:
            if part.inline_data is not None:
                image_data = part.inline_data.data
                with open(output_path, "wb") as f:
                    f.write(image_data)
                file_size = output_path.stat().st_size
                print(f"  SAVED: {slug}.png ({file_size / 1024:.1f} KB)")
                return True

        print(f"  ERROR: No image data in response for {slug}")
        return False

    except Exception as e:
        print(f"  ERROR: {slug} - {e}")
        return False


def main():
    print(f"Output directory: {OUTPUT_DIR}")
    print(f"Generating {len(BLOG_IMAGES)} blog images...\n")

    success_count = 0
    fail_count = 0

    for i, blog in enumerate(BLOG_IMAGES, 1):
        slug = blog["slug"]
        prompt = blog["prompt"]
        print(f"[{i}/{len(BLOG_IMAGES)}] {slug}")

        if generate_image(slug, prompt):
            success_count += 1
        else:
            fail_count += 1

        # 5 second delay between API calls (skip after last one)
        if i < len(BLOG_IMAGES):
            print("  Waiting 5 seconds...")
            time.sleep(5)

    print(f"\n{'='*50}")
    print(f"DONE: {success_count} succeeded, {fail_count} failed")
    print(f"Images saved to: {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
