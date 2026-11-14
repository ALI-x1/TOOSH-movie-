import React from 'react';

interface ExitDialogProps {
  open: boolean;
  onStay: () => void;
  onExit: () => void;
}

export const ExitDialog: React.FC<ExitDialogProps> = ({ open, onStay, onExit }) => {
  if (!open) return null;

  return (
    <div
      className="tm-sheet-bg tm-dlg-bg"
      onClick={(e) => {
        if (e.target === e.currentTarget) onStay();
      }}
    >
      <div className="tm-dlg" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <span className="tm-ic tm-ic-logout tm-dlg-ic" aria-hidden="true" />
        <b className="tm-dlg-t">خروج از برنامه؟</b>
        <p className="tm-dlg-p">می‌خواهید از برنامه خارج شوید؟</p>
        <div className="tm-dlg-b">
          <button type="button" className="tm-dlg-no" onClick={onStay}>
            بمانم
          </button>
          <button type="button" className="tm-dlg-yes" onClick={onExit}>
            خروج
          </button>
        </div>
      </div>
    </div>
  );
};
