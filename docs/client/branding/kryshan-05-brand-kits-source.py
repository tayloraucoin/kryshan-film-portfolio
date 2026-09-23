import base64, io, json, math
from PIL import Image
from color import ramp, contrast, hex_to_oklch, oklch_to_hex, rgb_to_oklab, oklab_to_rgb, hex_to_rgb, linear_to_srgb, rgb_to_hex

F="/home/claude/kr/fonts/"
def b64file(p, mime):
    return "data:%s;base64,%s"%(mime, base64.b64encode(open(p,'rb').read()).decode())
def img64(path, w=1100, q=82):
    im=Image.open(path).convert("RGB"); im.thumbnail((w, w))
    b=io.BytesIO(); im.save(b,"JPEG",quality=q); return "data:image/jpeg;base64,"+base64.b64encode(b.getvalue()).decode()
P="/home/claude/kr/project-images/kryshan-project-images/"
IMG={
 "jack":img64(P+"a3105e7f-330f-4361-b01b-9518f3f6617d.png"),
 "jwu":img64(P+"45a6a4ad-a5ec-4768-851d-465598103395.png"),
 "rhythms":img64(P+"deb60ac4-23c1-49dd-bade-7fa4b3d61c3d.png"),
 "contact":img64(P+"e327fd45-a415-41dd-9db3-393dc87c5296.png",700),
 "dare":img64(P+"363d45d0-fab2-4597-9483-d205e29e306d.png",700),
 "block":img64(P+"503f3117-7705-4217-aba0-5cd3486a2650.png",700),
 "born":img64(P+"9fecb5eb-37b2-4859-882e-727874ae904c.png",700),
 "tuts":img64(P+"0e8ab70a-ef05-4c1a-a631-b589ec166e12.png",700),
 "shot":img64(P+"de65baa7-bd8b-4334-9b8c-2bc225ddeffc.png",700),
 "wolf":img64(P+"73ccb381-a2e7-45e8-b455-17f1fd338949.png",700),
}
def neutral_ramp(light_hex, dark_hex):
    # interpolate in OKLab between light (50) and dark (950)
    L1=rgb_to_oklab(*hex_to_rgb(light_hex)); L2=rgb_to_oklab(*hex_to_rgb(dark_hex))
    steps=[50,100,200,300,400,500,600,700,800,900,950]
    ts=[0,0.06,0.16,0.30,0.44,0.56,0.66,0.75,0.84,0.92,1.0]
    out={}
    for s,t in zip(steps,ts):
        lab=[L1[i]+(L2[i]-L1[i])*t for i in range(3)]
        r,g,b=oklab_to_rgb(*lab)
        out[s]=rgb_to_hex(*[linear_to_srgb(x)*255 for x in (r,g,b)])
    out[50]=light_hex.lower(); out[950]=dark_hex.lower()
    return out

FONTFACE = """
@font-face{font-family:'Archivo';src:url(%s) format('truetype');font-weight:100 900;font-stretch:62%% 125%%;}
@font-face{font-family:'Archivo';src:url(%s) format('truetype');font-weight:100 900;font-stretch:62%% 125%%;font-style:italic;}
@font-face{font-family:'Space Mono';src:url(%s) format('truetype');font-weight:400;}
@font-face{font-family:'Space Mono';src:url(%s) format('truetype');font-weight:700;}
@font-face{font-family:'Work Sans';src:url(%s) format('truetype');font-weight:100 900;}
@font-face{font-family:'Work Sans';src:url(%s) format('truetype');font-weight:100 900;font-style:italic;}
@font-face{font-family:'Fraunces';src:url(%s) format('truetype');font-weight:100 900;}
@font-face{font-family:'Fraunces';src:url(%s) format('truetype');font-weight:100 900;font-style:italic;}
@font-face{font-family:'Chivo';src:url(%s) format('truetype');font-weight:100 900;}
@font-face{font-family:'Chivo';src:url(%s) format('truetype');font-weight:100 900;font-style:italic;}
@font-face{font-family:'Newsreader';src:url(%s) format('truetype');font-weight:200 800;}
@font-face{font-family:'Newsreader';src:url(%s) format('truetype');font-weight:200 800;font-style:italic;}
""" % tuple(b64file(F+f,"font/ttf") for f in [
 "Archivo[wdth,wght].ttf","Archivo-Italic[wdth,wght].ttf","SpaceMono-Regular.ttf","SpaceMono-Bold.ttf",
 "WorkSans[wght].ttf","WorkSans-Italic[wght].ttf","Fraunces[SOFT,WONK,opsz,wght].ttf","Fraunces-Italic[SOFT,WONK,opsz,wght].ttf",
 "Chivo[wght].ttf","Chivo-Italic[wght].ttf","Newsreader[opsz,wght].ttf","Newsreader-Italic[opsz,wght].ttf"])

BASECSS = """
*{box-sizing:border-box;margin:0;padding:0}
@page{size:297mm 210mm;margin:0}
html,body{width:297mm}
.page{width:297mm;height:210mm;page-break-after:always;overflow:hidden;position:relative;padding:14mm 16mm 12mm}
.page:last-child{page-break-after:auto}
.meta{position:absolute;bottom:7mm;left:16mm;right:16mm;font-size:8pt;letter-spacing:.06em;text-transform:uppercase;display:flex;justify-content:space-between;opacity:.6}
.h{font-size:9pt;letter-spacing:.14em;text-transform:uppercase;margin-bottom:6mm;opacity:.7}
.grid{display:grid;gap:6mm}
.small{font-size:8.5pt;line-height:1.45}
.tiny{font-size:7.5pt;line-height:1.4;opacity:.75}
table{border-collapse:collapse;width:100%}
td,th{text-align:left;vertical-align:top;padding:1.6mm 2mm;font-size:8.5pt;line-height:1.4}
th{font-weight:600;font-size:8pt;letter-spacing:.06em;text-transform:uppercase;opacity:.75}
.sw{height:14mm;display:flex;align-items:flex-end;padding:1.5mm;font-size:6.5pt;font-family:'Space Mono',monospace;border-radius:1mm}
.ramp{display:grid;grid-template-columns:repeat(11,1fr);gap:1mm;margin-bottom:3mm}
.ramp10{grid-template-columns:repeat(10,1fr)}
.pill{display:inline-block;border:1px solid currentColor;border-radius:99px;padding:.4mm 2.2mm;font-size:7pt;letter-spacing:.06em;text-transform:uppercase;margin-right:1mm}
.thumb{position:relative;aspect-ratio:16/9;overflow:hidden;background:#000}
.thumb img{width:100%;height:100%;object-fit:cover;display:block}
.thumb .t{position:absolute;left:0;right:0;bottom:0;padding:2.5mm 3mm;font-size:8.5pt}
.frame{position:absolute;inset:0;pointer-events:none}
"""

