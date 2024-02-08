import { DashboardContainer } from "../pages/dashboard";
import { ProductDetailContainer } from "../pages/productDetail";
import { store } from "./store";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardContainer />,
  },
  {
    path: "/:storeId/:productId",
    element: <ProductDetailContainer />,
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
