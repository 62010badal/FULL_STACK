import React from "react";
import NavBar from "../features/counter/navbar/Navbar";
import ProductDetails from "../features/counter/product/components/ProductDetails";

function ProductDetailPage() {
    return (
        <div>
        <NavBar />
        <ProductDetails></ProductDetails>
    </div>
    );
}

export default ProductDetailPage;