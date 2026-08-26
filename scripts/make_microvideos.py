from pathlib import Path
from fractions import Fraction

import av


JOBS = [
    ("assets/apresentacao/video-abertura.mp4", "hero", 0, 10),
    ("assets/apresentacao/video-abertura.mp4", "oportunidade", 12, 19),
    ("assets/apresentacao/video-abertura.mp4", "lugar", 22, 30),
    ("assets/apresentacao/video-abertura.mp4", "regenesis", 47, 55),
    ("assets/videos/emagre-experiencia-completa.mp4", "emagre", 20, 28),
    ("assets/apresentacao/video-abertura.mp4", "infraestrutura", 31, 39),
    ("assets/apresentacao/video-abertura.mp4", "valor", 80, 86),
    ("assets/apresentacao/video-abertura.mp4", "continuidade", 64, 72),
    ("assets/apresentacao/video-abertura.mp4", "encerramento", 84, 90),
]

OUTPUT = Path("assets/microvideos")
OUTPUT.mkdir(parents=True, exist_ok=True)


def make_clip(source_path: str, name: str, start: float, end: float) -> None:
    source = av.open(source_path)
    input_stream = source.streams.video[0]
    fps = float(input_stream.average_rate or 30)
    width = input_stream.codec_context.width
    height = input_stream.codec_context.height

    target_path = OUTPUT / f"{name}.mp4"
    target = av.open(target_path, "w")
    output_stream = target.add_stream("libx264", rate=round(fps))
    output_stream.width = width
    output_stream.height = height
    output_stream.pix_fmt = "yuv420p"
    output_stream.options = {"crf": "24", "preset": "medium", "movflags": "+faststart"}

    source.seek(int(start * av.time_base), any_frame=False, backward=True)
    first_image = None
    encoded = 0
    for frame in source.decode(input_stream):
        timestamp = float(frame.time or 0)
        if timestamp < start:
            continue
        if timestamp >= end:
            break
        if first_image is None:
            first_image = frame.to_image()
        frame.pts = encoded
        frame.time_base = Fraction(1, round(fps))
        for packet in output_stream.encode(frame):
            target.mux(packet)
        encoded += 1

    for packet in output_stream.encode():
        target.mux(packet)
    target.close()
    source.close()

    if first_image is not None:
        first_image.save(OUTPUT / f"{name}.jpg", quality=88, optimize=True)
    print(f"{name}: {start:.0f}-{end:.0f}s -> {target_path}")


for job in JOBS:
    make_clip(*job)
