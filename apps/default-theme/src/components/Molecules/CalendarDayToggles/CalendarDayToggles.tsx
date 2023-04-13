import { Button } from '@/components/Atoms/Button/Button';
import { useState } from 'react';
import { CalendarDayTogglesProps } from '@/components/Molecules/CalendarDayToggles/CalendarDayToggles.model';

export const CalendarDayToggles = ({
  fullWidth = false,
}: CalendarDayTogglesProps) => {
  const [date, setDate] = useState<Date>(new Date());
  function formatDate(date: Date) {
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  }

  const dateChange = (increment: boolean) => setDate( (prevState) => {
    const newDate = new Date(prevState);
    if (isNaN(newDate.getTime())) {
      throw new Error('Invalid date');
    }
    if (increment) {
      newDate.setDate(newDate.getDate() + 1);
    } else {
      newDate.setDate(newDate.getDate() - 1);
    }
    return newDate;
  });

  return (
    <div className={`flex flex-row flex-nowrap items-center gap-4 ${fullWidth ? 'w-full' : 'w-auto'}`}>
      <Button size="base" variant="hollowPrimary" className="active:scale-95 transition-all" onClick={() => dateChange(false)}>&lt;</Button>
        <span className="text-center text-base w-40">{formatDate(date)}</span>
      <Button size="base" variant="hollowPrimary" className="active:scale-95 transition-all" onClick={() => dateChange(true)}>&gt;</Button>
    </div>
  );
};
