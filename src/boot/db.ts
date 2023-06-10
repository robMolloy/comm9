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
      console.log(/*LL*/ 25, { action, record });
      if (action === 'create') messages2Store.addUnknownData(record);
    });
    db.collection('users').subscribe('*', ({ action, record }) => {
      console.log(/*LL*/ 29, { action, record });
      if (action === 'create') users2Store.addUnknownData(record);
    });
  }

  db.authStore.onChange(async (_auth, newModel) => {
    currentUserStore.setUnknownData(newModel);
    if (currentUserStore.dataScenario.scenario === 'LOGGED_IN') {
      console.log(/*LL*/ 37, '123', 123);
      // TODO: await together
      const messages = await db.collection('messages').getFullList();
      messages2Store.setUnknownData(messages);
      const users = await db.collection('users').getFullList();
      users2Store.setUnknownData(users);

      console.log(/*LL*/ 44, '345');
      db.collection('messages').subscribe('*', ({ action, record }) => {
        console.log(/*LL*/ 46, { action, record });
        if (action === 'create') messages2Store.addUnknownData(record);
      });
      db.collection('users').subscribe('*', ({ action, record }) => {
        console.log(/*LL*/ 50, { action, record });
        if (action === 'create') users2Store.addUnknownData(record);
      });
    }
    if (currentUserStore.dataScenario.scenario === 'LOGGED_OUT') {
      // TODO: on logout clear data

      users2Store.clearData();
      messages2Store.clearData();
      db.collection('messages')
        .unsubscribe()
        .catch(() => {});
      db.collection('users')
        .unsubscribe()
        .catch((e) => {
          console.log(/*LL*/ 67, 'e', e);
        });
    }
  });
});
