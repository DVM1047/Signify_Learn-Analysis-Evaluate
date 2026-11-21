'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1C234B]/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      {/* Modal Dialog */}
      <div className="relative bg-[#F2F2ED] border border-[#464B71]/15 rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-[#464B71]/10 pb-4 mb-4">
          {title && <h3 className="text-xl font-extrabold text-[#1C234B]">{title}</h3>}
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#464B71]/70 hover:text-[#1C234B] hover:bg-black/5 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="text-[#464B71]">{children}</div>
      </div>
    </div>
  );
};