def page(kit, body, title, num, extra_style=""):
    return f"""<section class="page" style="background:{kit['ground']};color:{kit['text']};font-family:{kit['body_font']};{extra_style}">
{body}
<div class="meta"><span>Kryshan Randel · Brand kit {kit['letter']} · {kit['name']}</span><span>{title} · {num}</span></div></section>"""

def swatches(r, steps, text_dark, text_light, cols=None):
    cols = cols or f"repeat({len(steps)},1fr)"
    cells=""
    for s in steps:
        h=r[s]; tc = text_dark if contrast(h,text_dark)>=contrast(h,text_light) else text_light
        cells+=f'<div class="sw" style="background:{h};color:{tc}"><span>{s}<br>{h.upper()}</span></div>'
    return f'<div class="ramp" style="grid-template-columns:{cols}">{cells}</div>'

def aa(c):
    return ("AAA" if c>=7 else "AA" if c>=4.5 else "AA large" if c>=3 else "fail")

def kit_pages(k):
    pages=[]
    # ---- 1. Cover / pillar card
    card=k['card']
    pillars="".join(f'<div style="margin-bottom:4mm"><div style="font-size:16pt;font-weight:700;{k["display_css"]}">{i+1}. {p[0]}{" <span style=\'opacity:.55;font-size:9pt;font-weight:400;letter-spacing:.1em\'>DOMINANT</span>" if i==0 else ""}</div><div class="small" style="opacity:.85">{p[1]}<br><span class="tiny">Supporting: {p[2]}</span></div></div>' for i,p in enumerate(card['pillars']))
    body=f"""
<div style="display:grid;grid-template-columns:1.15fr 1fr;gap:14mm;height:100%">
 <div>
  <div class="h">Kit {k['letter']} · {k['name']}</div>
  <div style="{k['wordmark_css']};font-size:54pt;line-height:.95;color:{k['accent']};margin-bottom:6mm">{k['wordmark']}</div>
  <div style="font-size:13pt;line-height:1.35;max-width:120mm;margin-bottom:8mm">{k['tagline']}</div>
  <div class="small" style="max-width:125mm;opacity:.85">{k['thesis']}</div>
  <div style="margin-top:8mm" class="small"><span class="pill">{k['pill1']}</span><span class="pill">{k['pill2']}</span><span class="pill">{k['pill3']}</span></div>
 </div>
 <div style="border-left:1px solid {k['line']};padding-left:10mm">
  <div class="h">Pillar card</div>
  <div style="font-size:11pt;margin-bottom:5mm;line-height:1.4"><b>Essence.</b> {card['essence']}</div>
  {pillars}
  <div class="small" style="margin-top:2mm"><b>Overlaps.</b> Wicked ∩ Generous: <i>safe enough to go dark</i> · Generous ∩ Resourceful: <i>makes the most of everyone</i> · Wicked ∩ Resourceful: <i>slick on a shoestring</i></div>
  <div class="small" style="margin-top:3mm"><b>Tie-break.</b> {card['tiebreak']}</div>
 </div>
</div>"""
    pages.append(page(k, body, "Pillars", 1))
    # ---- 2. Palette
    ramps_html=""
    for name,r,note in k['ramps']:
        steps=sorted(r.keys())
        ramps_html+=f'<div style="margin-bottom:4mm"><div class="small" style="margin-bottom:1.5mm"><b>{name}</b> <span class="tiny">— {note}</span></div>{swatches(r,steps,"#111111","#F4F4F4")}</div>'
    roles="".join(f'<tr><td style="width:12mm;padding-top:2mm"><span style="display:inline-block;width:7mm;height:7mm;border-radius:1mm;background:{h.split(" / ")[0]};border:1px solid {k["line"]}"></span>{("<span style=\"display:inline-block;width:7mm;height:7mm;border-radius:1mm;margin-left:1mm;background:"+h.split(" / ")[1]+";border:1px solid "+k["line"]+"\"></span>") if " / " in h else ""}</td><td style="width:30mm"><b>{n}</b><br><span class="tiny" style="font-family:Space Mono,monospace">{h.upper()}</span></td><td class="small">{u}</td></tr>' for n,h,u in k['roles'])
    pairs="".join(f'<tr><td><span style="background:{g};color:{t};padding:1mm 2mm;border-radius:1mm;font-size:{sz}">{lbl}</span></td><td class="tiny">{t.upper()} on {g.upper()}</td><td><b>{contrast(t,g):.1f}:1</b> · {aa(contrast(t,g))}</td></tr>' for lbl,t,g,sz in k['pairs'])
    body=f"""
<div class="h">Colour · ramps, roles, contrast</div>
<div style="display:grid;grid-template-columns:1.2fr 1fr;gap:12mm">
 <div>{ramps_html}<div class="tiny" style="margin-bottom:5mm">Ramps are built in OKLCH: constant hue, chroma tapering toward the ends, 500 is the exact brand colour. Neutral ramps run 50 (text) to 950 (ground) and are interpolated between the two real endpoints so they never drift.</div>
  <div class="small" style="margin:0 0 2mm"><b>Contrast at real sizes</b> (WCAG 2.2)</div>
  <table><tr><th>Sample</th><th>Pair</th><th>Ratio</th></tr>{pairs}</table>
  <div class="tiny" style="margin-top:2mm">{k['contrast_note']}</div>
 </div>
 <div>
  <div class="small" style="margin-bottom:2mm"><b>Roles</b> — what each colour is for</div>
  <table>{roles}</table>
 </div>
</div>"""
    pages.append(page(k, body, "Colour", 2))
    # ---- 3. Type
    scale="".join(f'<tr><td class="tiny" style="width:22mm">{n}</td><td style="{css};white-space:nowrap;overflow:hidden">{sample}</td><td class="tiny" style="width:36mm">{spec}</td></tr>' for n,css,sample,spec in k['scale'])
    body=f"""
<div class="h">Typography</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:12mm">
 <div>
  <div style="{k['wordmark_css']};font-size:40pt;line-height:1;color:{k['accent']};margin-bottom:3mm">Kryshan Randel</div>
  <div style="{k['nav_css']};margin-bottom:8mm">Work &nbsp;&nbsp; About &nbsp;&nbsp; Teaching &nbsp;&nbsp; Contact</div>
  <table>{scale}</table>
 </div>
 <div>
  <div class="small" style="margin-bottom:3mm"><b>Pairing</b></div>
  <table>{"".join(f"<tr><td style='width:30mm'><b>{a}</b></td><td>{b}</td></tr>" for a,b in k['pairing'])}</table>
  <div class="small" style="margin:6mm 0 2mm"><b>His bio at body size</b> (the first 90 words, as it would set)</div>
  <div style="{k['body_css']};font-size:9.5pt;line-height:1.55;max-width:118mm;opacity:.92">Born and raised in BC, I've been making films for as long as I can remember. My career started with producing two fast film contests, The 24 Hour Film Contest and The Great Canadian Commercial Contest. Through these events, I met many of my favourite collaborators and started making short films on weekends with them. I directed two horror shorts for the Bloodshots Film Festival, Jack and The Bully Solution. They won the Audience Choice Award and Grand Jury Prize…</div>
  <div style="margin-top:5mm;{k['quote_css']}">“{k['quote']}”</div>
  <div class="tiny" style="margin-top:1mm">{k['quote_src']}</div>
 </div>
</div>"""
    pages.append(page(k, body, "Type", 3))
    # ---- 4. Voice
    v=k['voice']
    body=f"""
<div class="h">Voice · the same three demo strings in every kit, then this kit's site lines</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:12mm">
 <div>
  <div class="tiny" style="margin-bottom:1mm">Title</div>
  <div style="{k['wordmark_css']};font-size:34pt;line-height:1;color:{k['accent']}">Kryshan Randel</div>
  <div class="tiny" style="margin:4mm 0 1mm">Subtitle</div>
  <div style="{k['nav_css']};font-size:10pt">Director · Camera Operator · Editor · Film Instructor</div>
  <div class="tiny" style="margin:4mm 0 1mm">Body (his throughline, verbatim)</div>
  <div style="{k['body_css']};font-size:10pt;line-height:1.5;max-width:120mm">I am a storyteller, and specialize in bringing unique stories to life. Whether shooting, editing or directing, I can work within any genre, mood, emotional experience and/or time/budget parameters to deliver something cinematic, riveting and a tale well told.</div>
  <div style="margin-top:7mm;padding:5mm;border:1px solid {k['line']}">
   <div class="tiny" style="margin-bottom:2mm">Voice dial for this kit</div>
   <div class="small">{v['dial']}</div>
  </div>
 </div>
 <div>
  <div class="tiny" style="margin-bottom:1mm">Home hero, H1</div>
  <div style="{k['h1_css']};margin-bottom:1.5mm">{v['h1']}</div>
  <div class="small" style="opacity:.8;margin-bottom:5mm">{v['support']}</div>
  <div class="tiny" style="margin-bottom:1mm">Work section header</div>
  <div style="{k['h2_css']};margin-bottom:4mm">{v['work']}</div>
  <div class="tiny" style="margin-bottom:1mm">About opener</div>
  <div style="{k['body_css']};font-size:10pt;line-height:1.5;margin-bottom:4mm;max-width:120mm">{v['about']}</div>
  <div class="tiny" style="margin-bottom:1mm">Contact line</div>
  <div style="{k['body_css']};font-size:10pt;margin-bottom:4mm">{v['contact']}</div>
  <div class="tiny" style="margin-bottom:1mm">One thumbnail caption</div>
  <div class="small" style="{k['caption_css']}">{v['caption']}</div>
  <div class="tiny" style="margin-top:5mm">All lines marked draft in 03 §8; facts subject to 02 §13. The joke is the last word or there is no joke.</div>
 </div>
</div>"""
    pages.append(page(k, body, "Voice", 4))
    # ---- 5. Media + chrome + motion + never
    thumbs="".join(f'<div class="thumb" style="{k["thumb_css"]}"><img src="{IMG[i]}"><div class="t" style="{k["thumb_t_css"]}">{t}</div></div>' for i,t in k['thumbs'])
    body=f"""
<div class="h">Media, chrome, motion</div>
<div style="display:grid;grid-template-columns:1.35fr 1fr;gap:10mm">
 <div>
  <div style="{k['nav_bar_css']};display:flex;justify-content:space-between;align-items:center;padding:3mm 4mm;margin-bottom:0">
   <span style="{k['wordmark_css']};font-size:14pt;color:{k['accent']}">Kryshan Randel</span>
   <span style="{k['nav_css']};font-size:8pt">Work &nbsp;&nbsp; About &nbsp;&nbsp; Teaching &nbsp;&nbsp; Contact</span>
  </div>
  <div class="thumb" style="aspect-ratio:2.2/1;{k['hero_css']}"><img src="{IMG[k['hero_img']]}" style="opacity:{k['hero_opacity']}">
    <div style="position:absolute;left:0;right:0;bottom:0;padding:6mm 6mm 5mm;{k['hero_grad']}">
     <div style="{k['h1_css']};font-size:20pt;line-height:1.05;max-width:120mm">{k['voice']['h1']}</div>
     <div class="small" style="margin-top:2mm;opacity:.85">{k['voice']['support']}</div>
    </div>
  </div>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:2.5mm;margin-top:2.5mm">{thumbs}</div>
  <div style="{k['footer_css']};display:flex;justify-content:space-between;padding:3mm 4mm;margin-top:2.5mm;font-size:8pt">
   <span>kryshanrandel@gmail.com · Vancouver, works anywhere</span><span style="opacity:.7">IMDb · Vimeo · YouTube · LinkedIn</span>
  </div>
 </div>
 <div>
  <div class="small" style="margin-bottom:2mm"><b>Media rules</b></div>
  <div class="small" style="opacity:.9">{k['media_rules']}</div>
  <div class="small" style="margin:5mm 0 2mm"><b>Motion</b></div>
  <div class="small" style="opacity:.9">{k['motion']}</div>
  <div class="small" style="margin:5mm 0 2mm"><b>Never</b></div>
  <div class="small" style="opacity:.9">{k['never']}</div>
  <div style="margin-top:5mm;{k['laurel_css']}">
    <div style="font-size:7pt;letter-spacing:.18em;text-transform:uppercase;opacity:.75">Grand Jury Prize</div>
    <div style="font-size:11pt;font-weight:700">Bloodshots Film Festival 2009</div>
    <div class="tiny">how a laurel sets in this kit: type, not a graphic, until real laurel files arrive</div>
  </div>
 </div>
</div>"""
    pages.append(page(k, body, "Media", 5))
    return pages

