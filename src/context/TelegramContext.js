import { useEffect, useState } from 'react';

const useTelegram = () => {
    const [webApp, setWebApp] = useState(null);
    const [user, setUser] = useState(null);
    const [startParam, setStartParam] = useState(null);

    useEffect(() => {
        if (window.Telegram?.WebApp) {
            const tg = window.Telegram.WebApp;
            setWebApp(tg);
            setUser(tg.initDataUnsafe?.user);
            setStartParam(tg.startParam);
            
            tg.ready();
        }
    }, []);

    return { webApp, user, startParam };
};

export default useTelegram;