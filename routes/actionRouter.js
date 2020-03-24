const express = require('express');

const router = express.Router();

const action = require('../data/helpers/actionModel.js');

router.get('/:id/actions', validateProjectID, (req, res, next) => {
  const { id } = req.body

  action.get(id)
  .then(stuff => {
    res.status(200).json(stuff)
  })
  .catch(next)
})

router.post('/:id/actions', validateProjectID, (req, res, next) => {
  const info = req.body

  action.insert(info)
  .then(stuff => {
    res.status(200).json(stuff)
  })
  .catch(next)
})

router.delete('/:id/actions/:actionID', validateProjectID, (req, res, next) => {
  const info = req.body
  const { actionID } = req.params

  action.remove(actionID, info)
  .then(stuff => {
    res.status(200).json(stuff)
  })
  .catch(next)
})

router.put('/:id/actions/:actionID', validateProjectID, (req, res, next) => {
  const info = req.body
  const { actionID } = req.params

  action.update(actionID, info)
  .then(stuff => {
    res.status(200).json(stuff)
  })
  .catch(next)
})


function validateProjectID(req, res, next) {
  const {id} = req.params
  action.get(id)
  .then(stuff => {
    if (stuff) {
      req.stuff = stuff
      next()
    } else {
      res.status(404).json({ message: "look inside yourself and decided if what you did was truly right..." })
    }
  })
  .catch(next)
}

module.exports = router