# ======================= KIT DEFINITIONS =======================
RED_A="#C81E2A"; BLACK_A="#0B0B0C"; BONE="#F1ECE4"
nA=neutral_ramp(BONE, BLACK_A)
KIT_A=dict(letter="A", name="Wicked leads · red on black", ground=BLACK_A, text=BONE, accent=RED_A, line="#2A2A2D",
 body_font="'Archivo',sans-serif", wordmark="Kryshan<br>Randel",
 wordmark_css="font-family:'Archivo';font-stretch:72%;font-weight:800;letter-spacing:-.01em;text-transform:uppercase",
 nav_css="font-family:'Archivo';font-stretch:88%;font-weight:600;font-size:9pt;letter-spacing:.18em;text-transform:uppercase",
 body_css="font-family:'Archivo';font-weight:400",
 h1_css="font-family:'Archivo';font-stretch:80%;font-weight:700;font-size:26pt;line-height:1.02;letter-spacing:-.005em",
 h2_css="font-family:'Archivo';font-stretch:72%;font-weight:800;font-size:22pt;text-transform:uppercase;letter-spacing:.01em",
 quote_css="font-family:'Archivo';font-style:italic;font-weight:500;font-size:11pt;line-height:1.4;color:"+BONE,
 caption_css="font-family:'Archivo';font-stretch:90%",
 display_css="font-family:'Archivo';font-stretch:72%;text-transform:uppercase;letter-spacing:.02em",
 tagline="A tale well told, and a good time telling it.",
 thesis="The dark room. One saturated red that belongs to him, spent on the name, the hover, the active tag and one phrase in the hero; nowhere else. Chrome quieter than the weakest frame in the grid. The professionalism is carried by precision: a single type family at several widths, a strict scale, literal roles, exact credits.",
 pill1="Dark ground", pill2="One accent", pill3="One family",
 card=dict(essence="A tale well told, and a good time telling it.",
   pillars=[("Wicked","Wicked but not nasty.","wonderfully wrong, deadpan, subversive, cinematic-dark"),
            ("Generous","Generous but not soft.","makes people better, credits everyone, safe, warm"),
            ("Resourceful","Resourceful but not scrappy.","any budget, one-person unit, slick, precise")],
   tiebreak="When the wicked choice and the safe choice conflict, wicked wins, and the chrome pays for it with precision."),
 ramps=[("Red", ramp(RED_A), "the only accent; 500 for display and the wordmark, 300–400 for small text and links on black, 700–800 for pressed states"),
        ("Bone → Ink (neutral)", nA, "50 is body text, 300 secondary text, 800 surfaces and hairlines, 950 the ground")],
 roles=[("Ground",BLACK_A,"Every page. Never pure #000; the frames need somewhere to sit."),
        ("Surface",nA[800],"Overlay backdrop, the contact card, the credits list column."),
        ("Hairline",nA[700],"Thumbnail frames at 40% opacity, dividers. Nothing heavier."),
        ("Text",BONE,"All body and titles. Warm, not white."),
        ("Secondary",nA[300],"Roles, years, captions, footer."),
        ("Accent",RED_A,"Wordmark, hover, active role tag, one phrase per page. Punctuation, never a fill."),
        ("Link / small accent",ramp(RED_A)[300],"Text-size links and focus rings; the 500 fails AA at body size on black."),
        ("Passion / For hire",nA[300]+" / "+RED_A,"The two lanes: for-hire in secondary text, passion tagged in red. The only place colour divides content.")],
 pairs=[("Body text",BONE,BLACK_A,"9.5pt"),("Secondary",nA[300],BLACK_A,"9pt"),("Red display",RED_A,BLACK_A,"16pt"),("Red small (300)",ramp(RED_A)[300],BLACK_A,"9pt"),("Text on surface",BONE,nA[800],"9.5pt"),("Ink on red (button)",BLACK_A,RED_A,"9.5pt")],
 contrast_note="Red 500 on black is AA for large text only; small red text uses the 300 step. No red fills behind text except a button with ink on it.",
 scale=[("Display / 64","font-family:'Archivo';font-stretch:72%;font-weight:800;font-size:30pt;text-transform:uppercase","Watch something.","Archivo 800, width 72, tracking +1%"),
        ("H1 / 40","font-family:'Archivo';font-stretch:80%;font-weight:700;font-size:22pt","Hard to look away from","Archivo 700, width 80, leading 1.02"),
        ("H2 / 28","font-family:'Archivo';font-stretch:88%;font-weight:600;font-size:16pt","Directing · Camera · Editing","Archivo 600, width 88"),
        ("Lead / 20","font-family:'Archivo';font-weight:400;font-size:12pt","Vancouver-based. Works anywhere.","Archivo 400, leading 1.4"),
        ("Body / 16","font-family:'Archivo';font-weight:400;font-size:9.5pt","Written, shot and cut in 48 hours.","Archivo 400, leading 1.55, max 68ch"),
        ("Caption / 13","font-family:'Archivo';font-stretch:90%;font-weight:500;font-size:8pt;letter-spacing:.02em","2009 · Director · Bloodshots Film Festival","Archivo 500, width 90"),
        ("Label / 11","font-family:'Archivo';font-stretch:88%;font-weight:600;font-size:7.5pt;letter-spacing:.18em;text-transform:uppercase","PASSION PROJECT","Archivo 600, width 88, tracking 18%")],
 pairing=[("Archivo (variable)","One family across the site. Width 72–80 for the wordmark and headings (the condensed voice of Sanders, mjz, Corkle); width 100 for body; italic for the rare quote. SIL Open Font License."),
          ("Why one family","Card A's guardrail is 'resourceful but not scrappy' and 'wicked but not nasty': a single family with real range reads as control. A second face would be decoration."),
          ("Not used","No serif, no mono, no display face. Personality is in colour and in the words.")],
 quote="Wonderfully wrong.", quote_src="Ain't It Cool News, on The Bully Solution — press quotes set in the italic, never in red.",
 voice=dict(dial="Driest of the three. Short lines. The joke lands last and is never flagged. Numbers instead of adjectives. One accent phrase per page, and it is the sharpest phrase on the page.",
   h1='I direct, shoot and edit stories that are <span style="color:'+RED_A+'">hard to look away from.</span>',
   support="Kryshan Randel. Director, camera operator, editor, and film instructor. Vancouver, works anywhere.",
   work="Watch something.",
   about="Born and raised in BC, I've been making films for as long as I can remember. Most of my shorts are about how quickly a mind turns against itself under pressure. Most of my paid work is about making other people look good. I like both.",
   contact="No agent, no form, no waiting. kryshanrandel@gmail.com",
   caption="<b>Jack</b> (2009) · Director · Written, shot and cut in 48 hours. Grand Jury Prize and Best Death, Bloodshots."),
 thumbs=[("jack","<b>Jack</b> · 2009 · Director"),("contact","<b>Contact Club</b> · 2020 · Director, co-writer"),("dare","<b>Dare</b> · 2025 · Co-director, camera, co-editor")],
 hero_img="jack", hero_opacity=".78", hero_css="border:1px solid #232326",
 hero_grad="background:linear-gradient(to top, rgba(11,11,12,.92), rgba(11,11,12,0))",
 thumb_css="border:1px solid rgba(155,149,141,.35)", thumb_t_css="background:linear-gradient(to top, rgba(11,11,12,.9), rgba(11,11,12,0));color:"+BONE,
 nav_bar_css="background:"+BLACK_A+";border-bottom:1px solid #232326", footer_css="background:"+BLACK_A+";border-top:1px solid #232326;color:"+nA[300],
 media_rules="Native 16:9, never cropped. Hairline frame at 40% so night frames have an edge. Title over the thumbnail, one line on hover, the rest one level down. Poster frames chosen for tone, not gore: Jack's house, not the pumpkin. No photos under videos. Vertical work at native ratio between 16:9 pieces. BTS photos on About only, two or three, collaborators named.",
 motion="The expand-to-play is the one deliberate moment: it grows from where it was tapped and closes the same way. Hover reveals fade in 120 ms. Nothing loops, nothing parallaxes, nothing loads until asked. Reduced motion: instant states, same layout.",
 never="Pure white. A second accent. Red as a background. A gradient anywhere but the thumbnail scrim. A display face. Photos under videos. Festival lists longer than two. An exclamation mark.",
 laurel_css="border:1px solid "+nA[700]+";padding:4mm;color:"+BONE,
)

