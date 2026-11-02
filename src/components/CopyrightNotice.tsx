import React from 'react';

interface CopyrightNoticeProps {
  className?: string;
}

export const CopyrightNotice: React.FC<CopyrightNoticeProps> = ({ className = '' }) => {
  return (
    <div className={`pt-8 pb-4 text-center border-t border-stone-200/70 mt-10 ${className}`}>
      <p className="text-xs text-stone-500 font-medium tracking-wide">
        Copyright © Beyond the screen, All rights Reserved.
      </p>
    </div>
  );
};
