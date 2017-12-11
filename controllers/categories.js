const Category = require('../models/category');
const Product = require('../models/product');
module.exports = {
  index: async (req, res, next) => {
  	try{
    const categories = await Category.find({});
    res.status(200).json(categories);
      }
    catch(err) {
	next(err);
    }
  },



newCategory: async(req, res, next) => {
	try{
  	const newCategory = new Category(req.body); 
    const category = newCategory.save();
    res.status(201).json(category);
}
catch(err){
	next(err);
} 
},

 getCategory: async(req, res, next) => {
 	const { categoryId } = req.params;
   // console.log('req.params',req.params.categoryId);

  const category = await Category.findById(categoryId);
  res.status(200).json(category);
 },

 replaceCategory: async (req, res, next) => {
 	 const { categoryId } = req.params;
 	 const newCategory = req.body;
 	 console.log('categoryId', categoryId); 
 	 const result = Category.findByIdAndUpdate(categoryId, newCategory);
     console.log('result', result);
     res.status(200).json(result);
 },

 getCatProd: async (req, res, next) => {
      const { categoryId } = req.params;  
      const category = await Category.findById(categoryId).populate('products');
      console.log('cat product', category.products);
  },

   newCatProd: async (req, res, next) => {
     const { categoryId } = req.params; 
     //create new product
      const newProduct = new Product(req.body);  
      //gt category
      const category = await Category.findById(categoryId)
      
      //Map category to product  

      newProduct.category = category;
      await newProduct.save();

      //Map product to category
     category.products.push(newProduct);
   /*   await category.update({_id:categoryId} , {$push: {products: [newProduct]} }, {upsert:true},function(err){
        if(err){
                console.log(err);
        }else{
                console.log("Successfully added");
        }
});
*/
      await category.save();

      res.status(201).json(newProduct);


  }
};

