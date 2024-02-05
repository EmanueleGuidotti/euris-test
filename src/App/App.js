import { DashboardContainer } from "../pages/dashboard";
import { store } from "./store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <DashboardContainer />
    </Provider>
  );
}

export default App;
