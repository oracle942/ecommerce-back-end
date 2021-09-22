const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allProducts = await Product.findAll({
      include: [{ model: Product },]   
    });
    res.status(200).json(allProducts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    const oneCategory = await Category.findByPk(req.params.id,
      {include: [{model: Product}]
    })
  
    if (!singleTag) {
      res.status(400).json({message: 'No tag category found with that ID!'});
      return;
    }
    res.status(200).json(oneCategory)
  
    } catch (err){
      res.status(500).json(err);
    }
});

router.post('/', (req, res) => {
  // create a new category
  try {
    const catData = await Category.create({
      id: req.body.id,
      name: req.body.name,
    });
    res.status(200).json(catData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const catData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!catData[0]) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
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
