import { createContext, useContext, useState, useEffect } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Fetch ALL products once
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error loading products:", err);
      } finally {
        setLoadingProducts(false);
      }
    }

    fetchProducts();
  }, []);

  // filter by category
  const filterByCategory = (category) =>
    products.filter((item) => item.category === category);

  return (
    <ProductContext.Provider
      value={{
        products,
        loadingProducts,
        filterByCategory,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// CUSTOM HOOK — this is what you will import everywhere
export const useProductContext = () => useContext(ProductContext);
