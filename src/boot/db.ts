import { boot } from 'quasar/wrappers';
import { createPocketBaseDb } from 'src/modules';
import { useCurrentUserStore } from 'src/stores/useCurrentUserStore';
import { useMessagesStore } from 'src/stores/useMessagesStore';
import { useUsersStore } from 'src/stores/useUsersStore';

export default boot(async () => {
  const db = createPocketBaseDb();
  const currentUserStore = useCurrentUserStore();
  currentUserStore.setUnknownData(db.authStore.model);
  const messages2Store = useMessagesStore();
  const users2Store = useUsersStore();

  const isLoggedIn = !!db.authStore.model?.id;
  if (isLoggedIn) {
    currentUserStore.setUnknownData(db.authStore.model);

    // TODO: await together
    const messages = await db.collection('messages').getFullList();
    messages2Store.setUnknownData(messages);
    const users = await db.collection('users').getFullList();
    users2Store.setUnknownData(users);

    db.collection('messages').subscribe('*', ({ action, record }) => {
      if (action === 'create') messages2Store.addUnknownData(record);
    });
    db.collection('users').subscribe('*', ({ action, record }) => {
      if (action === 'create') users2Store.addUnknownData(record);
    });
  }

  db.authStore.onChange(async (_auth, newModel) => {
    currentUserStore.setUnknownData(newModel);
    if (currentUserStore.dataScenario.scenario === 'LOGGED_IN') {
      // TODO: await together
      const messages = await db.collection('messages').getFullList();
      messages2Store.setUnknownData(messages);
      const users = await db.collection('users').getFullList();
      users2Store.setUnknownData(users);

      db.collection('messages').subscribe('*', ({ action, record }) => {
        console.log({ action, record });
        if (action === 'create') messages2Store.addUnknownData(record);
      });
      db.collection('users').subscribe('*', ({ action, record }) => {
        if (action === 'create') users2Store.addUnknownData(record);
      });
    }
    if (currentUserStore.dataScenario.scenario === 'LOGGED_OUT') {
      // TODO: on logout clear data
      // unsubscribe not required
      // db.collection('messages').unsubscribe();
      // db.collection('users').unsubscribe();
    }
  });
});
