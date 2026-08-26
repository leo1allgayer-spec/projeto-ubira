from pathlib import Path


PATH = Path("index.html")
html = PATH.read_text(encoding="utf-8")


def update_section(section_id: str, old: str, new: str) -> None:
    global html
    start = html.index(f'<section id="{section_id}"')
    end = html.index("</section>", start) + len("</section>")
    section = html[start:end]
    if old not in section:
        raise RuntimeError(f"Trecho não encontrado em #{section_id}: {old[:80]}")
    html = html[:start] + section.replace(old, new, 1) + html[end:]


html = html.replace(
    'poster="assets/apresentacao/video-abertura-poster.jpg" aria-label="Vista aérea do complexo Ametista"><source data-src="assets/apresentacao/video-abertura.mp4"',
    'poster="assets/microvideos/hero.jpg" aria-label="Vista aérea do complexo Ametista"><source data-src="assets/microvideos/hero.mp4"',
    1,
)

update_section(
    "oportunidade",
    '<div class="pillars">',
    '<figure class="section-loop"><video class="micro-loop" muted loop playsinline preload="none" poster="assets/microvideos/oportunidade.jpg" aria-label="Arquitetura e ambientes externos do complexo"><source data-src="assets/microvideos/oportunidade.mp4" type="video/mp4"></video><figcaption>Patrimônio e infraestrutura em uso, integrados no mesmo endereço.</figcaption></figure><div class="pillars">',
)

place_start = '<figure class="panorama"><img src="assets/apresentacao/espaco-regenesis-vista-aerea.jpeg" loading="lazy" width="1920" height="1080" alt="Vista aérea do complexo Ametista no topo da montanha em Mury, cercado pela Mata Atlântica."></figure>'
update_section(
    "lugar",
    place_start,
    '<figure class="panorama video-panorama"><video class="micro-loop" muted loop playsinline preload="none" poster="assets/microvideos/lugar.jpg" aria-label="Caminhos, jardins e paisagem do complexo"><source data-src="assets/microvideos/lugar.mp4" type="video/mp4"></video><figcaption>A paisagem e os caminhos internos conduzem a experiência pelo complexo.</figcaption></figure>',
)

update_section(
    "regenesis",
    '<div class="media-story">',
    '<figure class="section-loop"><video class="micro-loop" muted loop playsinline preload="none" poster="assets/microvideos/regenesis.jpg" aria-label="Restaurante e piano preparados para receber grupos"><source data-src="assets/microvideos/regenesis.mp4" type="video/mp4"></video><figcaption>Ambientes preparados para convivência, gastronomia e programação de grupos.</figcaption></figure><div class="media-story">',
)

emagre_photo = '<figure class="feature-photo"><img src="assets/dossie-real/tratamento-spa.jpg" loading="lazy" alt="Profissional realiza tratamento corporal em uma sala do Emagre Spa."></figure>'
update_section(
    "emagre",
    emagre_photo,
    '<figure class="feature-photo video-feature"><video class="micro-loop" muted loop playsinline preload="none" poster="assets/microvideos/emagre.jpg" aria-label="Alimentação, movimento e atividades do Emagre Spa"><source data-src="assets/microvideos/emagre.mp4" type="video/mp4"></video><figcaption>Alimentação e movimento fazem parte da jornada de bem-estar.</figcaption></figure>',
)

update_section(
    "infraestrutura",
    '<div class="acts">',
    '<figure class="section-loop"><video class="micro-loop" muted loop playsinline preload="none" poster="assets/microvideos/infraestrutura.jpg" aria-label="Água, jardins e infraestrutura integrada à paisagem"><source data-src="assets/microvideos/infraestrutura.mp4" type="video/mp4"></video><figcaption>Água, paisagismo e sistemas próprios compõem a infraestrutura instalada.</figcaption></figure><div class="acts">',
)

update_section(
    "valor",
    '<blockquote>',
    '<figure class="section-loop compact-loop"><video class="micro-loop" muted loop playsinline preload="none" poster="assets/microvideos/valor.jpg" aria-label="Vista aérea do patrimônio e das edificações"><source data-src="assets/microvideos/valor.mp4" type="video/mp4"></video><figcaption>Escala patrimonial e edificações já incorporadas ao complexo.</figcaption></figure><blockquote>',
)

continuity_image = '<img class="contained" src="assets/data-room/imovel/ampliacao-15-suites-02.jpeg" loading="lazy" alt="Projeto aprovado para ampliação de 15 suítes">'
update_section(
    "continuidade",
    continuity_image,
    '<figure class="continuity-media"><video class="micro-loop" muted loop playsinline preload="none" poster="assets/microvideos/continuidade.jpg" aria-label="Unidades de hospedagem e estrutura existente"><source data-src="assets/microvideos/continuidade.mp4" type="video/mp4"></video><img class="project-thumb" src="assets/data-room/imovel/ampliacao-15-suites-02.jpeg" loading="lazy" alt="Projeto aprovado para ampliação de 15 suítes"><figcaption>Estrutura existente e projeto aprovado sustentam o próximo ciclo.</figcaption></figure>',
)

closing_image = '<img src="assets/apresentacao/complexo-noturno.jpeg" loading="lazy" alt="Vista aérea noturna do complexo Ametista em Mury">'
update_section(
    "contato",
    closing_image,
    '<video class="micro-loop closing-loop" muted loop playsinline preload="none" poster="assets/microvideos/encerramento.jpg" aria-label="Vista aérea de afastamento do complexo Ametista"><source data-src="assets/microvideos/encerramento.mp4" type="video/mp4"></video>',
)

html = html.replace('v3.css?v=20260824-3', 'v3.css?v=20260826-1')
html = html.replace('v3.js?v=20260824-2', 'v3.js?v=20260826-1')
PATH.write_text(html, encoding="utf-8")
