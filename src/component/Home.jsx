import React, { useState, useEffect } from 'react'
import Product from './Product';

function Home() {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);

    useEffect(() => {
        const getProducts = async () => {
            const response = await fetch("https://fakestoreapi.com/products");
            setData(await response.clone().json());
            setFilter(await response.json());
            // console.log(filter)
        }
        getProducts();
    }, []);

    const filterProduct = (cat) => {
        if (cat === "") {
            setFilter(data)
            return
        }
        const updatedList = data.filter((x) => x.category === cat);
        setFilter(updatedList);
    }

    const ShowProducts = () => {

        return (
            <>
                {/* <div className='buttons d-flex justify-content-center mb-5 pb-5'>
                    <button className='btn btn-outline-dark me-2' onClick={() => setFilter(data)}>All</button>
                    <button className='btn btn-outline-dark me-2' onClick={() => filterProduct("men's clothing")}>Men's Clothing</button>
                    <button className='btn btn-outline-dark me-2' onClick={() => filterProduct("women's clothing")}>Women's Clothing</button>
                    <button className='btn btn-outline-dark me-2' onClick={() => filterProduct("jewelery")}>Jewelery</button>
                    <button className='btn btn-outline-dark me-2' onClick={() => filterProduct("electronics")}>Electronics</button>
                </div> */}
                {filter.map((product) => {
                    return (
                        <>
                            <div className='col-md-4 mb-4 '>
                                <div className="card card text-center p-4 shadow-lg bg-body rounded" key={product.id}>
                                    <div className="card-body w-80">
                                        <h5 class="card-title mb-0 fw-bolder">{product.title.substring(0, 20)}</h5>
                                        <p class="card-text lead fw-bold"> <span className='price'> Price </span>{product.price}</p>
                                    </div>
                                    <div className='image'>
                                        <img src={product.image} className="card-img-top" alt={product.title} height="250px" />
                                    </div>
                                    <div className='card-body'>
                                        <a href="#" className="btn btn-outline-dark">Buy Now</a>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })}
            </>
        )
    }
    return (

        <>
            <Product onFilter={filterProduct} />
            <div className='body'>
                <div className='container my-5'>
                    <div className='row'>
                        <div className='col-12 mb-5'>
                            <h1 className='display-6 fw-bolder text-center'> Man & Woman Fashion </h1>
                        </div>
                    </div>
                    <div className='row justify-content-center'>
                        {<ShowProducts />}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home