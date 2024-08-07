import { useEffect, useRef } from "react";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

function Dialog({
  isOpen,
  onClose,
  children,
  className,
}: DialogProps): React.ReactElement {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
      document.body.style.overflow = "hidden";

      setTimeout(() => {
        dialog.style.opacity = "0.9";
        if (dialog.previousElementSibling) {
          (dialog.previousElementSibling as HTMLElement).style.filter =
            "blur(5px)";
        }
      }, 10);
    } else {
      dialog.style.opacity = "0";
      if (dialog.previousElementSibling) {
        (dialog.previousElementSibling as HTMLElement).style.filter =
          "blur(0px)";
      }

      // Add a transition delay before closing the dialog
      setTimeout(() => {
        dialog.close();
        document.body.style.overflow = "";
      }, 300);
    }
  }, [isOpen]);

  return (
    <dialog ref={dialogRef} className={className} onClose={onClose}>
      {children}
    </dialog>
  );
}

export default Dialog;
