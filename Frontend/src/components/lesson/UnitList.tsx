'use client';

import React from 'react';
import { Unit } from '@/types';
import { LessonCard } from './LessonCard';
import { Award, BookOpen } from 'lucide-react';

interface UnitListProps {
  units: Unit[];
  searchQuery?: string;
  filterStatus?: 'all' | 'available' | 'completed';
}

export const UnitList: React.FC<UnitListProps> = ({
  units,
  searchQuery = '',
  filterStatus = 'all',
}) => {
  // Filter units and lessons according to search query and filter selection
  const filteredUnits = units
    .map((unit) => {
      const filteredLessons = unit.lessons.filter((lesson) => {
        const matchesSearch =
          lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lesson.desc.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus =
          filterStatus === 'all'
            ? true
            : filterStatus === 'available'
            ? lesson.status === 'available'
            : lesson.status === 'completed';

        return matchesSearch && matchesStatus;
      });

      return {
        ...unit,
        lessons: filteredLessons,
      };
    })
    .filter((unit) => unit.lessons.length > 0);

  if (filteredUnits.length === 0) {
    return (
      <div className="bg-white/95 rounded-3xl p-12 text-center border border-[#464B71]/10 shadow-sm my-6">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-[#7CD5C7]/30 flex items-center justify-center text-3xl mb-4">
          🔍
        </div>
        <h3 className="text-xl font-extrabold text-[#1C234B]">No lessons match your search</h3>
        <p className="text-sm text-[#464B71]/70 mt-1 max-w-md mx-auto">
          Try clearing your search query or switching your filter back to "All Lessons".
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {filteredUnits.map((unit) => {
        // Calculate original total lessons for accurate unit progress bar
        const originalUnit = units.find((u) => u.id === unit.id) || unit;
        const completedCount = originalUnit.lessons.filter((l) => l.status === 'completed').length;
        const totalCount = originalUnit.lessons.length;
        const percentCompleted = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
        const isAllDone = completedCount === totalCount && totalCount > 0;

        return (
          <div
            key={unit.id}
            className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-[#464B71]/10 shadow-sm transition-all duration-200"
          >
            {/* Unit Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#464B71]/10 pb-6 mb-8">
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-13 h-13 md:w-14 md:h-14 rounded-2xl bg-[#118AB2] text-white flex items-center justify-center text-xl md:text-2xl font-black shadow-md shrink-0">
                  {unit.unit_num}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl md:text-2xl font-black text-[#1C234B]">
                      {unit.title}
                    </h3>
                    {isAllDone && (
                      <span className="hidden sm:inline-flex items-center gap-1 text-xs font-black text-[#118AB2] bg-[#7CD5C7]/40 px-2.5 py-0.5 rounded-full">
                        <Award className="w-3.5 h-3.5" /> Unit Mastered
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[#464B71]/80 mt-1 max-w-2xl leading-relaxed">
                    {unit.desc}
                  </p>
                </div>
              </div>

              {/* Unit Progress Widget */}
              <div className="bg-[#F2F2ED]/70 rounded-2xl p-3 sm:p-4 min-w-[210px] border border-[#464B71]/10 shrink-0">
                <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                  <span className="text-[#464B71]/70">Unit Progress</span>
                  <span className="text-[#118AB2] font-black">{percentCompleted}%</span>
                </div>
                <div className="w-full bg-white h-2.5 rounded-full overflow-hidden p-[1px] border border-[#464B71]/10">
                  <div
                    className="bg-gradient-to-r from-[#118AB2] to-[#7CD5C7] h-full rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${percentCompleted}%` }}
                  />
                </div>
                <div className="text-[11px] text-[#464B71]/70 font-semibold mt-1.5 text-right">
                  {completedCount} of {totalCount} completed
                </div>
              </div>
            </div>

            {/* Lesson Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {unit.lessons.map((lesson) => (
                <LessonCard key={lesson.id} lesson={lesson} unitNum={unit.unit_num} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
