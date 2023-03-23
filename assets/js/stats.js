cardAssistance = [];
cardEstimate = [];
capacidad = [];
let setPast = [];
let setUpcoming = [];
let mode = document.getElementById("mode");
let modeView;
 testMode();

stats();
async function stats() {
  try {
    const date = await fetch("https://mindhub-xj03.onrender.com/api/amazing")
    const card = await date.json();
    card.events.forEach(element => {
      try {
        if (element.date < card.currentDate) {
          cardAssistance.push(element);
          if (!setPast.includes(element.category)) {
            setPast.push(element.category);
          }
          capacidad.push(element);
        }
        else {
          cardEstimate.push(element);
          if (!setUpcoming.includes(element.category)) {
            setUpcoming.push(element.category);
          }
        }
      }
      catch (err) {
        console.log(err);
      }
    });
    cardAssistance.sort(function (x, y) {
      if (x.assistance / x.capacity > y.assistance / y.capacity) {
        return -1;
      }
      if (x.assistance / x.capacity < y.assistance / y.capacity) {
        return 1;
      }
      return 0;
    });
    capacidad.sort(function (x, y) {
      if (x.capacity > y.capacity) {
        return -1;
      }
      if (x.capacity < y.capacity) {
        return 1;
      }
      return 0;
    });
    setPast.sort();
    setUpcoming.sort();
    renderStatistics();
    renderTotal();
    mode.addEventListener("click",function(){
      modeChange();
  });

  }
  catch (err) {
    console.log(err);
  }
}

 

function datePast(cat) {
  let ingresos = 0;
  let asistencia = 0;
  let capacidad = 0;
  cardAssistance.forEach(element => {
    if (element.category == cat) {
      ingresos += element.assistance * element.price;
      asistencia += element.assistance;
      capacidad += element.capacity;
    }
  });
  return `
  <tr class="  table-borderless   bg-gradient ">
    <td class="border-0 ps-3 text-danger roundedr text-center fs-6  ">${cat} </td>
    <td class="border-0 ps-4 text-success rounded   text-center fs-6 ">$ ${ingresos.toLocaleString('en-US')}     </td>
    <td class="border-0 ps-3 text-warning rounded text-center fs-6  ">
      <div class="progress style="height: 25px;">
      <div class="progress-bar " role="progressbar" style="width: ${((asistencia / capacidad) * 100).toFixed(2)}%;" aria-valuenow="((asistencia/capacidad )*100).toFixed(2) %" aria-valuemin="0" aria-valuemax="100">${((asistencia / capacidad) * 100).toFixed(2)} %</div>
      </div>
      </td>
  </tr>`
}

function dateFuture(cat) {
  let ingresos = 0;
  let asistencia = 0;
  let capacidad = 0;
  let indice = 0;
  let porcentajes =0;
  cardEstimate.forEach(element => {
    if (element.category == cat) {
      ingresos += element.estimate * element.price;
      asistencia += element.estimate;
      capacidad += element.capacity;
     
    }
  });
  return `
  <tr class="  table-borderless   bg-gradient ">
   <td  class="border-0 ps-3 text-danger roundedr text-center fs-6 ">${cat} </td>
    <td   class="border-0 ps-3 text-success rounded text-center fs-6 ">$ ${ingresos.toLocaleString('en-US')} </td>
    <td   class="border-0 ps-3 text-warning rounded text-center fs-6 ">
      <div  class="progress ">
      <div  class="progress-bar " role="progressbar" style="width: ${((asistencia / capacidad) * 100).toFixed(2)}%;" aria-valuenow="((asistencia/capacidad )*100).toFixed(2) %" aria-valuemin="0" aria-valuemax="100">${((asistencia / capacidad) * 100).toFixed(2)} %</div>
      </div>
    </td>
  </tr>`
}


