import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProfileSection } from '@/components/account/Profile';
import { SecuritySection } from '@/components/account/Security';
import { NotificationsSection } from '@/components/account/Notification';

export default function Account() {
    return (
        <div className='container px-4 py-4'>
            <h1 className='text-3xl font-bold mb-8'>Account Settings</h1>

            <Tabs defaultValue='profile' className='w-full'>
                <TabsList className='grid w-full grid-cols-4'>
                    <TabsTrigger value='profile'>Profile</TabsTrigger>
                    <TabsTrigger value='security'>Security</TabsTrigger>
                    <TabsTrigger value='notifications'>Notifications</TabsTrigger>
                </TabsList>

                <TabsContent value='profile'>
                    <ProfileSection />
                </TabsContent>

                <TabsContent value='security'>
                    <SecuritySection />
                </TabsContent>

                <TabsContent value='notifications'>
                    <NotificationsSection />
                </TabsContent>
            </Tabs>
        </div>
    );
}