RED_B="#C9352E"; CREAM="#E9E4D8"; INK="#16140F"
nB=neutral_ramp(CREAM, INK)
KIT_B=dict(letter="B", name="Generous leads · red on warm cream", ground=CREAM, text=INK, accent=RED_B, line="#C9C3B5",
 body_font="'Work Sans',sans-serif", wordmark="Kryshan<br>Randel",
 wordmark_css="font-family:'Space Mono';font-weight:700;letter-spacing:-.02em",
 nav_css="font-family:'Space Mono';font-weight:400;font-size:9pt;letter-spacing:.02em",
 body_css="font-family:'Work Sans';font-weight:400",
 h1_css="font-family:'Work Sans';font-weight:500;font-size:26pt;line-height:1.08;letter-spacing:-.01em",
 h2_css="font-family:'Space Mono';font-weight:700;font-size:18pt",
 quote_css="font-family:'Fraunces';font-style:italic;font-weight:400;font-size:13pt;line-height:1.35;color:"+INK,
 caption_css="font-family:'Space Mono';font-size:8pt",
 display_css="font-family:'Space Mono';",
 tagline="A tale well told, and a good time telling it.",
 thesis="The warm room. Cream instead of black, the same saturated red spent on a monospace wordmark and one phrase, a humanist body face, and an italic serif for the quotes and the Glimpse story. The edge lives in the work, not in the chrome; this is the version a cohousing board, a credit union and a nervous student trust on sight, and Jack is still Jack in the grid.",
 pill1="Warm cream ground", pill2="Mono wordmark", pill3="Serif for quotes",
 card=dict(essence="A tale well told, and a good time telling it.",
   pillars=[("Generous","Generous but not sentimental.","makes people better, safe, warm, second family"),
            ("Wicked","Wicked but not alarming.","wonderfully wrong, deadpan, the grin in the thumbnail"),
            ("Resourceful","Resourceful but not cheap.","any budget, one-person unit, twenty-seven years")],
   tiebreak="When warmth and edge conflict, warmth wins; the edge lives in the work, not in the chrome."),
 ramps=[("Red", ramp(RED_B), "the only accent; 500 for the wordmark, headings and links on cream; 600–700 for hover and pressed"),
        ("Cream → Ink (neutral)", nB, "50 is the ground, 200 surfaces, 500 secondary text, 950 body text and the grid's dark cards")],
 roles=[("Ground",CREAM,"Every page. Warm, slightly yellow; never grey."),
        ("Surface",nB[200],"Cards, the contact block, hover washes."),
        ("Dark surface",nB[900],"The work grid sits on this so night frames don't punch holes in the cream."),
        ("Text",INK,"Body and titles."),
        ("Secondary",nB[500],"Roles, years, captions."),
        ("Accent",RED_B,"Wordmark, one phrase per page, links, active tag."),
        ("Quote ink",nB[800],"The italic serif runs slightly softer than body."),
        ("Passion / For hire",RED_B+" / "+nB[500],"Passion tagged in red mono; for-hire in secondary. Same rule as A, warmer ground.")],
 pairs=[("Body text",INK,CREAM,"9.5pt"),("Secondary",nB[500],CREAM,"9pt"),("Red on cream",RED_B,CREAM,"12pt"),("Red small",RED_B,CREAM,"9pt"),("Cream on dark surface",CREAM,nB[900],"9.5pt"),("Cream on red (button)",CREAM,RED_B,"9.5pt")],
 contrast_note="Red 500 on cream passes AA at body size, so red links are allowed here. The grid's dark cards use cream text.",
 scale=[("Display / 64","font-family:'Space Mono';font-weight:700;font-size:26pt;letter-spacing:-.02em","Watch something.","Space Mono Bold, tracking −2%"),
        ("H1 / 40","font-family:'Work Sans';font-weight:500;font-size:22pt;letter-spacing:-.01em","A good time telling it","Work Sans 500, leading 1.08"),
        ("H2 / 28","font-family:'Space Mono';font-weight:700;font-size:15pt","Directing · Camera · Editing","Space Mono Bold"),
        ("Lead / 20","font-family:'Work Sans';font-weight:400;font-size:12pt","Vancouver-based. Works anywhere.","Work Sans 400, leading 1.4"),
        ("Body / 17","font-family:'Work Sans';font-weight:400;font-size:9.5pt","Written, shot and cut in 48 hours.","Work Sans 400, leading 1.6, max 66ch"),
        ("Quote / 22","font-family:'Fraunces';font-style:italic;font-size:12pt","“Hysterically mean.”","Fraunces Italic, opsz 22"),
        ("Caption / 13","font-family:'Space Mono';font-size:7.5pt","2009 · Director · Bloodshots","Space Mono Regular"),
        ("Label / 11","font-family:'Space Mono';font-size:7pt;letter-spacing:.08em;text-transform:uppercase","PASSION PROJECT","Space Mono, tracking 8%")],
 pairing=[("Space Mono","Wordmark, section headers, nav, captions. The wry, editorial face of Betancourt and Petros; it reads as 'written by a person' on cream. SIL OFL."),
          ("Work Sans","Body and H1. A humanist grotesk with a warm rhythm and real weight range; his 460-word bio sets comfortably. SIL OFL."),
          ("Fraunces Italic","Press quotes and the Glimpse anecdote only (Corkle's pattern). Never for UI. SIL OFL.")],
 quote="Hysterically mean.", quote_src="Mitch Davis, Fantasia Film Festival, on The Bully Solution — press quotes in Fraunces italic beneath the film they concern.",
 voice=dict(dial="Warmest of the three. One more sentence of him per page. The joke still lands last, but the sentence before it is kinder. The teaching page and the community clients get the same care as the PSAs.",
   h1='Twenty-seven years of stories, and <span style="color:'+RED_B+'">a good time telling them.</span>',
   support="Kryshan Randel. Director, camera operator, editor, and film instructor. Vancouver, works anywhere.",
   work="Watch something. Then say hello.",
   about="Born and raised in BC, I've been making films for as long as I can remember. I met most of my favourite collaborators running two fast-film contests in my twenties, and I've been making things with them on weekends ever since. When an actor's audition is better than my script, I rewrite the script.",
   contact="No agent, no form. Email me and I'll write back. kryshanrandel@gmail.com",
   caption="<b>5Rhythms</b> (2025) · Camera, editor · A dance practice I've been part of since 2013, filmed from inside it."),
 thumbs=[("rhythms","<b>5Rhythms</b> · 2025 · Camera, editor"),("block","<b>Just Up The Block</b> · 2025 · Director, camera, editor"),("born","<b>Born To Be</b> · 2023 · Director, camera, co-editor")],
 hero_img="rhythms", hero_opacity="1", hero_css="border:1px solid "+nB[300]+";box-shadow:0 2mm 6mm rgba(22,20,15,.12)",
 hero_grad="background:linear-gradient(to top, rgba(22,20,15,.88), rgba(22,20,15,0));color:"+CREAM,
 thumb_css="border:1px solid "+nB[300]+";box-shadow:0 1mm 3mm rgba(22,20,15,.12)", thumb_t_css="background:linear-gradient(to top, rgba(22,20,15,.88), rgba(22,20,15,0));color:"+CREAM,
 nav_bar_css="background:"+CREAM+";border-bottom:1px solid "+nB[300], footer_css="background:"+CREAM+";border-top:1px solid "+nB[300]+";color:"+nB[600],
 media_rules="Native 16:9 with a slightly heavier frame and a soft shadow so dark frames sit on the cream instead of punching through it. The grid itself may sit on the dark surface (900). Titles over thumbnails; hover washes toward cream with the title (Roper). The Film strip may scroll horizontally (Betancourt) with an 'info' toggle. A portrait of him on About, and three or four BTS photos with collaborators named. Press quotes under the film they are about.",
 motion="The player is the one moment: a lightbox over the dimmed cream, or a horizontal strip that scrolls. Hover washes fade in 150 ms. Nothing loops. Reduced motion: instant states.",
 never="Pure white or cool grey. Red as a fill. A second accent. Gradients outside the thumbnail scrim. Marketing headlines. Photos under videos. Festival lists longer than two. An exclamation mark.",
 laurel_css="border:1px solid "+nB[400]+";padding:4mm;color:"+INK,
)

