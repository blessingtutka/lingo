import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export const UserAvatar = ({ user }: { user: User }) => (
    <Avatar>
        {user.avatar ? <AvatarImage src={user.avatar} alt={user.displayName} /> : null}
        <AvatarFallback className='bg-blue-400'>{user.displayName.substring(0, 2).toUpperCase()}</AvatarFallback>
    </Avatar>
);
