import React from 'react';
import cn from 'classnames';
import { FiAlertCircle, FiCheckCircle, FiInfo, FiXCircle } from 'react-icons/fi';

interface AlertProps {
  children: React.ReactNode;
  variant?: 'success' | 'error' | 'warning' | 'info';
  className?: string;
  showIcon?: boolean;
}

export const Alert: React.FC<AlertProps> = ({
  children,
  variant = 'info',
  className = '',
  showIcon = true
}) => {
  const baseClasses = 'rounded-md p-4 border';

  const variantClasses = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  };

  const iconClasses = {
    success: 'text-green-600',
    error: 'text-red-600',
    warning: 'text-yellow-600',
    info: 'text-blue-600'
  };

  const icons = {
    success: FiCheckCircle,
    error: FiXCircle,
    warning: FiAlertCircle,
    info: FiInfo
  };

  const IconComponent = icons[variant];

  return (
    <div className={cn(baseClasses, variantClasses[variant], className)}>
      <div className="flex">
        {showIcon && (
          <div className="flex-shrink-0">
            <IconComponent className={cn('h-5 w-5', iconClasses[variant])} />
          </div>
        )}
        <div className={cn(showIcon ? 'ml-3' : '')}>
          {children}
        </div>
      </div>
    </div>
  );
};