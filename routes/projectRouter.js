const express = require('express');

const router = express.Router();

const project = require('../data/helpers/projectModel.js');


router.get('/', (req, res, next) => {
  project.get()
    .then(stuff => {
      res.status(200).json(stuff)
    })
    .catch(next)
})

router.get('/:id', (req, res, next) => {

  const { id } = req.params

  project.get(id)
    .then(stuff => {
      res.status(200).json(stuff)
    })
    .catch(next)
})

router.post('/', validateProject, (req, res, next) => {
  const info = req.body

  project.insert(info)
  .then(stuff => {
    res.status(200).json(stuff)
  })
  .catch(next)
})

router.delete('/:id', validateProjectID, (req, res, next) => {
  project.remove(req.params.id)
  .then(stuff => {
    res.status(200).json({ message: 'EXTERMINATE!' })
  })
  .catch(next)
})

router.put('/:id', validateProjectID, (req, res, next) => {
  const info = req.body
  const { id } = req.params

  project.update(id, info)
  .then(stuff => {
    res.status(200).json(stuff)
  })
  .catch(next)
})

function validateProjectID(req, res, next) {
  const { id } = req.params
  project.get(id)
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
function validateProject(req, res, next) {
  const body = req.body
  const { name, description } = body
  if (!body) {
    res.status(400).json({ message: "You need to tell me the project, please..." })
  } if (!name) {
    res.status(400).json({ message: "You need to tell me the name of the project, please..." })
  } if (!description) {
    res.status(400).json({ message: "You need to tell me the description of the project, please..." })
  }
  next()
}





module.exports = router
