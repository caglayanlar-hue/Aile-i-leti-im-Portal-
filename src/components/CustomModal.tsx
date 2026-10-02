import React from 'react';
import { X, Check } from 'lucide-react';

interface CustomModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  showCancel?: boolean;
}

export const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Tamam',
  cancelText = 'İptal',
  onConfirm,
  onCancel,
  showCancel = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-[200] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl max-w-md w-full p-6 md:p-8 animate-in zoom-in-95 duration-200 border border-slate-100">
        <h3 className="text-xl font-bold text-slate-800 mb-2 font-serif">
          {title}
        </h3>
        <p className="text-slate-600 mb-6 text-sm md:text-base leading-relaxed">
          {message}
        </p>

        <div className="flex justify-end gap-3">
          {showCancel && (
            <button
              onClick={onCancel}
              className="px-5 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold text-sm transition-colors cursor-pointer"
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={onConfirm}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white rounded-xl font-bold text-sm transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>{confirmText}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
