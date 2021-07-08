const MongoClient = require("mongodb").MongoClient
const settings = require("./settings")

MongoClient.connect("mongodb://" + settings.host + "/" + settings.db, function (err, client) {
  if (err) { return console.dir(err) }
  console.log("connected to db")
  const db = client.db(settings.db);
  db.collection("users", function (err, collection) {
    const docs = [
      { name: "taguchi", score: 40 },
      { name: "koji", score: 80 },
      { name: "dotinstall", score: 60 }
    ]

    collection.find({name: "taguchi"}).toArray(function (err, items) {
      console.log(items)
    })

    const stream = collection.find().stream()
    stream.on("data", function (item) {
      console.log(item)
    })
    stream.on("end", function () {
      console.log("finishied.")
    })
  })
})
