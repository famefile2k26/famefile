import type { ReactNode } from 'react';

/**
 * Abas sem JavaScript: radios escondidos + :has() no CSS.
 * Funciona no servidor, no preview estático e com teclado (setas trocam de aba).
 */
export function Tabs({ uid, label, tabs }: { uid: string; label: string; tabs: { id: string; label: ReactNode; content: ReactNode }[] }) {
  const root = `.tabs-${uid}`;
  const id = (t: string) => `${uid}-${t}`;
  const css = [
    `${root} .tab-panel{display:none}`,
    ...tabs.flatMap((t) => [
      `${root}:has(#${id(t.id)}:checked) .tab-panel[data-tab="${t.id}"]{display:block}`,
      `${root}:has(#${id(t.id)}:checked) label[for="${id(t.id)}"]{color:var(--color-fg);border-color:var(--color-fame)}`,
      `${root}:has(#${id(t.id)}:focus-visible) label[for="${id(t.id)}"]{outline:2px solid var(--color-fame);outline-offset:2px}`,
    ]),
  ].join('\n');
  return (
    <div className={`tabs-${uid}`}>
      <style>{css}</style>
      {tabs.map((t, i) => (
        <input key={t.id} type="radio" name={uid} id={id(t.id)} defaultChecked={i === 0} className="sr-only" />
      ))}
      <div role="group" aria-label={label} className="mb-8 flex gap-1 overflow-x-auto border-b border-line no-scrollbar">
        {tabs.map((t) => (
          <label
            key={t.id}
            htmlFor={id(t.id)}
            className="cursor-pointer select-none whitespace-nowrap border-b-2 border-transparent px-4 py-3 font-display text-sm font-black uppercase italic tracking-tight text-muted transition hover:text-fg"
          >
            {t.label}
          </label>
        ))}
      </div>
      {tabs.map((t) => (
        <div key={t.id} className="tab-panel" data-tab={t.id}>
          {t.content}
        </div>
      ))}
    </div>
  );
}
