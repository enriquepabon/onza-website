#!/usr/bin/env python3
"""
Generate OG image for Onza website (1200x630px)
Brand: #0C0C0C bg, white logo mark + wordmark, red accent, light gray tagline
Based on Brand Guidelines v1 — Onza
"""

from PIL import Image, ImageDraw, ImageFont
import os, sys

# --- Canvas ------------------------------------------------------------------
W, H = 1200, 630
img = Image.new("RGB", (W, H), color="#0C0C0C")
draw = ImageDraw.Draw(img)

# --- Logo mark ---------------------------------------------------------------
# Original mark in 800x800 viewBox (from onza-logo-reversed.svg)
# Scale and center within the canvas
# Target: mark ~180px tall, centered horizontally, top at y=130

SCALE = 0.426
OX = 430   # x offset: centers mark at x=600
OY = 85    # y offset: mark top at y≈140

def t(x, y):
    """Apply scale + offset to logo coordinates."""
    return (x * SCALE + OX, y * SCALE + OY)

# Left arm:  polygon 128,130  168,130  401,553  399,553
# Right arm: polygon 632,130  672,130  401,553  399,553
# Inner wedge (simplified from cubic bezier): 438,145  450,145  401,553  399,553

left_arm  = [t(128,130), t(168,130), t(401,553), t(399,553)]
right_arm = [t(632,130), t(672,130), t(401,553), t(399,553)]
inner     = [t(438,145), t(450,145), t(401,553), t(399,553)]

draw.polygon(left_arm,  fill="#FFFFFF")
draw.polygon(right_arm, fill="#FFFFFF")
draw.polygon(inner,     fill="#FFFFFF")

# --- Wordmark ----------------------------------------------------------------
# "ONZA" in Futura Light / Montserrat Light / Helvetica Neue Light
# Placed below the mark, centered at x=600

MARK_BOTTOM_Y = 553 * SCALE + OY    # ≈ 320

font_paths = [
    "/System/Library/Fonts/Helvetica.ttc",
    "/Library/Fonts/Montserrat-Light.ttf",
    "/System/Library/Fonts/HelveticaNeue.ttc",
    "/System/Library/Fonts/Supplemental/Futura.ttc",
]

wordmark_font = None
for fp in font_paths:
    if os.path.exists(fp):
        try:
            wordmark_font = ImageFont.truetype(fp, 26)
            break
        except Exception:
            continue

if wordmark_font is None:
    wordmark_font = ImageFont.load_default()

ONZA = "O  N  Z  A"    # manual letter-spacing simulation
bbox = draw.textbbox((0, 0), ONZA, font=wordmark_font)
text_w = bbox[2] - bbox[0]
wordmark_x = (W - text_w) // 2
wordmark_y = int(MARK_BOTTOM_Y) + 28

draw.text((wordmark_x, wordmark_y), ONZA, fill="#FFFFFF", font=wordmark_font)

# --- Red accent line ---------------------------------------------------------
accent_y = wordmark_y + 46
accent_x0 = (W - 52) // 2
accent_x1 = accent_x0 + 52
draw.rectangle([accent_x0, accent_y, accent_x1, accent_y + 1], fill="#FF3B30")

# --- Tagline -----------------------------------------------------------------
tagline_text = "CONSULTORÍA IA PARA EMPRESAS EN LATAM"

tagline_font = None
for fp in font_paths:
    if os.path.exists(fp):
        try:
            tagline_font = ImageFont.truetype(fp, 13)
            break
        except Exception:
            continue

if tagline_font is None:
    tagline_font = ImageFont.load_default()

bbox2 = draw.textbbox((0, 0), tagline_text, font=tagline_font)
tag_w = bbox2[2] - bbox2[0]
tag_x = (W - tag_w) // 2
tag_y = accent_y + 22

draw.text((tag_x, tag_y), tagline_text, fill="#969696", font=tagline_font)

# --- Export ------------------------------------------------------------------
out_path = os.path.join(os.path.dirname(__file__), "../public/og-image.jpg")
out_path = os.path.normpath(out_path)
img.save(out_path, "JPEG", quality=95)
print(f"Saved: {out_path}  ({W}x{H}px)")
