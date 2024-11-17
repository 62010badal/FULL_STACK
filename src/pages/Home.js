import React from "react";
import NavBar from "../features/counter/navbar/Navbar";
import { ProductList } from "../features/counter/product/components/ProductList";


function Home() {
    return (
        <div>
        <NavBar />
        <ProductList/>
    </div>
    );
}

export default Home;