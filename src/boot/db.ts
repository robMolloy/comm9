import { boot } from 'quasar/wrappers';
import { createPocketBaseDb } from 'src/modules';
import { useCurrentUserStore } from 'src/stores/useCurrentUserStore';
import { useMessagesStore } from 'src/stores/useMessagesStore';
import { useUsersStore } from 'src/stores/useUsersStore';

const onIsLoggedInDI = async ({
  db,
  currentUserStore,
  usersStore,
  messagesStore,
}: {
  db: ReturnType<typeof createPocketBaseDb>;
  currentUserStore: ReturnType<typeof useCurrentUserStore>;
  usersStore: ReturnType<typeof useUsersStore>;
  messagesStore: ReturnType<typeof useMessagesStore>;
}) => {
  currentUserStore.setUnknownData(db.authStore.model);

  // TODO: await together
  const messages = await db.collection('messages').getFullList();
  messagesStore.setUnknownData(messages);
  const users = await db.collection('users').getFullList();
  usersStore.setUnknownData(users);

  db.collection('messages').subscribe('*', ({ action, record }) => {
    console.log(/*LL*/ 25, { action, record });
    if (action === 'create') messagesStore.addUnknownData(record);
  });
  db.collection('users').subscribe('*', ({ action, record }) => {
    console.log(/*LL*/ 29, { action, record });
    if (action === 'create') usersStore.addUnknownData(record);
  });
};

const onIsLoggedOutDI = async ({
  db,
  usersStore,
  messagesStore,
}: {
  db: ReturnType<typeof createPocketBaseDb>;
  usersStore: ReturnType<typeof useUsersStore>;
  messagesStore: ReturnType<typeof useMessagesStore>;
}) => {
  usersStore.clearData();
  messagesStore.clearData();
  db.collection('messages')
    .unsubscribe()
    .catch(() => {});
  db.collection('users')
    .unsubscribe()
    .catch((e) => {
      console.log(/*LL*/ 67, 'e', e);
    });
};

export default boot(async () => {
  const db = createPocketBaseDb();
  const currentUserStore = useCurrentUserStore();
  currentUserStore.setUnknownData(db.authStore.model);
  const messagesStore = useMessagesStore();
  const usersStore = useUsersStore();

  const isLoggedIn = !!db.authStore.model?.id;
  if (isLoggedIn)
    onIsLoggedInDI({ db, currentUserStore, usersStore, messagesStore });

  db.authStore.onChange(async (_auth, newModel) => {
    currentUserStore.setUnknownData(newModel);
    if (currentUserStore.dataScenario.scenario === 'LOGGED_IN')
      onIsLoggedInDI({ db, currentUserStore, usersStore, messagesStore });
    if (currentUserStore.dataScenario.scenario === 'LOGGED_OUT')
      onIsLoggedOutDI({ db, usersStore, messagesStore });
  });
});
