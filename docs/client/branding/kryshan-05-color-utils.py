import math
def srgb_to_linear(c):
    c/=255.0
    return c/12.92 if c<=0.04045 else ((c+0.055)/1.055)**2.4
def linear_to_srgb(c):
    c=max(0,min(1,c))
    v= c*12.92 if c<=0.0031308 else 1.055*(c**(1/2.4))-0.055
    return v
def hex_to_rgb(h): h=h.lstrip('#'); return tuple(int(h[i:i+2],16) for i in (0,2,4))
def rgb_to_hex(r,g,b): return '#%02x%02x%02x'%(round(r),round(g),round(b))
def rgb_to_oklab(r,g,b):
    r,g,b=[srgb_to_linear(x) for x in (r,g,b)]
    l=0.4122214708*r+0.5363325363*g+0.0514459929*b
    m=0.2119034982*r+0.6806995451*g+0.1073969566*b
    s=0.0883024619*r+0.2817188376*g+0.6299787005*b
    l_,m_,s_=l**(1/3),m**(1/3),s**(1/3)
    return (0.2104542553*l_+0.7936177850*m_-0.0040720468*s_,
            1.9779984951*l_-2.4285922050*m_+0.4505937099*s_,
            0.0259040371*l_+0.7827717662*m_-0.8086757660*s_)
def oklab_to_rgb(L,a,b):
    l_=L+0.3963377774*a+0.2158037573*b
    m_=L-0.1055613458*a-0.0638541728*b
    s_=L-0.0894841775*a-1.2914855480*b
    l,m,s=l_**3,m_**3,s_**3
    r=+4.0767416621*l-3.3077115913*m+0.2309699292*s
    g=-1.2684380046*l+2.6097574011*m-0.3413193965*s
    bb=-0.0041960863*l-0.7034186147*m+1.7076147010*s
    return r,g,bb
def in_gamut(r,g,b): return all(-0.0005<=x<=1.0005 for x in (r,g,b))
def oklch_to_hex(L,C,h):
    a=C*math.cos(math.radians(h)); b=C*math.sin(math.radians(h))
    c=C
    while c>=0:
        a=c*math.cos(math.radians(h)); b=c*math.sin(math.radians(h))
        r,g,bb=oklab_to_rgb(L,a,b)
        if in_gamut(r,g,bb): break
        c-=0.002
    r,g,bb=oklab_to_rgb(L,a,b)
    return rgb_to_hex(*[linear_to_srgb(x)*255 for x in (r,g,bb)])
def hex_to_oklch(h):
    L,a,b=rgb_to_oklab(*hex_to_rgb(h))
    return L, math.hypot(a,b), math.degrees(math.atan2(b,a))%360
STEPS=[50,100,200,300,400,500,600,700,800,900]
def ramp(base_hex, chroma_scale=1.0):
    L0,C0,h=hex_to_oklch(base_hex)
    # lightness targets; 500 = base
    top=0.97; bot=max(0.18, L0-0.36)
    up=[top-(top-L0)*t for t in (0.0,0.14,0.36,0.62,0.84)]
    down=[L0-(L0-bot)*t for t in (0.28,0.54,0.78,1.0)]
    Ls=up+[L0]+down
    out={}
    for st,L in zip(STEPS,Ls):
        if st==500: out[st]=base_hex.lower(); continue
        # chroma falls toward the ends
        dist=abs(L-L0)/max(0.97-L0, L0-0.2)
        C=C0*chroma_scale*max(0.15,1-0.55*dist) if C0>0.02 else C0
        out[st]=oklch_to_hex(max(0.12,min(0.985,L)),C,h)
    return out
def lum(h):
    r,g,b=[srgb_to_linear(x) for x in hex_to_rgb(h)]
    return 0.2126*r+0.7152*g+0.0722*b
def contrast(h1,h2):
    a,b=lum(h1),lum(h2)
    if a<b:a,b=b,a
    return (a+0.05)/(b+0.05)
if __name__=="__main__":
    for h in ["#C81E2A","#E9E4D8","#35C27A","#E2A63A","#0B0B0C"]:
        print(h, ramp(h))
    print(contrast("#F1ECE4","#0B0B0C"), contrast("#C81E2A","#0B0B0C"), contrast("#C9352E","#E9E4D8"))
