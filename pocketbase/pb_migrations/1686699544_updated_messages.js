migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("giev39zjob9vfzm")

  collection.listRule = "senderId=@request.auth.id || recipientId=@request.auth.id"
  collection.viewRule = "senderId=@request.auth.id || recipientId=@request.auth.id"
  collection.createRule = "senderId=@request.auth.id "

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "er2eeimy",
    "name": "recipientId",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ughca5n0",
    "name": "text",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "acakwywi",
    "name": "senderId",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("giev39zjob9vfzm")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null

  // remove
  collection.schema.removeField("er2eeimy")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ughca5n0",
    "name": "field",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "acakwywi",
    "name": "user",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