GREEN="#35C27A"; AMBER="#E2A63A"; NB="#0C0E0D"; MIST="#ECEFEA"
nC=neutral_ramp(MIST, NB)
ROLE_R="#E0473F"; ROLE_B="#4C8DFF"
KIT_C=dict(letter="C", name="Resourceful leads · green and amber on near-black", ground=NB, text=MIST, accent=GREEN, line="#262A28",
 body_font="'Chivo',sans-serif", wordmark="Kryshan<br>Randel",
 wordmark_css="font-family:'Chivo';font-weight:900;letter-spacing:-.02em",
 nav_css="font-family:'Chivo';font-weight:500;font-size:8.5pt;letter-spacing:.28em;text-transform:uppercase",
 body_css="font-family:'Chivo';font-weight:400",
 h1_css="font-family:'Chivo';font-weight:800;font-size:26pt;line-height:1.02;letter-spacing:-.015em",
 h2_css="font-family:'Chivo';font-weight:500;font-size:11pt;letter-spacing:.28em;text-transform:uppercase",
 quote_css="font-family:'Newsreader';font-style:italic;font-weight:400;font-size:13pt;line-height:1.35;color:"+MIST,
 caption_css="font-family:'Chivo';font-weight:400",
 display_css="font-family:'Chivo';letter-spacing:-.01em",
 tagline="Any story. Any budget. Told properly.",
 thesis="The craft room. Near-black, a cooled neon green (Vertigo, Airview) on phrases, tags and the wordmark, and amber (Wild at Heart, 5Rhythms) for the human moments. Wide-tracked uppercase labels, a neutral grotesk, one ghosted giant word behind the hero. The sixty-title credits list and the Leo nomination are central here, not supporting. The only kit where the three roles get colours: R, G, B.",
 pill1="Near-black ground", pill2="Green + amber", pill3="R/G/B role tags",
 card=dict(essence="Any story. Any budget. Told properly.",
   pillars=[("Resourceful","Resourceful but not utilitarian.","any genre, any budget, one-person unit, slick, precise"),
            ("Wicked","Wicked but not juvenile.","wonderfully wrong, subversive, editorial edge"),
            ("Generous","Generous but not selfless.","makes people better, credits everyone")],
   tiebreak="When craft and charm conflict, craft wins; charm is proven by the credits list, not claimed."),
 ramps=[("Green", ramp(GREEN), "the identity accent; 500 for the wordmark and accent phrases, 300 for links, 700–800 pressed"),
        ("Amber", ramp(AMBER), "the warm second; About opener, teaching, BTS captions; never beside green on the same line"),
        ("Mist → Carbon (neutral)", nC, "50 body text, 300 secondary, 800 surfaces, 950 the ground")],
 roles=[("Ground",NB,"Every page. Green-black, not blue-black."),
        ("Surface",nC[800],"Credits column, overlay backdrop, the contact block."),
        ("Ghost",nC[900],"The giant background word on the hero only (Airview)."),
        ("Text",MIST,"Body and titles. Slightly green-white."),
        ("Secondary",nC[300],"Roles, years, captions."),
        ("Accent",GREEN,"Wordmark, accent phrase, active state, the Camera tag."),
        ("Warm",AMBER,"Human moments: About opener, teaching, quotes' attribution."),
        ("Role tags",ROLE_R+" / "+GREEN+" / "+ROLE_B,"Directing / Camera / Editing. Only on the tags, only one lit at a time. The RGB idea survives only here.")],
 pairs=[("Body text",MIST,NB,"9.5pt"),("Secondary",nC[300],NB,"9pt"),("Green display",GREEN,NB,"16pt"),("Green small",GREEN,NB,"9pt"),("Amber",AMBER,NB,"9.5pt"),("Carbon on green (button)",NB,GREEN,"9.5pt")],
 contrast_note="Green and amber both pass AA at body size on the near-black. The red and blue role tags are label-size and sit at 300-level lightness for legibility.",
 scale=[("Display / 96 ghost","font-family:'Chivo';font-weight:900;font-size:30pt;color:"+nC[900]+";letter-spacing:-.03em","RANDEL","Chivo 900, ghost, one per site"),
        ("H1 / 40","font-family:'Chivo';font-weight:800;font-size:22pt;letter-spacing:-.015em","Told properly.","Chivo 800, leading 1.02"),
        ("Label / 12 wide","font-family:'Chivo';font-weight:500;font-size:8.5pt;letter-spacing:.28em;text-transform:uppercase","DIRECTING · CAMERA · EDITING","Chivo 500, tracking 28% (Airview)"),
        ("Lead / 20","font-family:'Chivo';font-weight:300;font-size:12pt","Vancouver-based. Works anywhere.","Chivo 300, leading 1.4"),
        ("Body / 16","font-family:'Chivo';font-weight:400;font-size:9.5pt","Written, shot and cut in 48 hours.","Chivo 400, leading 1.55, max 68ch"),
        ("Quote / 22","font-family:'Newsreader';font-style:italic;font-size:12pt","“Slickly-made tale.”","Newsreader Italic, opsz 22"),
        ("Credits / 13","font-family:'Chivo';font-weight:400;font-size:8pt","Sonic the Hedgehog · EPK camera operator · 2020","Chivo 400, tabular, columned")],
 pairing=[("Chivo (variable)","Everything but the quotes. Neutral, precise, designed with real weight range; wide-tracked caps for labels give the Airview register without its gear-rental coldness. SIL OFL."),
          ("Newsreader Italic","Press quotes only. SIL OFL."),
          ("Not used","No mono, no condensed. The precision is in the tracking and the grid.")],
 quote="Slickly-made tale… the gore gags are pretty awesome.", quote_src="Rue Morgue Magazine, on Jack — press quotes in Newsreader italic; attribution in amber.",
 voice=dict(dial="Most editorial of the three. The accent phrase carries the promise (any budget, one tap, twenty-seven years) and the specifics do the rest. The dark-comedy thesis gets a little more room on About. Roles are literal to the letter.",
   h1='Any story. Any budget. <span style="color:'+GREEN+'">Told properly.</span>',
   support="Kryshan Randel. Director, camera operator, editor, and film instructor. IATSE 669. Vancouver, works anywhere.",
   work="THE WORK · ONE TAP",
   about="My favourite subject is human consciousness, and my favourite theme is how quickly a mind turns against itself under pressure. Most of my shorts are about that. The other sixty-odd productions on my credits list are about making someone else's story land, on their schedule, with whatever's in the truck.",
   contact="Enquiries go to me. kryshanrandel@gmail.com",
   caption="<b>Just Watch Us</b> (2019) · Director, co-writer · For the Directors Guild of Canada. More BC directors have been hired on American shows shot here since."),
 thumbs=[("jwu","<b>Just Watch Us</b> · 2019 · <span style='color:"+ROLE_R+"'>Directing</span>"),("tuts","<b>TUTS 2025 Teaser</b> · 2025 · <span style='color:"+GREEN+"'>Camera</span>"),("wolf","<b>The Wolf of West Georgia Street</b> · 2014 · <span style='color:"+ROLE_B+"'>Editing</span>")],
 hero_img="jwu", hero_opacity=".8", hero_css="border:1px solid #232726",
 hero_grad="background:linear-gradient(to top, rgba(12,14,13,.92), rgba(12,14,13,0))",
 thumb_css="border:1px solid rgba(143,150,144,.3)", thumb_t_css="background:linear-gradient(to top, rgba(12,14,13,.9), rgba(12,14,13,0));color:"+MIST,
 nav_bar_css="background:"+NB+";border-bottom:1px solid #232726", footer_css="background:"+NB+";border-top:1px solid #232726;color:"+nC[300],
 media_rules="Native 16:9, hairline frame at 30%. The grid is a real layout so a cell can expand in place and the others reflow (McKee), with the credits reflowing around the player. Role tags in R/G/B on the caption line; only the active filter's colour is lit elsewhere. The EPK credits list is a designed, columned text block linking to IMDb. The C70 and the rigs appear in BTS photos on About.",
 motion="Expand-in-place with reflow is the one moment; 220 ms, from the tapped cell. Filter changes fade the lit colour, nothing slides. The ghost word is static. Reduced motion: instant states.",
 never="Blue-black. A third accent beyond green and amber. Green and amber on the same line. A gradient anywhere but the scrim. Gear-list copy. Photos under videos. Festival lists longer than two. An exclamation mark.",
 laurel_css="border:1px solid "+nC[700]+";padding:4mm;color:"+MIST,
)

