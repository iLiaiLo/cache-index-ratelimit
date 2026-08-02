import Products from "../schema.js";

const getProductsByName = async (req, res) => {
  try {
    const { match } = req.query;
    const productList = await Products.find({
      name: { $regex: match, $options: "i" },
    });

    return res.status(200).json(productList);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default getProductsByName;
