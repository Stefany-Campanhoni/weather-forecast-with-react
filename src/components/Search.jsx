import { MagnifyingGlass } from "@phosphor-icons/react"
import "./css/Search.css"
import { useState } from "react"

export function Search(props) {
  const [city, setCity] = useState("")

  let lastSearch = ""
  function searchInput(e) {
    e.preventDefault()

    const currentValue = document.querySelector("input[name=searchInput]").value
    if (lastSearch == currentValue) return

    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${currentValue}&appid=0de9c719c375b613fc8e084c8439afe1&units=metric`

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

      {city != "" ? (
        <div dangerouslySetInnerHTML={{ __html: city }} className="output" />
      ) : (
        <div>nothing</div>
      )}
    </>
  )
}