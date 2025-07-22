import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export const UserAvatar = ({ user, className }: { user: User; className?: string }) => (
    <Avatar className={`${className}`}>
        {user.avatar ? <AvatarImage src={user.avatar} alt={user.name || user.email} /> : null}
        <AvatarFallback className='bg-blue-400'>{(user.name || user.email).substring(0, 2).toUpperCase()}</AvatarFallback>
    </Avatar>
);
