# Imágenes Open Graph

`cobrador.html` es la fuente de `public/og/cobrador.jpg` (1200×630, la vista
previa de onzaai.com/cobrador en WhatsApp y LinkedIn). Para regenerarla:

```bash
CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CH" --headless=new --hide-scrollbars --force-device-scale-factor=1 \
  --window-size=1200,630 --virtual-time-budget=8000 \
  --screenshot=/tmp/og.png "file://$PWD/scripts/og/cobrador.html"
sips -s format jpeg -s formatOptions 88 /tmp/og.png --out public/og/cobrador.jpg
```

WhatsApp guarda la vista previa de cada URL en caché: si la imagen cambia
después de compartir el enlace, cambia también el nombre del archivo.