# ======================= DOCUMENT =======================
cover = f"""<section class="page" style="background:#111;color:#EDE9E2;font-family:'Archivo',sans-serif">
<div class="h" style="opacity:.6">Kryshan Randel · Brand kits · batch 5 · 2026-09-22</div>
<div style="font-family:'Archivo';font-stretch:72%;font-weight:800;font-size:60pt;line-height:.95;text-transform:uppercase;margin:10mm 0 8mm">Three ways<br>to be Kryshan</div>
<div style="max-width:150mm;font-size:11pt;line-height:1.5;margin-bottom:8mm">Same roots, same three pillars (Wicked, Generous, Resourceful), same essence. Each kit puts a different pillar first, and everything else follows from that choice: the ground, the accent, the type, the voice, and how the work is framed. All three are built to win. Pick the one that feels like you, then tell me what's wrong with it.</div>
<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6mm;max-width:250mm">
 <div style="background:{BLACK_A};border:1px solid #2A2A2D;padding:6mm;min-height:52mm"><div style="font-family:'Archivo';font-stretch:72%;font-weight:800;font-size:22pt;text-transform:uppercase;color:{RED_A};line-height:1">Kit A</div><div style="font-size:9.5pt;margin-top:2mm;color:{BONE}">Wicked leads. Red on black.</div><div class="tiny" style="margin-top:3mm;color:{BONE}">The dark room, one red, one family. The most cinematic; the one the press already describes.</div></div>
 <div style="background:{CREAM};border:1px solid #C9C3B5;padding:6mm;min-height:52mm;color:{INK}"><div style="font-family:'Space Mono';font-weight:700;font-size:20pt;color:{RED_B};line-height:1">Kit B</div><div style="font-size:9.5pt;margin-top:2mm;font-family:'Work Sans'">Generous leads. Red on warm cream.</div><div class="tiny" style="margin-top:3mm;font-family:'Work Sans'">The warm room. Mono wordmark, serif quotes. The easiest first impression; the edge lives in the work.</div></div>
 <div style="background:{NB};border:1px solid #262A28;padding:6mm;min-height:52mm;color:{MIST}"><div style="font-family:'Chivo';font-weight:900;font-size:22pt;color:{GREEN};line-height:1;letter-spacing:-.02em">Kit C</div><div style="font-size:9.5pt;margin-top:2mm;font-family:'Chivo'">Resourceful leads. Green and amber on near-black.</div><div class="tiny" style="margin-top:3mm;font-family:'Chivo'">The craft room. Wide caps, a ghost word, R/G/B role tags. The one that sells camera and editing first.</div></div>
</div>
<div class="meta" style="color:#EDE9E2"><span>Vitrine · Agora Network Technologies</span><span>Five pages per kit · Pillars, Colour, Type, Voice, Media</span></div>
</section>"""

