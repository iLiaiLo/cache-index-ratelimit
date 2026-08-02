import Products from "../schema.js";
import nodeCache from "../cache.js";
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedproduct = await Products.findByIdAndDelete(id, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!deleteProduct) {
      return res.status(404).json({ message: "product was not found" });
    }
    nodeCache.del(id);
    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default deleteProduct;
