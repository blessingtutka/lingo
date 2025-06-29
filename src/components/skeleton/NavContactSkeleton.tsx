import { Skeleton } from '@/components/ui/skeleton';

export function NavContactSkeleton() {
    return (
        <div className='space-y-2 px-3'>
            {[...Array(5)].map((_, i) => (
                <div key={i} className='flex items-center gap-3 p-2'>
                    <Skeleton className='h-8 w-8 rounded-full' />
                    <Skeleton className='h-4 w-[120px]' />
                </div>
            ))}
        </div>
    );
}
