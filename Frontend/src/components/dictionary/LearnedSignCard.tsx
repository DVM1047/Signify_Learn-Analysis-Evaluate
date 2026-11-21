import React from 'react';

export interface LearnedSignCardProps {
  signName?: string;
  gestureEmoji?: string;
}

export const LearnedSignCard: React.FC<LearnedSignCardProps> = ({
  signName = 'Namaste',
  gestureEmoji = '🙏',
}) => {
  return (
    <div className="p-4 bg-white rounded-2xl border border-[#464B71]/10 flex items-center gap-3">
      <span className="text-2xl">{gestureEmoji}</span>
      <span className="font-bold text-sm text-[#1C234B]">{signName}</span>
    </div>
  );
};

export default LearnedSignCard;
