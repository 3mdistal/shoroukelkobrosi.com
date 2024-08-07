import { useEffect, useRef } from "react";

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
