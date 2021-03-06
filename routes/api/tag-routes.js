const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags
// be sure to include its associated Product data
router.get('/', (req, res) => {
  Tag.findAll({
    include: [{
      model: Product,
      through: ProductTag
    }]
  }).then(dbTag => {
    res.json(dbTag)
  })
  .catch(err => {
    console.log(err);
    res.status(404).json(err);
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {id: req.params.id},
    include: [Product]
  }).then(dbTag => {
    res.json(dbTag)
  })
  .catch(err => {
    console.log(err);
    res.status(404).json(err);
  })
});


router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body).then(dbTag => {
    res.json(dbTag)
  })
  .catch(err => {
    console.log(err);
    res.status(404).json(err);
  }) 
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
    id: req.body.id,
    tag_name: req.body.tag_name,
  },
  { where: {
    id: req.params.id
    }
  }).then(dbTag => {
      res.json(dbTag)
    })
    .catch(err => {
      console.log(err);
      res.status(404).json(err);
    }) 
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbTag => {
    res.json(dbTag)
  })
  .catch(err => {
    console.log(err);
    res.status(404).json(err);
  }) 
});

module.exports = router;
