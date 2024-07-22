migrate((db) => {
  const collection = new Collection({
    "id": "egjnz3s4gco6cas",
    "created": "2023-06-14 15:50:18.772Z",
    "updated": "2023-06-14 15:50:18.772Z",
    "name": "podskh",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "eysbr4g8",
        "name": "field",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("egjnz3s4gco6cas");

  return dao.deleteCollection(collection);
})
