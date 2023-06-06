import { boot } from 'quasar/wrappers';
import { createPocketBaseDb } from 'src/modules';
import { useCurrentUserStore } from 'src/stores/useCurrentUserStore';
import { useMessages2Store } from 'src/stores/useMessages2Store';

export default boot(() => {
  const db = createPocketBaseDb();
  const currentUserStore = useCurrentUserStore();
  const messages2Store = useMessages2Store();

  db.authStore.onChange((_auth, newModel) => {
    console.log(/*LL*/ 11, 'auth Store changed123!', _auth);

    currentUserStore.handleSetData(newModel);
    if (currentUserStore.data.scenario === 'LOGGED_IN') {
      db.collection('messages').subscribe('*', ({ action, record }) => {
        if (action === 'create') messages2Store.handleAddData(record);
      });
      db.collection('users').subscribe('*', ({ action, record }) => {
        if (action === 'create') messages2Store.handleAddData(record);
      });
    }
    if (currentUserStore.data.scenario === 'LOGGED_OUT') {
      db.collection('messages').unsubscribe();
      db.collection('users').unsubscribe();
    }
  });
});
