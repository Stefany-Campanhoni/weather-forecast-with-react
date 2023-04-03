import "./App.css"
import { Search } from "./components/Search"

function App() {
  return (
    <div className="App">
      <h2>Weather Forecast</h2>
      <Search
        label="Enter the name of a city to see the weather..."
        placeholder="City Name"
      />
    </div>
  )
}

export default App
