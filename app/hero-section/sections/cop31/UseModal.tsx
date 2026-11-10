"use client";
import { useCallback, useEffect, useRef, useState } from "react";

// Wraps a native <dialog>: focus trapping, Escape to close and returning focus
// to the trigger all come from the browser. We only add the page scroll lock.
export function useModal() {
    const ref = useRef<HTMLDialogElement>(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const dialog = ref.current;
        if (!dialog) return;
        if (open && !dialog.open) dialog.showModal();
        if (!open && dialog.open) dialog.close();
        document.documentElement.style.overflow = open ? "hidden" : "";
        return () => {
            document.documentElement.style.overflow = "";
        };
    }, [open]);

    const show = useCallback(() => setOpen(true), []);
    const hide = useCallback(() => setOpen(false), []);

    return { ref, open, show, hide };
}