import Products from "../schema.js";
import nodeCache from "../cache.js";
const addProduct = async (req, res) => {
  try {
    const product = await Products.create(req.body);

    return res
      .status(201)
      .json({ message: "product added to database", id: product._id });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export default addProduct;
