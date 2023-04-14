/* Dependencies */
import dayjs from 'dayjs';

/**
 * Format Date Range And Return String
 * @param start_date - Start Date
 * @param start_time - Start Time
 * @param end_date - End Date
 * @param end_time - End Time
 * @param showTime - Show Time
 * @returns
 */
export const formatDateRange = (
  start_date: string,
  start_time: string,
  end_date: string,
  end_time: string,
  showTime: boolean = true
): string => {
  const formattedStartDate = dayjs(start_date).format('DD MMMM YYYY');
  const formattedEndDate = dayjs(end_date).format('DD MMMM YYYY');
  const startTimeParts = start_time.split(':');
  const endTimeParts = end_time.split(':');
  const formattedStartTime = dayjs()
    .set('hour', +startTimeParts[0])
    .set('minute', +startTimeParts[1])
    .format('HH:mm a');
  const formattedEndTime = dayjs()
    .set('hour', +endTimeParts[0])
    .set('minute', +endTimeParts[1])
    .format('HH:mm a');

  if (dayjs(start_date).isSame(end_date, 'day')) {
    if (showTime) {
      return `${formattedStartDate} ${formattedStartTime} - ${formattedEndTime}`;
    }
    return `${formattedStartDate}`;
  }
  {
    if (showTime) {
      return `${formattedStartDate} ${formattedStartTime} - ${formattedEndDate} ${formattedEndTime}`;
    }
    return `${formattedStartDate} - ${formattedEndDate}`;
  }
};
