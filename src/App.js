import React, { useEffect, useState } from 'react'
import './styles.css'

const App = () => {

  const[products,setProducts] = useState([]);
  const[page,setPage] = useState(1);

  const fetchProducts = async () =>{
    const response = await fetch('https://dummyjson.com/products?limit=100');
    const data = await response.json();
    console.log(data);
    if(data && data.products && data.products.length){
      setProducts(data.products);
    }
  }

  useEffect(()=>{
    fetchProducts();
  },[])

  const selectedPageHandler = (selectedPage) =>{
    if(selectedPage>=1 && selectedPage<=products.length/10 && selectedPage!==page)
    setPage(selectedPage);
  }

  return (
    <div>
      {
        (products && products.length) && <div className='products'>
          {
            products.slice(page*10-10,page*10).map((item) => {
              return <span className='products__single' key={item.id}>
                <img src={item.thumbnail} alt={item.title} />
                <span>{item.title}</span>
              </span>
            }) 
          }
        </div>
      }{
        (products && products.length) && <div className='pagination'>
          <span onClick={()=>selectedPageHandler(page-1)}
            className={page>1?"":"pagination__disable"}
          >◀️</span>
          {
            [...Array(products.length/10)].map((_,i)=>{
              return <span
                      className={page===i+1?"pagination__selected":""}
                      onClick={()=>selectedPageHandler(i+1)} 
                      key={i}
                      >{i+1}</span>
            })
          }
          <span onClick={()=>selectedPageHandler(page+1)}
            className={page<products.length/10?"":"pagination__disable"}
            >▶️</span>
        </div>
      }
    </div>
  )
}

export default App
