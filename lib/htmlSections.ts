// Splits a project's rich-text description on its <h2> headings so long
// descriptions can render as separate page sections instead of one wall of text.

export type HtmlSection = { id: string; title: string; html: string };
export type TitledItem = { title?: string; html: string };

export const plainText = (html: string) =>
    html
        .replace(/<[^>]*>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&amp;/g, '&')
        .replace(/\s+/g, ' ')
        .replace(/ ([.,;:!?])/g, '$1')
        .trim();

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function splitOn(tag: 'h2' | 'h3', html: string): { before: string; parts: { title: string; html: string }[] } {
    const chunks = html.split(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i'));
    const parts: { title: string; html: string }[] = [];
    for (let i = 1; i < chunks.length; i += 2) {
        parts.push({ title: plainText(chunks[i]), html: (chunks[i + 1] || '').trim() });
    }
    return { before: chunks[0].trim(), parts: parts.filter((p) => p.title) };
}

/** Only descriptions with two or more <h2> headings are treated as structured. */
export function splitDescription(html = ''): { intro: string; sections: HtmlSection[] } {
    const { before, parts } = splitOn('h2', html);
    if (parts.length < 2) return { intro: html, sections: [] };
    return { intro: before, sections: parts.map((p) => ({ ...p, id: slugify(p.title) })) };
}

export const splitSteps = (html: string) => splitOn('h3', html);

/**
 * When `html` ends in a single list whose items all read "Bold title: text",
 * returns the copy before the list and the items; otherwise null.
 */
export function titledList(html: string): { before: string; ordered: boolean; items: TitledItem[] } | null {
    const m = html.trim().match(/^([\s\S]*?)<(ol|ul)\b[^>]*>([\s\S]*)<\/\2>$/i);
    if (!m || /<(ol|ul)\b/i.test(m[3])) return null;
    const lis = [...m[3].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)].map((x) =>
        x[1].trim().replace(/^<p[^>]*>/i, '').replace(/<\/p>$/i, '').trim()
    );
    const items = lis.map((li) => {
        const t = li.match(/^<strong>([\s\S]*?)<\/strong>\s*:?\s*([\s\S]*)$/i);
        return t ? { title: plainText(t[1]).replace(/:$/, ''), html: t[2] } : { html: li };
    });
    if (items.length === 0 || items.some((i) => !i.title)) return null;
    return { before: m[1].trim(), ordered: m[2].toLowerCase() === 'ol', items };
}

/** The first real paragraph, so a leading "Introduction" heading isn't the excerpt. */
export function excerptOf(html = ''): string {
    const paras = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map((m) => plainText(m[1]));
    return paras.find((p) => p.length > 80) || plainText(html);
}

/** "Policy: To propose…" → { title: "Policy", body: "To propose…" } */
export function splitLabel(text: string): { title?: string; body: string } {
    const m = text.match(/^([A-Z][^:.]{2,40}):\s+([\s\S]+)$/);
    return m ? { title: m[1].trim(), body: m[2].trim() } : { body: text };
}
