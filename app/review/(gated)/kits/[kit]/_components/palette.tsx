import { contrastRatio, wcagGrade } from "@/lib/color/contrast";
import type { ReviewKit } from "@/review/kits/types";

/** Roles, ramps and contrast, rendered from the kit's own data. */
export function Palette({ kit }: { kit: ReviewKit }) {
  const pairs: Array<[string, string, string]> = [
    ["Text on ground", kit.colors.foreground, kit.colors.background],
    ["Secondary on ground", kit.colors.mutedForeground, kit.colors.background],
    ["Primary on ground", kit.colors.primary, kit.colors.background],
    ["Small accent on ground", kit.colors.accent, kit.colors.background],
    ["Text on card", kit.colors.cardForeground, kit.colors.card],
    ["Text on primary", kit.colors.primaryForeground, kit.colors.primary],
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="flex flex-col gap-6">
        {Object.entries(kit.ramps ?? {}).map(([name, ramp]) => (
          <div key={name} className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">{name}</h3>
            <div className="grid grid-cols-6 gap-1 sm:grid-cols-11">
              {Object.entries(ramp).map(([step, hex]) => (
                <div
                  key={step}
                  className="flex aspect-square flex-col justify-end rounded-sm border border-border p-1 font-mono text-[10px]"
                  style={{ background: hex, color: contrastLabel(hex) }}
                >
                  {step}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium">
            Contrast at real sizes (WCAG 2.2)
          </h3>
          <table className="w-full text-sm">
            <tbody>
              {pairs.map(([label, fg, bg]) => {
                const ratio = contrastRatio(fg, bg);
                return (
                  <tr key={label} className="border-t border-border">
                    <td className="py-1.5">
                      <span
                        className="rounded px-2 py-0.5"
                        style={{ color: fg, background: bg }}
                      >
                        {label}
                      </span>
                    </td>
                    <td className="py-1.5 font-mono text-xs text-muted-foreground">
                      {fg} on {bg}
                    </td>
                    <td className="py-1.5 text-right">
                      {ratio
                        ? `${ratio.toFixed(1)}:1 · ${wcagGrade(ratio)}`
                        : "n/a"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium">Roles: what each colour is for</h3>
        <table className="w-full text-sm">
          <tbody>
            {(kit.roles ?? []).map((role) => (
              <tr key={role.name} className="border-t border-border align-top">
                <td className="py-2 pr-2">
                  <span
                    className="inline-block size-6 rounded-sm border border-border"
                    style={{ background: role.hex }}
                  />
                </td>
                <td className="py-2 pr-3">
                  <div className="font-medium">{role.name}</div>
                  <div className="font-mono text-xs text-muted-foreground">
                    {role.hex}
                  </div>
                </td>
                <td className="py-2 text-muted-foreground">{role.use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function contrastLabel(hex: string): string {
  const dark = contrastRatio(hex, "#111111") ?? 0;
  const light = contrastRatio(hex, "#f4f4f4") ?? 0;
  return dark >= light ? "#111111" : "#f4f4f4";
}
