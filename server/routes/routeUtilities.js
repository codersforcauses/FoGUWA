const { consola } = require('consola')

const updateModel = (model, id, update) =>
  model.findByIdAndUpdate(id, update, { new: true }, (err, doc) => {
    if (err) {
      consola.error(`Updating failed: ${err}`)
    }
  })

module.exports = { updateModel }
