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
    if (isOpen) {
      dialogRef.current?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialogRef.current?.close();
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <dialog ref={dialogRef} className={className} onClose={onClose}>
      {children}
    </dialog>
  );
}

export default Dialog;
