import "./App.css";
import Router from "./shared/Router";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return <Router />;
}

export default App;
