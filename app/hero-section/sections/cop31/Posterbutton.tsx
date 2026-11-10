"use client";
import { Download, X } from "lucide-react";
import type { ReactNode } from "react";
import type { Cop31Poster } from "@/data/cop31";
import { useModal } from "./UseModal";

type Props = {
    poster: Cop31Poster;
    /** Short title shown in the lightbox header */
    title: string;
    /** Accessible name for the trigger button */
    label: string;
    className?: string;
    children: ReactNode;
};

// A button that opens an official poster at full size. The image is only
// mounted while the lightbox is open, so closed posters cost nothing.
export default function PosterButton({ poster, title, label, className, children }: Props) {
    const { ref, open, show, hide } = useModal();

    return (
        <>
            <button type="button" className={className} onClick={show} aria-label={label}>
                {children}
            </button>

            <dialog ref={ref} className="c31-dialog" aria-label={title} onClose={hide}>
                {open && (
                    <div className="c31-dialog-inner">
                        <div className="c31-dialog-bar">
                            <span>{title}</span>
                            <div className="c31-dialog-actions">
                                <a className="c31-icon-btn" href={poster.src} download aria-label="Download poster">
                                    <Download size={18} />
                                </a>
                                <button type="button" className="c31-icon-btn" onClick={hide} aria-label="Close">
                                    <X size={18} />
                                </button>
                            </div>
                        </div>
                        <div className="c31-dialog-stage c31-dialog-poster">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={poster.src} width={poster.width} height={poster.height} alt={poster.alt} />
                        </div>
                        <div className="c31-dialog-foot" />
                    </div>
                )}
            </dialog>
        </>
    );
}