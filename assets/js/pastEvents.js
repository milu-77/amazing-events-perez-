/**
 * TODO: Iniciamos Variables
 */
let cardDate = [];
let cardView = [];
let set = new Set();
let cinema = document.getElementById("cinema");
let food = document.getElementById("food");
let museum = document.getElementById("museum");
let concert = document.getElementById("concert");
let books = document.getElementById("books");
let party = document.getElementById("party");
let race = document.getElementById("race");
let search = document.getElementById("search");

/**
 * TODO: Funciones de busqueda por texto
 */
function searchCards() {
  if (cardView.length > 0) {
    let cardView2 = cardView.filter((card) => checkCard(card) == true);
    if (cardView2.length == 0) {
      emptySearch();
    } else {
      renderCard(cardView2);
    }
  } else {
    let cardView2 = cardDate.filter((card) => checkCard(card) == true);
    if (cardView2.length == 0) {
      emptySearch();
    } else {
      renderCard(cardView2);
    }
  }
}
function checkCard(card) {
  var str = cardToString(card);
  regex = new RegExp(search.value.toLowerCase());
  var result = regex.test(str);
  return result;
}

/**
 * TODO: Funciones de filtro con checkbox 
 */
function View(cat) {
  if (cat.checked) {
    let cardView2 = cardDate.filter(
      (card) => card.category.toLowerCase() == cat.value.toLowerCase()
    );
    pushCardView(cardView2);
    renderCard(cardView);
  } else {
    let cardView2 = cardView.filter(
      (card) => card.category.toLowerCase() != cat.value.toLowerCase()
    );
    cleanView();
    pushCardView(cardView2);

    if (cardView2.length == 0) {
      renderCard(cardDate);
    } else {
      renderCard(cardView);
    }
  }
}

/**
 * TODO: Diduja las Tarjetas 
 */
function renderCard(cardArray) {
  var body = document.getElementById("rows");
  let cardsVieWInner = "";
  for (card of cardArray) {
    cardsVieWInner += `<div class="col-12 col-sm-6 col-md-4">
        <div class=" card shadow m-1">
        <div class="  box-img " style="background-image: url('${card.image}')" ><img class="card-img-top "  alt="${card.name}"
        src="${card.image}"></div>
        <div class="card-body">
            <h4 class="card-title text-center mb-2 text-uppercase">${card.name}</h4>
            <p class="card-text  m-4 d-flex align-content-center" >
             <a class="card-text text-end btn rounded-pill border  shadow-sm    p-1 border-1 ${card.category}"
                  >${card.category}</a>
            <strong class="card-text fs-6 align-self-center flex-grow-1 text-end">${card.date}</strong></p>
            <p class="card-text text-center  ">${card.description}</p>
            </div>
            <div class="card-footer d-flex">
            <h6 class="price m-0">${card.price} $</h6><a class="btn btn-primary  " href="./details.html?id=${card._id}"> More Info</a>
        </div>
        </div>
        </div>`;
  }
  body.innerHTML = cardsVieWInner;
}

/**
 * TODO: limpiar arreglo
 */
function cleanView() {
  cardView = [];
}

/**
 * TODO: Agregar elementos de un arreglo a cardDate (datos Totales)
 */
function pushCard(obj) {
  obj.forEach((element) => {
    cardDate.push(element);
  });
}

/**
 * TODO: Agregar elementos de un arreglo a cardView (datos a visualizar)
 */
function pushCardView(obj) {
  obj.forEach((element) => {
    cardView.push(element);
  });
}

/**
 * TODO: Prepara informacion (carga al inicio de la pagina por unica vez )
 */
function pastEvents() {
  fetch("../data.json")
    .then((response) => response.json())
    .then((json) => {
      let cardView2 = json.events.filter(
        (card) => dateCreate(card.date) < dateCreate(json.currentDate)
      );

      pushCard(cardView2);

      cardView2.forEach((element) => {
        categoryCreate(element.category);
      });
      renderCard(cardDate);
      categoryView();
      iniciarVariables();
    });
}

