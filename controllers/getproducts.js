import Products from "../schema.js";
const getProducts = async (_, res) => {
  try {
    const data = await Products.find().select({ __v: 0 });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default getProducts;
