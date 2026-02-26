'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';

interface ExplainMoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGeneralDeepDive: () => void;
  onSpecificRequest: (instructions: string) => void;
}

export default function ExplainMoreModal({
  isOpen,
  onClose,
  onGeneralDeepDive,
  onSpecificRequest,
}: ExplainMoreModalProps) {
  const [mode, setMode] = useState<'choice' | 'specific'>('choice');
  const [specificText, setSpecificText] = useState('');
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstButtonRef = useRef<HTMLButtonElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setMode('choice');
      setSpecificText('');
    }
  }, [isOpen]);

  // Focus management
  useEffect(() => {
    if (isOpen && mode === 'choice') {
      firstButtonRef.current?.focus();
    } else if (isOpen && mode === 'specific') {
      textareaRef.current?.focus();
    }
  }, [isOpen, mode]);

  // Escape key handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    }
  }, [isOpen, handleKeyDown]);

  const handleSpecificSubmit = () => {
    if (specificText.trim()) {
      onSpecificRequest(specificText.trim());
    }
  };

  const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSpecificSubmit();
    }
  };

  if (!isOpen) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{ animation: 'backdropFadeIn 0.2s ease-out forwards' }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="explain-modal-title"
        className="relative bg-[#FAF6F0] rounded-xl shadow-xl max-w-lg w-full p-8 border-2 border-[#D1C9BD]"
        style={{ animation: 'modalSlideUp 0.25s ease-out forwards' }}
      >
        <h2
          id="explain-modal-title"
          className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-[#0E3B3D] mb-6"
        >
          Was there anything missing or specific that you wanted to know?
        </h2>

        {mode === 'choice' ? (
          <div className="flex flex-col gap-4">
            <button
              ref={firstButtonRef}
              onClick={onGeneralDeepDive}
              className="w-full bg-[#C8922A] text-[#0E3B3D] font-[family-name:var(--font-body)] text-xl font-semibold px-8 py-4 rounded-lg hover:bg-[#A67720] min-h-[56px] cursor-pointer transition-colors duration-150"
            >
              No, just a general deeper dive
            </button>
            <button
              onClick={() => setMode('specific')}
              className="w-full bg-transparent text-[#1A5C5E] font-[family-name:var(--font-body)] text-xl font-semibold px-8 py-4 rounded-lg border-2 border-[#1A5C5E] hover:bg-[rgba(26,92,94,0.08)] min-h-[56px] cursor-pointer transition-colors duration-150"
            >
              Yes, I have something specific in mind
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <textarea
              ref={textareaRef}
              value={specificText}
              onChange={(e) => setSpecificText(e.target.value)}
              onKeyDown={handleTextareaKeyDown}
              placeholder="Tell us what you'd like to know more about..."
              rows={3}
              maxLength={500}
              className="w-full font-[family-name:var(--font-body)] text-lg p-4 bg-white border-2 border-[#B5AC9F] rounded-lg text-[#2D2D2D] placeholder:text-[#5C5C5C] focus:border-[#1A5C5E] focus:shadow-sm resize-none transition-all duration-150"
            />
            <button
              onClick={handleSpecificSubmit}
              disabled={!specificText.trim()}
              className="w-full bg-[#C8922A] text-[#0E3B3D] font-[family-name:var(--font-body)] text-xl font-semibold px-8 py-4 rounded-lg hover:bg-[#A67720] min-h-[56px] cursor-pointer transition-colors duration-150 disabled:bg-[#E8E0D5] disabled:text-[#B5AC9F] disabled:cursor-not-allowed"
            >
              Get More Detail
            </button>
            <button
              onClick={() => setMode('choice')}
              className="w-full text-[#5C5C5C] font-[family-name:var(--font-body)] text-lg font-medium px-4 py-2 hover:text-[#1A5C5E] cursor-pointer transition-colors duration-150"
            >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
