import { Notify } from 'quasar';

export const positiveNotification = (message: string) => {
  Notify.create({ type: 'positive', message });
};
export const warningNotification = (message: string) => {
  Notify.create({
    color: 'red-5',
    textColor: 'white',
    icon: 'warning',
    message,
  });
};
