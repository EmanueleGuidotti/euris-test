import { CreateProduct } from "../pages/createProduct";
import { DashboardContainer } from "../pages/dashboard";
import { ProductDetailContainer } from "../pages/productDetail";
import { store } from "./store";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CreateProductContainer } from "../pages/createProduct";
import { GraphPageContainer } from "../pages/graphPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardContainer />,
  },
  {
    path: "/:storeId/:productId",
    element: <ProductDetailContainer />,
  },
  {
    path: "/createProduct/:storeId",
    element: <CreateProductContainer />,
  },
  {
    path: "/graph/:storeId",
    element: <GraphPageContainer />,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
