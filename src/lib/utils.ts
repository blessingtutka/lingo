import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { formatDistanceToNow } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getCallDuration = (start: string, end: string | null) => {
    if (!end) return null;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const durationInSeconds = (endDate.getTime() - startDate.getTime()) / 1000;

    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);

    if (hours > 0) {
        return `${hours}h ${minutes > 0 ? `${minutes}min` : ''}`.trim();
    }
    return `${minutes}min`;
};

export const formatCallTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const hoursDiff = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (hoursDiff > 24) {
        // More than 24 hours ago - show full date
        return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    } else if (hoursDiff > 1) {
        // More than 1 hour ago - show time
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    // Less than 1 hour ago - show relative time
    return formatDistanceToNow(date, { addSuffix: true });
};
