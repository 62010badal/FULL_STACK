
// import { Counter } from './features/counter/Counter.js';
import './App.css';
import { Login } from './features/counter/Auth/components/Login.js';
import { Cart } from './features/counter/cart/Cart.js';
import CartPage from './pages/CartPage.js';
import Home from './pages/Home.js';
import LoginPage from './pages/LoginPage.js';
import SignupPage from './pages/SignupPage';
import Checkout from './pages/Checkout.js';


import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import ProductDetailPage from './pages/ProductDetailPage.js';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    
    path: "/login",
    element: <LoginPage></LoginPage>
  },
  {
    path: "/signup",
    element: <SignupPage></SignupPage>
  },
  {
    path: "/cart",
    element: <CartPage></CartPage>
  },
  {
    path: "/checkout",
    element: <Checkout></Checkout>
  },
  {
  path: "/product-detail",
    element: <ProductDetailPage></ProductDetailPage>,
  },
]);


function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
