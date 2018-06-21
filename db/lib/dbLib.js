module.exports.getall = (db, table, res) => {
  db.select().table(table)
  .then(result => {
    res.set({
      'Content-Type':'application/json'
    });
    res.json(result);
    res.status(200);
    res.end();
  })
  .catch(err => {
    res.status(400);
    console.error(err);
  });
};
module.exports.remove = (db, table, id, res) => {
  db(table).where('id',id).del()
  .then(result => {
    res.status(200);
    res.end();
  })
  .catch(err => {
    console.error(err);
  });
};
