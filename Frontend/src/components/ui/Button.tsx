import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'inverted' | 'outlined' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold transition-all duration-200 select-none active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none rounded-2xl cursor-pointer';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5 font-semibold',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-7 py-3.5 gap-2.5 shadow-sm',
  };

  const variantStyles = {
    primary: 'bg-[#118AB2] hover:bg-[#0E7496] text-white shadow-sm hover:shadow-md hover:shadow-[#118AB2]/20',
    secondary: 'bg-[#7CD5C7] hover:bg-[#68C5B6] text-[#1C234B] font-extrabold shadow-sm hover:shadow-md hover:shadow-[#7CD5C7]/30',
    inverted: 'bg-[#1C234B] hover:bg-[#2B3466] text-white shadow-sm',
    outlined: 'border-2 border-[#118AB2] text-[#118AB2] hover:bg-[#118AB2]/10 bg-transparent',
    ghost: 'text-[#464B71] hover:text-[#118AB2] hover:bg-[#464B71]/10 bg-transparent',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-sm',
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4 text-current" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span>Loading...</span>
        </span>
      ) : (
        <>
          {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
