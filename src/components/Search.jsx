import "./css/Search.css"

export function Search(props) {
  let lastSearch = ""

  function searchInput() {
    const inputValue = document.querySelector("input[name=searchInput]").value
    if (lastSearch == inputValue) return

    console.log(inputValue);
    lastSearch = inputValue
  }

  return (
    <div className="search">
      <label htmlFor="searchInput">
        {props.label}
      </label>
      <input
        type="text"
        name="searchInput"
        id="searchInput"
        placeholder={props.placeholder}
        onKeyUp={searchInput}
      />
    </div>
  )
}