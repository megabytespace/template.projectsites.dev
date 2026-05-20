import { useEffect, useRef, useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  /** Source code to render. */
  code: string;
  /** Language label shown in the top-right corner. Default `ts`. */
  language?: string;
  /** File name displayed in the toolbar. */
  filename?: string;
  /** Highlight specific lines (1-indexed). */
  highlightLines?: number[];
  /** Show line numbers. Default true. */
  showLineNumbers?: boolean;
  className?: string;
}

/**
 * Code block with copy button + filename header + optional line highlighting.
 *
 * Uses pure CSS for visual treatment — no syntax-highlighting library shipped
 * with the template (keeps the bundle lean). To add Shiki / Prism, wrap this
 * component in a server-time MD pipeline or use `<CodeBlock>` as a fallback.
 *
 * Why no shipped highlighter:
 *   - Shiki adds ~200KB. Prism with all langs is ~400KB.
 *   - Marketing sites rarely need rich highlighting on >2 snippets.
 *   - When you DO need it, pre-render the HTML at build time, not runtime.
 */
export function CodeBlock({
  code,
  language = 'ts',
  filename,
  highlightLines = [],
  showLineNumbers = true,
  className,
}: Props) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
  }, []);

  async function copy() {
    await navigator.clipboard?.writeText(code);
    setCopied(true);
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setCopied(false), 1800);
  }

  const lines = code.replace(/\n$/, '').split('\n');
  const highlight = new Set(highlightLines);

  return (
    <figure className={cn('card-tactile overflow-hidden bg-surface', className)}>
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-surface-elevated">
        <div className="flex items-center gap-3">
          <span className="text-text-subtle font-mono text-xs uppercase tracking-widest">
            {language}
          </span>
          {filename && (
            <span className="text-text-muted text-sm font-mono">{filename}</span>
          )}
        </div>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? 'Copied' : 'Copy code'}
          className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-text-muted hover:text-text hover:bg-surface transition-colors text-xs"
        >
          {copied ? <Check size={14} className="text-success" /> : <Copy size={14} />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
        <code className="font-mono text-text">
          {lines.map((line, i) => (
            <span
              key={i}
              className={cn(
                'block',
                highlight.has(i + 1) && 'bg-accent/10 -mx-4 px-4 border-l-2 border-accent',
              )}
            >
              {showLineNumbers && (
                <span aria-hidden="true" className="select-none inline-block w-8 mr-3 text-text-subtle text-right">
                  {i + 1}
                </span>
              )}
              <span>{line || ' '}</span>
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}

export default CodeBlock;
