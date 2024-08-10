import { useEffect, useState } from 'react';

const useTelegram = () => {
    const [webApp, setWebApp] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (window.Telegram?.WebApp) {
            const tg = window.Telegram.WebApp;
            setWebApp(tg);
            setUser(tg.initDataUnsafe?.user);
            
            // Ensure the web app is ready
            tg.ready();
        }
    }, []);

    return { webApp, user };
};

export default useTelegram;