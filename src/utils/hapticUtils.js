const triggerHapticFeedback = (type = 'impact') => {
    // Telegram WebApp method
    if (window.Telegram?.WebApp?.HapticFeedback) {
      const haptic = window.Telegram.WebApp.HapticFeedback;
      try {
        switch (type) {
          case 'impact':
            haptic.impactOccurred('medium');
            break;
          case 'success':
            haptic.notificationOccurred('success');
            break;
          case 'warning':
            haptic.notificationOccurred('warning');
            break;
          case 'error':
            haptic.notificationOccurred('error');
            break;
          default:
            haptic.selectionChanged();
        }
        console.log(`Telegram haptic feedback triggered: ${type}`);
        return;
      } catch (error) {
        console.error('Error with Telegram haptic feedback:', error);
      }
    }
  
    // Web Vibration API
    if (navigator.vibrate) {
      try {
        switch (type) {
          case 'impact':
            navigator.vibrate(100);
            break;
          case 'success':
            navigator.vibrate([100, 30, 100]);
            break;
          case 'warning':
            navigator.vibrate([100, 30, 100, 30, 100]);
            break;
          case 'error':
            navigator.vibrate([100, 30, 100, 30, 100, 30, 100]);
            break;
          default:
            navigator.vibrate(50);
        }
        console.log(`Web Vibration API triggered: ${type}`);
        return;
      } catch (error) {
        console.error('Error with Web Vibration API:', error);
      }
    }
  
    console.warn('Haptic feedback not available on this device/browser');
  };
  
  export default triggerHapticFeedback;