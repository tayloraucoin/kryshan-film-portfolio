import type { ReviewKit } from "@/review/kits/types";

/** The type scale and the voice strings, set in the kit's own faces. */
export function TypeScale({ kit }: { kit: ReviewKit }) {
  const fonts = [
    ["Display", kit.fonts.display],
    ["Body", kit.fonts.body],
    ["Mono", kit.fonts.mono],
  ] as const;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <table className="w-full text-sm">
        <tbody>
          {(kit.typeScale ?? []).map((step) => (
            <tr
              key={step.name}
              className="border-t border-border align-baseline"
            >
              <td className="w-20 py-3 text-xs text-muted-foreground">
                {step.name}
              </td>
              <td className="py-3">
                <span style={cssToStyle(step.css)}>{step.sample}</span>
              </td>
              <td className="w-40 py-3 text-xs text-muted-foreground">
                {step.spec}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex flex-col gap-4">
        <dl className="flex flex-col gap-2 text-sm">
          {fonts.map(([label, slot]) => (
            <div
              key={label}
              className="grid grid-cols-[5rem_1fr] gap-2 border-t border-border py-2"
            >
              <dt className="text-xs text-muted-foreground">{label}</dt>
              <dd>
                <span style={{ fontFamily: slot.stack }}>
                  {slot.stack.split(",")[0]}
                </span>
                {slot.note ? (
                  <span className="block text-xs text-muted-foreground">
                    {slot.note}
                  </span>
                ) : null}
              </dd>
            </div>
          ))}
        </dl>

        <div
          className="flex flex-col gap-3 border-t border-border pt-4"
          data-review-id={`kit-${kit.id}-voice`}
        >
          <p className="text-xs text-muted-foreground">Home hero, H1</p>
          <p className="font-heading text-3xl leading-tight font-semibold">
            {kit.voice.h1}
          </p>
          <p className="text-muted-foreground">{kit.voice.support}</p>
          <p className="text-xs text-muted-foreground">Work section header</p>
          <p className="font-heading text-xl font-semibold">{kit.voice.work}</p>
          <p className="text-xs text-muted-foreground">About opener</p>
          <p>{kit.voice.about}</p>
          <p className="text-xs text-muted-foreground">Contact line</p>
          <p>{kit.voice.contact}</p>
        </div>
      </div>
    </div>
  );
}

/** Inline CSS text → React style. Only what the kit author wrote; nothing computed. */
function cssToStyle(css: string): React.CSSProperties {
  const style: Record<string, string> = {};
  for (const part of css.split(";")) {
    const [prop, ...rest] = part.split(":");
    const value = rest.join(":").trim();
    if (!prop || !value) continue;
    const key = prop
      .trim()
      .replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
    style[key] = value;
  }
  return style as React.CSSProperties;
}
