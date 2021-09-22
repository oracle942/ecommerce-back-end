// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');
const { hasMany } = require('./Category');

// Products belongsTo Category
Product.belongsTo( Category, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
})

// Categories have many Products
Category.hasMany( Products {
  foreignKey: 'category_id'
})

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany( Tags {
  foreignKey: 'tag_id'
})
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany( Products {
  foreignKey: 'tag_id'
})
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
