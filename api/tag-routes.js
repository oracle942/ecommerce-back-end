const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTags = await Product.findAll({
      include: [{ model: Product },]   
    });
    res.status(200).json(allTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const singleTag = await Tag.findByPk(req.params.id,
      {include: [{model: Product}]
    })
  
    if (!singleTag) {
      res.status(400).json({message: 'No tag found with that ID!'});
      return;
    }
    res.status(200).json(singleTag)
  
    } catch (err){
      res.status(500).json(err);
    }

});

router.post('/', (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create({
      id: req.body.tag_id,
      tag_name: req.body.tag_name,
    });
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tagData[0]) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
