import { useEffect, useRef } from "react";

// todo: small bug when hitting escape key, the dialog closes, but the menu button doesn't toggle

interface DialogProps {
  isOpen: boolean;
  children: React.ReactNode;
  className?: string;
}

function Dialog({
  isOpen,
  children,
  className,
}: DialogProps): React.ReactElement {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <dialog ref={dialogRef} className={className}>
      {children}
    </dialog>
  );
}

export default Dialog;
