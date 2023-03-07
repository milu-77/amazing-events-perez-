let cardDate =[] ;
let cardView =[];
let set = new Set();
let cinema = document.getElementById("cinema");
let food = document.getElementById("food");
let museum = document.getElementById("museum");
let concert = document.getElementById("concert");
let books = document.getElementById("books");
let party = document.getElementById("party");
let race = document.getElementById("race");
let search = document.getElementById("search");

cinema.addEventListener('click',function() { View(cinema)});
food.addEventListener('click',function() { View(food)}  );
museum.addEventListener('click',function() { View(museum)}  );
concert.addEventListener('click',function() { View(concert)}  );
books.addEventListener('click',function() { View(books)}  );
party.addEventListener('click',function() { View(party)}  );
race.addEventListener('click',function() { View(race)}  );

search.addEventListener('input', searchCards  );

function searchCards(){
    cleanView()
      let cardView2 =   cardDate.filter(card=>  checkCard(card) ==true ) ;
       pushCard(cardView2);
       printDate();
        console.log(cardDate);
        
}

function checkCard(card){
    var str =cardToString(card);
    regex = new RegExp(search.value.toLowerCase());
      var result =  regex.test(str);
    return result ; 
}

function  View(cat){
     
    if(cat.checked){
        let cardView2 =   cardDate.filter(card=> card.category.toLowerCase()==cat.value.toLowerCase()) ;
        pushCard(cardView2);
        printDate()
     }else{
         let cardView2 =   cardView.filter(card=> card.category.toLowerCase() != cat.value.toLowerCase());
         cleanView();
        pushCard(cardView2);
        if(cardView2.length==0){
             UpcomingEvents()
        }else{
            printDate();
        }
      }
}

function printDate(){
    var body = document.getElementById("rows") ;
    let cardsVieWInner=""
    for (x of cardView) {
        cardsVieWInner+=`<div class="col-12 col-sm-6 col-md-4">
        <div class=" card shadow m-1">
        <div class="  box-img " style="background-image: url('${x.image}')" ><img class="card-img-top "  alt="${x.name}"
        src="${x.image}"></div>
        <div class="card-body">
            <h4 class="card-title text-center mb-2 text-uppercase">${x.name}</h4>
            <p class="card-text  m-4 d-flex align-content-center" >
             <a class="card-text text-end btn rounded-pill border  shadow-sm    p-1 border-1 ${x.category}"
                  >${x.category}</a>
            <strong class="card-text fs-6 align-self-center flex-grow-1 text-end">${x.date}</strong></p>
            <p class="card-text text-center  ">${x.description}</p>
            </div>
            <div class="card-footer d-flex">
            <h6 class="price m-0">${x.price} $</h6><a class="btn btn-primary  " href="./details.html?id=${x._id}"> More Info</a>
        </div>
        </div>
        </div>`;
    }
     body.innerHTML=cardsVieWInner;

}
function cleanDate(){
    //cardDate.splice(0,cardDate.length);
     cardDate=[];
}
function cleanView(){
    cardView=[];
}

function pushCard(obj){
    obj.forEach(element => {
        cardView.push(element);
    });
}
function pushCardTotal(card){
        cardDate.push(card);
}

function UpcomingEvents() {
     cleanDate();
    cleanView();
    fetch('./data.json')
        .then((response) => response.json())
        .then((json) => {
            var cards = "";
        var body = document.getElementById("rows") ;
        var date1 = json.currentDate+"";
        var year= date1.substring(0,4);
        var month = date1.substring(6,7);
        var day = date1.substring(9,10);
        var dateToday = new Date(year,month-1,day);
        for (x of json.events) {
            var date = x.date+"";
            var year= date.substring(0,4);
            var month = date.substring(5,7);
            var day = date.substring(8,10);
            var dateEvents = new Date(year,month-1,day);
                if(dateToday<dateEvents){
                    pushCardTotal(x);
                    categoryCreate (x.category);
                    cards+=`<div class="col-12 col-sm-6 col-md-4">
                    <div class=" card shadow m-1">
                    <div class="  box-img " style="background-image: url('${x.image}')" ><img class="card-img-top "  alt="${x.name}"
                    src="${x.image}"></div>
                    <div class="card-body">
                        <h4 class="card-title text-center mb-2 text-uppercase">${x.name}</h4>
                        <p class="card-text  m-4 d-flex align-content-center" >
                         <a class="card-text text-end btn rounded-pill border  shadow-sm    p-1 border-1 ${x.category}"
                              >${x.category}</a>
                        <strong class="card-text fs-6 align-self-center flex-grow-1 text-end">${x.date}</strong></p>
                        <p class="card-text text-center">${x.description}</p>
                        </div>
                        <div class="card-footer d-flex">
                        <h6 class="price m-0">${x.price} $</h6><a class="btn btn-primary  " href="./details.html?id=${x._id}">More Info</a>
                    </div>
                    </div>
                    </div>`;
                }
        }
         body.innerHTML=cards;         
         categoryView ;
        });
 }

function categoryView (){
    console.log("categoryView");
    var check = "";
             var body = document.getElementById("form-search") ;
             set.forEach(cat => {
                console.log(cat);
                check+= `<div class="col-3 col-sm-5 col-md-2 col-lg-1 form-check form-check-inline ">
                            <input class="form-check-input me-1 mb-1  " type="checkbox" value="${cat}" id="${cat}" name="${cat}">
                            <label class="form-check-label" for="${cat}">
                            ${cat}
                            </label>
                        </div>`
        });
        check+= `<div class="col-8 col-sm-8  col-md-7  col-lg-3 align-self-end  form-check-inline  flex-grow-1  ">
                    <input type="search" id="search" class="form-control" placeholder="search" />
                </div>`; 
        body.innerHTML=check; 
}
function cardToString(card){
    var retorno =   card._id + " " + card.name + " " + card.category + " " + card.description + " " + card.place ;
    retorno = retorno.toLowerCase();
    return retorno;
}

function categoryCreate (cat){ 
    let category =cat.toLowerCase()
            set.add(category)

    console.log(set);
    return set;
}