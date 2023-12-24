// src/serviceWorkerRegistration.js

export const register = () => {
  // if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swUrl = `./serviceWorker.js`;
      navigator.serviceWorker
        .register(swUrl)
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
};

export const unregister = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
};
