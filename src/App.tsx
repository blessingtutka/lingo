import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UserProvider from './providers/user.provider';
import { SocketProvider } from './providers/socket.provider';
import { Ringtone } from './components/global';
import { Toaster } from "@/components/ui/sonner"
import routes from './routes';
import './app.css';

const router = createBrowserRouter(routes);

const App = () => {
    return (
        <UserProvider>
            <SocketProvider>
                <Ringtone />
                <RouterProvider router={router} />
                <Toaster />
            </SocketProvider>
        </UserProvider>
    );
};

export default App;
