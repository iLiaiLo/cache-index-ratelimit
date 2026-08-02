import nodeCache from "../cache.js";
import Products from "../schema.js";

const getproductById = async (req, res) => {
  try {
    const { id } = req.params;

    const cachedData = nodeCache.get(id);
    if (cachedData) {
      console.log("Serving from cache");
      return res.status(200).json(cachedData);
    }

    const singleProduct = await Products.findById(id).select({ __v: 0 });

    if (!singleProduct) {
      return res.status(404).json({ message: "product was not found" });
    }
    const { _id, price, name, rating } = singleProduct;
    nodeCache.set(id, { _id: _id.toString(), name, price, rating });
    return res.status(200).json(singleProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default getproductById;
