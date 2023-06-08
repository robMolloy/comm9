import { boot } from 'quasar/wrappers';
import { createPocketBaseDb } from 'src/modules';
import { useCurrentUserStore } from 'src/stores/useCurrentUserStore';
import { useMessages2Store } from 'src/stores/useMessages2Store';
import { useUsers2Store } from 'src/stores/useUsers2Store';

export default boot(async () => {
  const db = createPocketBaseDb();
  const currentUserStore = useCurrentUserStore();
  currentUserStore.handleSetData(db.authStore.model);
  const messages2Store = useMessages2Store();
  const users2Store = useUsers2Store();

  const isLoggedIn = !!db.authStore.model?.id;
  if (isLoggedIn) {
    currentUserStore.handleSetData(db.authStore.model);

    // TODO: await together
    const messages = await db.collection('messages').getFullList();
    messages2Store.handleSetData(messages);
    const users = await db.collection('users').getFullList();
    users2Store.handleSetData(users);

    db.collection('messages').subscribe('*', ({ action, record }) => {
      if (action === 'create') messages2Store.handleAddData(record);
    });
    db.collection('users').subscribe('*', ({ action, record }) => {
      if (action === 'create') users2Store.handleAddData(record);
    });
  }

  db.authStore.onChange(async (_auth, newModel) => {
    currentUserStore.handleSetData(newModel);
    if (currentUserStore.data.scenario === 'LOGGED_IN') {
      // TODO: await together
      const messages = await db.collection('messages').getFullList();
      messages2Store.handleSetData(messages);
      const users = await db.collection('users').getFullList();
      users2Store.handleSetData(users);

      db.collection('messages').subscribe('*', ({ action, record }) => {
        console.log({ action, record });
        if (action === 'create') messages2Store.handleAddData(record);
      });
      db.collection('users').subscribe('*', ({ action, record }) => {
        if (action === 'create') users2Store.handleAddData(record);
      });
    }
    if (currentUserStore.data.scenario === 'LOGGED_OUT') {
      // TODO: on logout clear data
      db.collection('messages').unsubscribe();
      db.collection('users').unsubscribe();
    }
  });
});