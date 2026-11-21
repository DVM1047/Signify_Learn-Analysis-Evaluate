import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon, rightIcon, className = '', ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-xs font-bold text-[#464B71] uppercase tracking-wider">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 text-[#464B71]/60 pointer-events-none flex items-center">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={`
              w-full bg-white/90 border border-[#464B71]/20 rounded-2xl px-4 py-3 text-sm
              text-[#1C234B] placeholder:text-[#464B71]/50
              focus:outline-none focus:ring-2 focus:ring-[#118AB2] focus:border-[#118AB2]
              transition duration-150
              ${leftIcon ? 'pl-11' : ''}
              ${rightIcon ? 'pr-11' : ''}
              ${error ? 'border-red-500 focus:ring-red-500' : ''}
              ${className}
            `}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 text-[#464B71]/60 flex items-center">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <span className="text-xs font-semibold text-red-500 mt-0.5">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
