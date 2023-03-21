const queryString = location.search;
console.log(queryString);
const param = new URLSearchParams(queryString);
console.log(param);
const id = param.get('id')
console.log(id);
let mode = document.getElementById("mode");
let modeView;
 testMode();
function RandomEvents() {
  fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then((response) => response.json())
    .then((json) => {
      let cards = "";
      let body = document.getElementById("rows");

      console.log(id);
      for (x of json.events) {
        if (id == x._id) {
          let porc = x.assistance / x.capacity * 100;
          cards += `
          <div class="card mb-3 shadow m-1">
            <div class="row g-0">
              <div class="col-md-6">
                        <div class="  box-img-datails d-flex" ><img class="card-img-left "
                          alt="${x.name}" src="${x.image}">
                        </div>
              </div>
              <div class="col-md-6">
                <div class="card-body">
                  <h2 class="card-title text-center mb-2 text-uppercase">${x.name}</h2>
                    <p class="card-text  m-4 d-flex align-content-center">
                      <a class="card-text text-end btn rounded-pill border  shadow-sm    p-1 border-1 ${x.category}">${x.category}</a>
                      <strong class="card-text fs-6 align-self-center flex-grow-1 text-end">${x.date}</strong>
                    </p>
                    <p class="card-text  m-2 d-flex align-content-center">
                      <strong class="card-text fs-6 align-self-center   text-end">PLACE: </strong> ${x.place} 
                    </p>
                    <p class="card-text  m-2 d-flex align-content-center">
                      <strong class="card-text fs-6 align-self-center   text-end">CAPACITY: </strong> ${x.capacity} 
                    </p>
                    <p class="card-text  m-2 d-flex align-content-center">
                      <strong class="card-text fs-6 align-self-center   text-end">ASSISTENCE: </strong> ${x.assistance}
                    </p>
                    <div class="progress">
                      <div class="progress-bar" role="progressbar" style="width:  ${porc}% "aria-valuenow="${x.assistance}" aria-valuemin="0" aria-valuemax="${x.capacity}">
                      ${porc}%
                      </div>
                    </div>
                    <h4 class="card-text text-center  p-5  ">${x.description}</h4>
                </div>
              </div>
              <div class="col-md-12">
                <div class="card-footer d-flex">
                  <h6 class="price m-0">${x.price} $</h6><a class="btn btn-primary  " href="./details.html"> BUY</a>
              </div>
              </div>
            </div>
          </div>
          `;
        }
      }
      console.log(cards);
      body.innerHTML = cards;
    });
}
function testMode(){
  if (localStorage.getItem("mode")==null){
    mode.innerHTML = `<span> <i class="bi bi-moon-stars drk"></i></span>`;
    localStorage.setItem("mode", 0);
     modeView=localStorage.getItem("mode");
     let body= document.getElementById("modeColor");
     body.className="dark"
  }if (localStorage.getItem("mode")==1) {
    mode.innerHTML = ` <span><i class="bi bi-brightness-high-fill lgth"></i></span>`;
    localStorage.setItem("mode", 1);
     modeView=localStorage.getItem("mode");
     let body= document.getElementById("modeColor");
     body.className="ligth";

  } else {
    mode.innerHTML = `<span> <i class="bi bi-moon-stars drk"></i></span>`;
    localStorage.setItem("mode", 0);
     modeView=localStorage.getItem("mode");
     let body= document.getElementById("modeColor");
     body.className="dark"
  }
console.log(localStorage.getItem("mode"));
}
function modeChange(){
  if(modeView==1){
    mode.innerHTML = `<span> <i class="bi bi-moon-stars drk"></i></span>`;
    modeView=0;
    localStorage.setItem("mode", 0);
    let body= document.getElementById("modeColor");
    body.className="dark";
  }else{
    mode.innerHTML = `<span> <i class="bi bi-brightness-high-fill lgth"></i></span>`; 
    modeView=1;
    localStorage.setItem("mode", 1);
    let body= document.getElementById("modeColor");
    body.className="ligth";
  }
  console.log(modeView);
}
