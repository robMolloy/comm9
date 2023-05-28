import PB from 'pocketbase';

const functionThatIsNeverCalled = () => new PB('');

type TDb = ReturnType<typeof functionThatIsNeverCalled>;
export let db: TDb | undefined;

/**
 * createDb uses a singleton pattern to return a pocketbase db if one already exists else it creates a pocketbase db
 */
export const createPocketBaseDb = () => {
  if (!!db) return db;
  db = new PB('http://127.0.0.1:8090/');
  return db;
};
