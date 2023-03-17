cardAssistance=[];
cardEstimate=[];
capacidad=[];
let setPast = new Set();
let setUpcoming = new Set();


stats();
 async function stats() {
    try {
    const date =  await fetch("https://mindhub-xj03.onrender.com/api/amazing")
         const card = await date.json();
         card.events.forEach(element => {
            try{
                 if(element.date < card.currentDate) {
                    cardAssistance.push(element);
                    capacidad.push(element);
                    setPast.add(element.category);
                  }
                 else {
                     cardEstimate.push(element);
                    setUpcoming.add(element.category);
                }
            }
            catch(err){
                console.log(err);
            }
        });
        cardAssistance.sort(function (x, y) {
            if ( x.assistance/x.capacity > y.assistance/y.capacity ) {
                return -1;
            }
            if ( x.assistance/x.capacity < y.assistance/y.capacity ) {
                return 1;
            }
            return 0;
        });
          capacidad.sort(function (x, y) {
            if ( x.capacity > y.capacity ) {
                return -1;
            }
            if ( x.capacity < y.capacity ) {
                return 1;
            }
            return 0;
        });
        renderStatistics();
        renderTotal();
       }
       catch (err) {
        console.log(err);
       }
   }

    function renderStatistics() {
    var body = document.getElementById("events");

    let cardsVieWInner = `
        <tr class="  table-borderless bg-light bg-gradient ">
        <th class="border-0  " scope="row">1</th>
        <td class="border-0 ps-3 text-danger roundedr">${cardAssistance[0].name} </td>
        <td class="border-0 pe-1 text-danger rounded text-end"><b> ( ${((cardAssistance[0].assistance/cardAssistance[0].capacity)*100).toFixed(2)} %) </b></td>

        <td class="border-0 ps-3 text-success rounded">${cardAssistance[cardAssistance.length -1].name} </td>
        <td class="border-0 pe-1 text-success rounded text-end"> <b> ( ${((cardAssistance[cardAssistance.length -1].assistance/cardAssistance[cardAssistance.length -1].capacity)*100).toFixed(2)} %)</b></td>

        <td class="border-0 ps-3 text-warning rounded">${capacidad[0].name}</td>
        <td class="border-0 pe-1 text-warning rounded text-end"><b> ( ${capacidad[0].capacity})</b></td>

      </tr>
      <tr class="  table-borderless     bg-gradient  ">
        <th class="border-0" scope="row">2</th>
        <td class="border-0 ps-3 text-danger rounded">${cardAssistance[1].name} </td>
        <td class="border-0 pe-1 text-danger rounded text-end"><b> ( ${((cardAssistance[1].assistance/cardAssistance[1].capacity)*100).toFixed(2)} %) </b></td>

        <td class="border-0 ps-3 text-success rounded">${cardAssistance[cardAssistance.length -2].name} </td>
        <td class="border-0 pe-1 text-success rounded text-end"> <b> ( ${((cardAssistance[cardAssistance.length -2].assistance/cardAssistance[cardAssistance.length -2].capacity)*100).toFixed(2)} %) </b></td>

        <td class="border-0 ps-3 text-warning rounded">${capacidad[1].name}</td>
        <td class="border-0 pe-1 text-warning rounded text-end" > <b> ( ${capacidad[1].capacity})</b></td>

      </tr>
      <tr class=" table-borderless bg-light bg-gradient">
        <th class="border-0 " scope="row">3</th>
        <td class="border-0 ps-3 text-danger rounded " >${cardAssistance[2].name}</td>
        <td class="border-0 pe-1 text-danger rounded text-end"> <b> ( ${((cardAssistance[2].assistance/cardAssistance[2].capacity)*100).toFixed(2)} %) </b></td>

        <td class="border-0 ps-3 text-success rounded" >${cardAssistance[cardAssistance.length -3].name} </td>
        <td class="border-0 pe-1 text-success rounded text-end" > <b> ( ${((cardAssistance[cardAssistance.length -3].assistance/cardAssistance[cardAssistance.length -3].capacity)*100).toFixed(2)} %) </b></td>

        <td class="border-0 ps-3 text-warning rounded">${capacidad[2].name}</td>
        <td class="border-0 pe-1 text-warning rounded text-end"><b>  ( ${capacidad[2].capacity} )</b></td>
      </tr>
        `;
    body.innerHTML = cardsVieWInner;
  }

function datePast(cat){
   var ingresos=0;
  var asistencia=0;
  var capacidad=0;
  cardAssistance.forEach(element => {
    if(element.category==cat){
      ingresos+= element.assistance*element.price;
      asistencia+=element.assistance;
      capacidad+=element.capacity;
    }
  });
   return `<tr class="  table-borderless bg-light bg-gradient ">
   <td class="border-0 ps-3 text-danger roundedr text-center fs-5  ">${cat} </td>
  <td class="border-0 ps-3 text-success rounded text-center fs-5  ">${ingresos} </td>
  <td class="border-0 ps-3 text-warning rounded text-center fs-5  ">${((asistencia/capacidad )*100).toFixed(2)} %</td>
</tr>`
}

function dateFuture(cat){
   var ingresos=0;
  var asistencia=0;
  var capacidad=0;
  cardEstimate.forEach(element => {
    if(element.category==cat){
      ingresos+= element.estimate*element.price;
      asistencia+=element.estimate;
      capacidad+=element.capacity;
    }
  });
   return `<tr class="  table-borderless bg-light bg-gradient ">
   <td class="border-0 ps-3 text-danger roundedr text-center">${cat} </td>
  <td class="border-0 ps-3 text-success rounded text-center">${ingresos} </td>
  <td class="border-0 ps-3 text-warning rounded text-center">${((asistencia/capacidad )*100).toFixed(2)} %</td>
 
</tr>`
}


function renderTotal(){
var body0 = document.getElementById("past");
let cardsVieWInner = ` `;
setPast.forEach(element => {
  cardsVieWInner += datePast(element);
});
 body0.innerHTML = cardsVieWInner;

 var body1 = document.getElementById("upcoming");
 let cardsVieWInnerupcoming = ` `;
 setUpcoming.forEach(element => {
  cardsVieWInnerupcoming += dateFuture(element);
 });
  body1.innerHTML = cardsVieWInnerupcoming;



}