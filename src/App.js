import React, { useEffect, useState } from "react";
import "./styles.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();
    if (data && data.products) {
      setProducts(data.products);
    }
  };

  console.log(products);

  useEffect(() => {
    fetchProducts();
  }, []);

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= products.length &&
      selectedPage !== page
    )
      setPage(selectedPage);
  };

  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products.slice(page * 10 - 10, page * 10).map((item) => {
            return (
              <span className="products__single" key={item.id}>
                <img src={item.thumbnail} alt={item.thumbanil} />
                <span>{item.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          <span
            onClick={() => selectPageHandler(page - 1)}
            className={page > 1 ? "" : "pagination__disable"}
          >
            👈
          </span>
          {[...Array(products.length / 10)].map((_, ind) => {
            return (
              <span
                className={page === ind + 1 ? "pagination__selected" : ""}
                onClick={() => selectPageHandler(ind + 1)}
                key={ind}
              >
                {ind + 1}
              </span>
            );
          })}
          <span
            onClick={() => selectPageHandler(page + 1)}
            className={page < products.length / 10 ? "" : "pagination__disable"}
          >
            👉
          </span>
        </div>
      )}
    </div>
  );
};

export default App;
