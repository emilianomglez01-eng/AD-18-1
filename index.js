const itemsContainer = document.querySelector("#list-items");

function addItem(item) {
  const colourCard = document.createElement("section");
  colourCard.className = "card w-75 m-2";

  const colourCardBody = document.createElement("article");
  colourCardBody.className = "card-body";
  colourCard.appendChild(colourCardBody);

  const colourCardTitle = document.createElement("h5");
  colourCardTitle.className = "card-title";
  colourCardTitle.innerText = item.name + " (" + item.year + ")";
  colourCardBody.appendChild(colourCardTitle);

  const colourCardText = document.createElement("p");
  colourCardText.className = "card-text";
  colourCardText.innerText = "Pantone: " + item.pantone_value;
  colourCardBody.appendChild(colourCardText);

  const colourCardColour = document.createElement("div");
  colourCardColour.style = `
    width: 100px;
    height: 30px;
    background-color: ${item.color};
    border: 1px solid #000;
    margin-top: 10px;
  `;
  colourCardBody.appendChild(colourCardColour);

  itemsContainer.appendChild(colourCard);
}

function fetchColorsList() {
  fetch("js/data.json")   // 👈 usando tu archivo local
    .then(response => response.json())
    .then(data => {
      console.log("Datos recibidos:", data);  // Verificar en consola
      data.data.forEach(item => addItem(item));
      localStorage.setItem("colors", JSON.stringify(data.data));
    })
    .catch(error => console.error("Error al obtener colores:", error));
}

function loadColorsFromStorage() {

  const storedColors = localStorage.getItem("colors");
  if (storedColors) {
    console.log("Colores cargados de localStorage:", JSON.parse(storedColors));
    JSON.parse(storedColors).forEach(item => addItem(item));
  }
}
fetchColorsList();
loadColorsFromStorage();