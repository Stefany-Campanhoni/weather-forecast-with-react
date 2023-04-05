import { MagnifyingGlass } from "@phosphor-icons/react"
import { useState } from "react"
import "./css/Search.css"

export function Search(props) {
  const [city, setCity] = useState("")

  let lastSearch = ""
  function searchInput(e) {
    e.preventDefault()

    const currentValue = document.querySelector("input[name=searchInput]").value
    if (lastSearch == currentValue) return

    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${currentValue}&appid=${
      import.meta.env.VITE_API_TOKEN
    }&units=metric`

    fetch(apiUrl)
      .then((res) => res.json())
      .then((jsonData) => {
        const { main, name, sys, weather } = jsonData

        if (weather != undefined) {
          const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`

          setCity(`
          <div>
            <p>${parseInt(main.temp)}°C</p>
            <p>${sys.country}</p>
            <p>${name}</p>
            <p>${weather[0]["description"]}</p>
          </div>
          <img src="${icon}" />
          `)
        } else {
          setCity(`
          <p class="err">City Not Found!</p>
          `)
        }
      })

    lastSearch = currentValue
  }

  return (
    <>
      <div className="search">
        <label htmlFor="searchInput">{props.label}</label>
        <form onSubmit={(event) => searchInput(event)}>
          <input
            type="text"
            name="searchInput"
            id="searchInput"
            placeholder={props.placeholder}
          />
          <button type="submit">
            <MagnifyingGlass
              size={24}
              color="#ffffff"
            />
          </button>
        </form>
      </div>

      <div className="weather-display-container">
        {city != "" ? (
          <div
            dangerouslySetInnerHTML={{ __html: city }}
            className="output"
          />
        ) : (
          <div></div>
        )}
      </div>
    </>
  )
}
