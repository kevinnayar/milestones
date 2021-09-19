import * as React from 'react';
import { ReactNode } from 'react';

type Variant = 'error' | 'warning' | 'info' | 'success';

type ButtonType = 'submit' | 'button' | 'reset';

type ButtonProps = {
  children: string | ReactNode;
  disabled?: boolean;
  type?: ButtonType;
  className?: string;
  variant?: Variant;
  icon?: string;
  onClick?: () => void;
};

export const Button = ({ children, disabled, type, className, variant, icon, onClick }: ButtonProps) => {
  const classNames = [
    'button',
    ...(className ? [className] : [undefined]),
    ...(variant ? [`button--${variant}`] : [undefined]),
    ...(icon ? ['button--with-icon'] : [undefined]),
  ].filter((c) => !!c).join(' ');

  return (
    <button
      type={type || 'button'}
      disabled={disabled || false}
      className={classNames}
      onClick={onClick}
    >
      {icon && <i className="material-icons">{icon}</i>}
      {children}
    </button>
  );
};

