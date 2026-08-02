import Products from "../schema.js";
import nodeCache from "../cache.js";
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Products.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
      runValidators: true,
    }).select({ __v: 0 });
    if (!product) {
      return res.status(404).json({ message: "product was not found" });
    }

    nodeCache.del(id);

    const { _id, price, name, rating } = product;

    nodeCache.set(id, { _id: product.id.toString(), price, name, rating });

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default updateProduct;
