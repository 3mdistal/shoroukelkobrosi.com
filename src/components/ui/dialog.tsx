import { useEffect, useRef } from 'react'

interface DialogProps {
  isOpen: boolean
  children: React.ReactNode
  className?: string
  onClose?: () => void
}

function Dialog({ isOpen, children, className, onClose }: DialogProps): React.ReactElement {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen) {
      dialog.showModal()
    } else {
      dialog.close()
    }
  }, [isOpen])

  return (
    <dialog ref={dialogRef} className={className} onClose={onClose}>
      {children}
    </dialog>
  )
}

export default Dialog