/**
 * TODO: Render categorias
 */
function categoryView() {
  var check = "";
  var body = document.getElementById("form-search");
  set.forEach((cat) => {
    check += `<div class="col-3 col-sm-5 col-md-2 col-lg-1 form-check form-check-inline ">
                            <input class="form-check-input me-1 mb-1  " type="checkbox"  value = "${cat}" id="${cat}" name="${cat}">
                            <label class="form-check-label" for="${cat}">
                            ${cat}
                            </label>
                        </div>`;
  });
  check += `<div class="col-8 col-sm-8  col-md-7  col-lg-3 align-self-end  form-check-inline  flex-grow-1  ">
                    <input type="search" id="search" class="form-control" placeholder="search" />
                </div>`;
  body.innerHTML = check;
}

/**
 * TODO: pasa  card a string
 */
function cardToString(card) {
  var retorno =
    card._id +
    " " +
    card.name +
    " " +
    card.category +
    " " +
    card.description +
    " " +
    card.place;
  retorno = retorno.toLowerCase();
  return retorno;
}

/**
 * TODO: Agrega elementos al set de categorias 
 */
function categoryCreate(cat) {
  let category = cat.toLowerCase();
  set.add(category);
  return set;
}

/**
 * TODO: inicia variables y listener 
 */
function iniciarVariables() {
  cinema = document.getElementById("cinema");
  food = document.getElementById("food");
  museum = document.getElementById("museum");
  concert = document.getElementById("concert");
  books = document.getElementById("books");
  party = document.getElementById("party");
  race = document.getElementById("race");
  search = document.getElementById("search");

   /**
   ** cinema variable
   */
   try {
    cinema.addEventListener("click", function () {
      View(cinema);
    });
  } catch (TypeError) {
    console.log("no event");
  }
  /**
   ** food variable
   */
  try {
    food.addEventListener("click", function () {
      View(food);
    });
  } catch (TypeError) {
    console.log("no event");
  }
  /**
   ** museum variable
   */
  try {
    museum.addEventListener("click", function () {
      View(museum);
    });
  } catch (TypeError) {
    console.log("no event");
  }
  /**
   ** concert variable
   */
  try {
    concert.addEventListener("click", function () {
      View(concert);
    });
  } catch (TypeError) {
    console.log("no event");
  }
  /**
   ** books variable
   */
  try {
    books.addEventListener("click", function () {
      View(books);
    });
  } catch (TypeError) {
    console.log("no event");
  }
  /**
   ** party variable
   */
  try {
    party.addEventListener("click", function () {
      View(party);
    });
  } catch (TypeError) {
    console.log("no event");
  }
  /**
   ** race variable
   */
  try {
    race.addEventListener("click", function () {
      View(race);
    });
  } catch (TypeError) {
    console.log("no event");
  }
  /**
   * **input variable
   */
  search.addEventListener("input", searchCards);
  search.addEventListener("keydown", (evento) => {
    if (evento.key == "Enter") {
      // Prevenir
      evento.preventDefault();
      return false;
    }
  });
}

/**
 * TODO: Convierte un string a date
 */
function dateCreate(date) {
  let year = date.substring(0, 4);
  let month = date.substring(6, 7);
  let day = date.substring(9, 10);
  return new Date(year, month - 1, day);
}
/**
 * TODO: muestra carte de  busqueda vacia 
 */
function emptySearch() {
  console.log("empty search");
  let cardsFail = "";
  var body = document.getElementById("rows");
  cardsFail += `<div class="col-12 shadow m-1 ">
        <div class="box-img error">
          <img class="card-img " alt="a" src="../assets/img//asd.gif" />
        </div>
     </div>`;

  body.innerHTML = cardsFail;
}
