const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allProducts = await Category.findAll({
      include: [{ model: Product },]   
    });
    res.status(200).json(allProducts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    const oneCategory = await Category.findByPk(req.params.id,
      {include: [{model: Product}]
    })
  
    if (!oneCategory) {
      res.status(400).json({message: 'No tag category found with that ID!'});
      return;
    }
    res.status(200).json(oneCategory)
  
    } catch (err){
      res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const catData = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(catData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
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

router.delete('/', async (req, res) => {
  // delete a category by its `id` value
  try {
    const catData = await Category.destroy({
      where: {
        category_name: req.body.category_name,
      },
    });
    if (!catData) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;
