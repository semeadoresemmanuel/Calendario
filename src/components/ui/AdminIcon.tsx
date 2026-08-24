import React from 'react';
import { cn } from '../../lib/utils';
import adminPadlock from '../../assets/icons/admin_padlock.svg';
import adminPadlockUnlock from '../../assets/icons/admin_padlock_unlock.svg';

export const AdminIcon = ({ className, unlocked }: { className?: string; unlocked?: boolean }) => {
  return (
    <img 
      src={unlocked ? adminPadlockUnlock : adminPadlock} 
      className={cn("theme-icon-green", className)} 
      alt={unlocked ? "Unlocked" : "Locked"} 
    />
  );
};
