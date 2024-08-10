import { useEffect, useState } from 'react';

const useTelegram = () => {
    const [telegram, setTelegram] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (window.Telegram?.WebApp) {
            const tg = window.Telegram?.WebApp;
            setTelegram(tg);
            setUser(tg.initDataUnsafe.user);
        }
    }, []);

    return { telegram, user };
};

export default useTelegram;
