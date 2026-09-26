import { useEffect } from "react";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

let scriptPromise: Promise<void> | null = null;

function loadInstagramEmbedScript() {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.instgrm) return Promise.resolve();
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => resolve();
    document.body.appendChild(script);
  });
  return scriptPromise;
}

export function InstagramEmbed({
  url,
  caption,
  className,
}: {
  url: string;
  caption?: string;
  className?: string;
}) {
  useEffect(() => {
    let cancelled = false;
    loadInstagramEmbedScript().then(() => {
      if (!cancelled) window.instgrm?.Embeds.process();
    });
    return () => {
      cancelled = true;
    };
  }, [url]);

  return (
    <div className={className}>
      <div className="overflow-hidden rounded-[20px] hairline bg-elevated">
        <blockquote
          className="instagram-media"
          data-instgrm-permalink={url}
          data-instgrm-version="14"
          style={{ margin: 0, width: "100%", minWidth: "100%" }}
        />
      </div>
      {caption ? (
        <p className="mt-2 text-[12px] leading-relaxed text-paper-dim">{caption}</p>
      ) : null}
    </div>
  );
}
