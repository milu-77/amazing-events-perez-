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

function renderStatistics() {
  let body = document.getElementById("events");
  let cardsVieWInner = `
        <tr class="  table-borderless   bg-gradient ">
          <th class="border-0    " scope="row" id="ranking">1</th>
          <td class="border-0 ps-3 text-danger roundedr fs-6 ">${cardAssistance[0].name} </td>
          <td class="border-0 pe-1 text-danger rounded text-end fs-6 "><b> ( ${((cardAssistance[0].assistance / cardAssistance[0].capacity) * 100).toFixed(2)} %) </b></td>

          <td class="border-0 ps-3 text-success rounded fs-6 ">${cardAssistance[cardAssistance.length - 1].name} </td>
          <td class="border-0 pe-1 text-success rounded text-end fs-6 "> <b> ( ${((cardAssistance[cardAssistance.length - 1].assistance / cardAssistance[cardAssistance.length - 1].capacity) * 100).toFixed(2)} %)</b></td>

          <td class="border-0 ps-3 text-warning rounded fs-6 ">${capacidad[0].name}</td>
          <td class="border-0 pe-1 text-warning rounded text-end fs-6 "><b> ( ${capacidad[0].capacity.toLocaleString('en-US')})</b></td>

        </tr>
      <tr class="  table-borderless     rounded   bg-gradient  ">
        <th class="border-0" id="ranking" scope="row" >2</th>
        <td class="border-0 rounded ps-3 text-danger rounded fs-6 ">${cardAssistance[1].name} </td>
        <td class="border-0 pe-1 text-danger rounded text-end fs-6 "><b> ( ${((cardAssistance[1].assistance / cardAssistance[1].capacity) * 100).toFixed(2)} %) </b></td>

        <td class="border-0 ps-3 text-success rounded fs-6 ">${cardAssistance[cardAssistance.length - 2].name} </td>
        <td class="border-0 pe-1 text-success rounded text-end fs-6 "> <b> ( ${((cardAssistance[cardAssistance.length - 2].assistance / cardAssistance[cardAssistance.length - 2].capacity) * 100).toFixed(2)} %) </b></td>

        <td class="border-0 ps-3 text-warning rounded fs-6 ">${capacidad[1].name}</td>
        <td class="border-0 pe-1 text-warning rounded text-end fs-6 " > <b> ( ${capacidad[1].capacity.toLocaleString('en-US')})</b></td>

      </tr>
      <tr class=" table-borderless   bg-gradient">
        <th class="border-0 " id="ranking" scope="row">3</th>
        <td class="border-0 ps-3 text-danger rounded fs-6  " >${cardAssistance[2].name}</td>
        <td class="border-0 pe-1 text-danger rounded text-end fs-6 "> <b> ( ${((cardAssistance[2].assistance / cardAssistance[2].capacity) * 100).toFixed(2)} %) </b></td>

        <td class="border-0 ps-3 text-success rounded fs-6 " >${cardAssistance[cardAssistance.length - 3].name} </td>
        <td class="border-0 pe-1 text-success rounded text-end fs-6 " > <b> ( ${((cardAssistance[cardAssistance.length - 3].assistance / cardAssistance[cardAssistance.length - 3].capacity) * 100).toFixed(2)} %) </b></td>

        <td class="border-0 ps-3 text-warning rounded fs-6 ">${capacidad[2].name}</td>
        <td class="border-0 pe-1 text-warning rounded text-end fs-6 "><b>  ( ${capacidad[2].capacity.toLocaleString('en-US')} )</b></td>
      </tr>
        `;
  body.innerHTML = cardsVieWInner;
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

// function exportTableToExcel(tableID){
//   let filename=`stat Events ${tableID}.xls`;
//   let link;
//   let dataType = 'application/vnd.ms-excel';
//   let tableSelect = document.getElementById(tableID);
//   let tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');  
//    console.log(tableHTML);
//   link = document.createElement("a");
  
//   document.body.appendChild(link);
  
//   if(navigator.msSaveOrOpenBlob){
//       let blob = new Blob(['ufeff', tableHTML], {
//           type: dataType
//       });
//       navigator.msSaveOrOpenBlob( blob, filename);
//   }else{
//       // Create a link to the file
//       link.href = 'data:' + dataType + ', ' + tableHTML;
  
//       // Setting the file name
//       link.download = filename;
      
//       //triggering the function
//       link.click();
//   }
// }