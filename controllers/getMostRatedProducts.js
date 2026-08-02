import nodeCache from "../cache.js";
import Products from "../schema.js";

const getMostRatedProducts = async (req, res) => {
  try {
    const key = "mostRatedProducts";
    const mostRatedCached = nodeCache.get(key);
    if (mostRatedCached) {
      console.log("most rated from cache");
      return res.status(200).json(mostRatedCached);
    }

    const mostRatedProducts = await Products.find({ rating: 5 })
      .select({ __v: 0 })
      .lean();

    nodeCache.set(
      key,
      mostRatedProducts.map((prod) => {
        return { ...prod, _id: prod._id.toString() };
      }),
    );

    return res.status(200).json(mostRatedProducts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default getMostRatedProducts;