closing = f"""<section class="page" style="background:#111;color:#EDE9E2;font-family:'Archivo',sans-serif">
<div class="h" style="opacity:.6">How to read these, and what to tell me</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:14mm">
 <div>
  <div style="font-family:'Archivo';font-stretch:80%;font-weight:700;font-size:20pt;line-height:1.05;margin-bottom:5mm">Comment on the feeling first, the hex codes last.</div>
  <div class="small" style="line-height:1.55;opacity:.9">Each kit is the same brand with a different pillar in charge. The useful comment is which one you'd want a producer to land on, and which page in that kit made you flinch. The palette, the type and the lines are all adjustable inside a kit; the thing that isn't adjustable is what leads.<br><br>Some things to react to specifically:<br>• The wordmark: your name in colour, in three different faces.<br>• The hero line and the accent phrase in it.<br>• The About opener: two use your bio's first line, one uses a sentence from your Berlinale essay.<br>• How Jack, 5Rhythms and Just Watch Us look on each ground.<br>• Kit C's coloured role tags: a yes or a no.<br>• The 'never' lists: anything you'd fight for.</div>
 </div>
 <div>
  <div class="small" style="line-height:1.55;opacity:.9"><b>What is fixed across all three</b><br>Your two throughlines as the spine. Precise roles. One award, two festivals, link the rest. Names you may state, never shown. Email on every page. No photos under videos. No festival-list paragraphs. Video plays in one tap without losing the page. Nothing loads until asked.<br><br><b>My recommendation</b><br>Kit A. It's the only one that couldn't be anyone else's, and it's how Ain't It Cool News, Rue Morgue and Fantasia already describe you. If it feels like too much for a credit-union producer, Kit B is the same brand with the edge moved from the chrome into the work, and that is a fair place to land. Kit C is right if you want the site to sell camera and editing first.<br><br><b>Facts still pending</b> (nothing here is final until they're answered): the Leo nomination wording, VFS status, the number of Crazy8s films, Bully Solution's award list, Glimpse's distributor, "since 1999" vs 2001, the email to publish, and which social links stay.</div>
 </div>
</div>
<div class="meta" style="color:#EDE9E2"><span>Vitrine · Agora Network Technologies</span><span>End</span></div>
</section>"""

html = "<!doctype html><html><head><meta charset='utf-8'><style>"+FONTFACE+BASECSS+"</style></head><body>"+cover
for k in (KIT_A,KIT_B,KIT_C):
    html+="".join(kit_pages(k))
html+=closing+"</body></html>"
open("/home/claude/kr/kit/kryshan-05-brand-kits.html","w").write(html)
# tokens json for batch 7
tokens={ "A":dict(ground=BLACK_A,text=BONE,accent=RED_A,red=ramp(RED_A),neutral=nA,fonts={"all":"Archivo (variable, wdth+wght)"}),
         "B":dict(ground=CREAM,text=INK,accent=RED_B,red=ramp(RED_B),neutral=nB,fonts={"wordmark":"Space Mono","body":"Work Sans","quote":"Fraunces Italic"}),
         "C":dict(ground=NB,text=MIST,accent=GREEN,green=ramp(GREEN),amber=ramp(AMBER),neutral=nC,role_tags={"directing":ROLE_R,"camera":GREEN,"editing":ROLE_B},fonts={"all":"Chivo (variable)","quote":"Newsreader Italic"})}
json.dump(tokens,open("/home/claude/kr/kit/kryshan-05-tokens.json","w"),indent=1)
print("html bytes",len(html))
