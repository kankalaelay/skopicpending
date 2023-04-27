import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
// import '../../index.css';
import ReactDOM from 'react-dom';

import React, { Component, useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

// import React, { useState, useEffect } from 'react';
import { Carousel } from 'primereact/carousel';
import { Button } from 'primereact/button';
import { useDispatch, useSelector } from 'react-redux'

// import { ProductService } from '../service/ProductService';
import '../../Assets/css/home/CarouselDemo.css';

// const CarouselDemo = () => {
//     const contibutorsData = useSelector((state) => state.feedReducer.contibutorsData)

//     const [products, setProducts] = useState([]);
//     const [isContributors, setContributors] = useState([])
//     const responsiveOptions = [
//         {
//             breakpoint: "1440px",
//             numVisible: 3,
//             numScroll: 2
//         },
//         {
//             breakpoint: '1024px',
//             numVisible: 3,
//             numScroll: 2
//         },
//         {
//             breakpoint: '600px',
//             numVisible: 2,
//             numScroll: 2
//         },
//         {
//             breakpoint: '480px',
//             numVisible: 1,
//             numScroll: 1
//         }
//     ];

    // const productService = new ProductService();

    // useEffect(() => {
    //     // productService.getProductsSmall().then(data => setProducts(data.slice(0, 6)));
    //     if (contibutorsData) {
    //         console.log(contibutorsData)
    //         if (contibutorsData && Object.keys(contibutorsData).length !== 0) {
    //             if (contibutorsData.contribut) {
    //                 setProducts(contibutorsData.contribut);
    //                 // setContributors(contibutorsData.contribut.slice(7,10))
    //             }
    //         }

    //     }


    // }, [contibutorsData]);
     // eslint-disable-line react-hooks/exhaustive-deps
    // const src = 'http://dev.skopic.com:9090/skopicimage/';
    // console.log(products)

//     const productTemplate = (product) => {
//         return (
//             <div className="product-item">
//                 <div className="product-item-content">
//                     <img src={`${src}${product.uImage}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={product.displayName} className="product-image" />
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="carousel-demo">
//             <div className="card">
//                 {
//                     (products && Object.keys(products).length !== 0)
//                         ?
//                         <Carousel value={products} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions}
//                             itemTemplate={productTemplate} style={{ display: "flex", flexDirection: "row" }} />
//                         :
//                         <p>No Data</p>
//                 }
//             </div>
//         </div>
//     );
// }

// export default CarouselDemo

// // const rootElement = document.getElementById("root");
// // ReactDOM.render(<CarouselDemo />, rootElement);

 const MultipleRows=()=> {
    const contibutorsData = useSelector((state) => state.feedReducer.contibutorsData)
    const src = 'http://dev.skopic.com:9090/skopicimage/';
    const [products, setProducts] = useState([]);

        useEffect(() => {
        // productService.getProductsSmall().then(data => setProducts(data.slice(0, 6)));
        if (contibutorsData) {
            console.log(contibutorsData)
            if (contibutorsData && Object.keys(contibutorsData).length !== 0) {
                if (contibutorsData.contribut) {
                    setProducts(contibutorsData.contribut);
                    // setContributors(contibutorsData.contribut.slice(7,10))
                }
            }

        }


    }, [contibutorsData]);

    const settings = {
        // className: "center",
        // centerMode: true,
        // infinite: true,
        // centerPadding: "60px",
        slidesToShow: 1,
        // speed: 500,
        rows: 2,
        slidesPerRow: 3,
    };
    return (
        <>
            <Slider {...settings}>

                {
                (products && Object.keys(products).length !== 0)
                    ?
                    products.map((product) =>
                        <div className="carousel-demo">
                            {/* <div className="card"> */}
                            <div className="product-item">
                                <div className="product-item-content">
                                    <img src={`${src}${product.uImage}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={product.displayName} className="product-image" />
                                </div>
                            </div>
                            {/* </div> */}
                        </div>
                    )
                    :
                    <p>No Data</p>
                    
                }
            </Slider >
        </ >
    );
}

export default MultipleRows