function renderTotal() {
  let body0 = document.getElementById("past");
  let cardsVieWInner = ` `;
  setPast.forEach(element => {
    cardsVieWInner += datePast(element);
  });
  body0.innerHTML = cardsVieWInner;

  let body1 = document.getElementById("upcoming");
  let cardsVieWInnerupcoming = ` `;
  setUpcoming.forEach(element => {
    cardsVieWInnerupcoming += dateFuture(element);
  });
  body1.innerHTML = cardsVieWInnerupcoming;



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
 }

function renderStatistics() {
  let body = document.getElementById("statistics-table");
  cardsVieWInner =`  
  <!-- tabla 1 -->
  <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-4 pt-1">
    <div class="row pb-1">
      <div
        class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 rounded-pill text-center bg-danger bg-gradient d-flex align-items-center justify-content-center pt-2 pb-1   "
      >
        <h6 > Events whith the highest percentage of altendace </h6>
      </div>
    </div>
    `
for (let index = 0; index < 3; index++) {
  const element = 3;
  cardsVieWInner+=`
  <div class="row p-1 d-flex justify-content-center">
      <div
        class="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 d-flex align-items-center box rounded-start"
      >
        <h6 class = " text-danger">${ index+1} ° </h6>
      </div>
      <div
        class="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 d-flex align-items-center box  "
      >
        <h6 class = " text-danger">${cardAssistance[index].name} </h6>
      </div>
      <div
        class="col-3 col-sm-4 col-md-4 col-lg-4 col-xl-4 d-flex align-items-center box rounded-end  "
      >
        <h6 class =" text-danger">  ( ${((cardAssistance[index].assistance / cardAssistance[index].capacity) * 100).toFixed(2)} %)   </h6>
      </div>
  </div>
  `
  
}
  cardsVieWInner += `</div>
  <!-- tabla 2 -->
  <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-4 pt-1">
    <div class="row p-1">
      <div
        class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 rounded-pill text-center bg-success bg-gradient d-flex align-items-center justify-content-center pt-2 pb-1 "
      >
        <h6> Events whith the lowest percentage of altendace </h6>
      </div>
    </div>`;
    for (let index = 1; index < 4; index++) {
      const element = 3;
      cardsVieWInner+=`
      <div class="row p-1   d-flex justify-content-center   ">
      <div
        class="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 d-flex align-items-center box   rounded-start   "
      >
        <h6 class = "text-success">${cardAssistance.length - index} ° </h6>
      </div>
      <div
        class="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 d-flex align-items-center box   "
      >
        <h6 class = "text-success">${cardAssistance[cardAssistance.length - index].name}  </h6>
      </div>
      <div
        class="col-3 col-sm-4 col-md-4 col-lg-4 col-xl-4 d-flex align-items-center box  rounded-end   "
      >
        <h6 class = "text-success">  ( ${((cardAssistance[cardAssistance.length - index].assistance / cardAssistance[cardAssistance.length - index].capacity) * 100).toFixed(2)} %)  </h6>
      </div>
  </div>
     ` 
    }

   cardsVieWInner += `
    
  </div>
  <!-- tabla 3 -->
  <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-4 pt-1">
    <div class="row p-1 ">
      <div
        class="capacity col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 rounded-pill  text-center bg-warning bg-gradient d-flex align-items-center justify-content-center pt-2 pb-1 "
      >
        <h6>Event whith targe capacity </h6>
      </div>
    </div>`

     for (let index = 0; index < 3; index++) {
      const element = 3;
      cardsVieWInner+=`
    
    <div class="row d-flex justify-content-center p-1">
      <div
        class="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 d-flex align-items-center box rounded-start "
      >
        <h6 class = "text-warning" >${index+1} °</h6>
      </div>
      <div
        class="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 d-flex align-items-center box  "
      >
        <h6  class =" text-warning" >${capacidad[index].name}</h6>
      </div>
      <div
        class="col-3 col-sm-4 col-md-4 col-lg-4 col-xl-4 d-flex align-items-center box rounded-end "
      >
        <h6  class =" text-warning">( <b> ${capacidad[index].capacity.toLocaleString('en-US')}</b> )</h6>
      </div>
    </div>`
     }
   cardsVieWInner+=`</div>
  
  
  `
;
  body.innerHTML = cardsVieWInner;








}