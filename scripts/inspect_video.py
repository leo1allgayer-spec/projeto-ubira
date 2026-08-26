from pathlib import Path
import sys

import av
from PIL import Image, ImageDraw


SOURCE = Path(sys.argv[1]) if len(sys.argv) > 1 else Path("assets/apresentacao/video-abertura.mp4")
OUTPUT = Path(sys.argv[2]) if len(sys.argv) > 2 else Path("tmp/video-abertura-contato.jpg")


with av.open(SOURCE) as container:
    duration = float(container.duration / av.time_base)

times = [round(duration * i / 11, 2) for i in range(12)]
thumbs = []
for second in times:
    with av.open(SOURCE) as container:
        stream = container.streams.video[0]
        container.seek(int(second * av.time_base), any_frame=False, backward=True)
        frame = next(frame for frame in container.decode(stream) if float(frame.time or 0) >= second - 0.15)
        image = frame.to_image().resize((320, 180))
        thumbs.append((second, image))

sheet = Image.new("RGB", (1280, 660), "#04121d")
draw = ImageDraw.Draw(sheet)
for index, (second, image) in enumerate(thumbs):
    x = (index % 4) * 320
    y = (index // 4) * 220
    sheet.paste(image, (x, y))
    draw.rectangle((x, y + 180, x + 320, y + 220), fill="#04121d")
    draw.text((x + 12, y + 190), f"{second:05.2f}s", fill="#f1d08b")

OUTPUT.parent.mkdir(parents=True, exist_ok=True)
sheet.save(OUTPUT, quality=92)
print(f"duration={duration:.2f}s output={OUTPUT}")
