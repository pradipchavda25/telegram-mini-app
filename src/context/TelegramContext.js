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
            
            // Get the start parameter from URL
            const urlParams = new URLSearchParams(window.location.search);
            const param = urlParams.get('tgWebAppStartParam');
            setStartParam(param);
            window.Telegram.WebApp.setHeaderColor('#000');
            window.Telegram.WebApp.setBackgroundColor('#000');
            // window.Telegram.WebApp.isExpanded('true')
            window.Telegram.WebApp.expand()
            // webApp.setHeaderColor('#000')
            // Ensure the web app is ready
            tg.ready();
        } else {
            console.log("Telegram WebApp object not found");
        }
    }, []);

    return { webApp, user, startParam };
};

export default useTelegram;