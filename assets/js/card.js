function VolcarDatos() { 
    fetch('./data.js')
        .then((response) => response.json())
        .then((json) => {
            var cards = "";
            var body = document.getElementById("rows") ;
            for (x of json.events) {
                cards+=`<div class="col-12 col-sm-6 col-md-4">
                <div class=" card shadow m-1">
                <div class="box-img"><img class="card-img-top" alt="${x.name}"
                src="${x.image}"></div>
                <div class="card-body">
                    <h4 class="card-title text-center mb-2">${x.name}</h4>
                    <p class="card-text text-center m-4">
                    <p class="card-text   text-start mt-4   "><a
                        class="card-text text-end btn rounded-pill border  shadow-sm    p-1 border-1 ${x.category}">${x.category}</a></p>
                    <strong class="card-text fs-6 ">${x.date}</strong></p>
                    <p class="card-text text-center">${x.description}</p>
                    </div>
                    <div class="card-footer d-flex">
                    <h6 class="price">${x.price} $</h6><a class="btn btn-primary  "> Enter</a>
                </div>
                </div>
                </div>`;
            }
            console.log(cards);
            body.innerHTML=cards;
        });
}

function PastEvents(){
    fetch('./data.js')
    .then((response) => response.json())
    .then((json) => {
        var cards = "";
        var body = document.getElementById("rows") ;
        var date1 = json.currentDate+"";
        var year= date1.substring(0,4);
        var month = date1.substring(6,7);
        var day = date1.substring(9,10);
        var dateToday = new Date(year,month-1,day);
        console.log(dateToday);
        console.log("_____________________________________________");
        for (x of json.events) {
            var date = x.date+"";
            var year= date.substring(0,4);
            var month = date.substring(5,7);
            var day = date.substring(8,10);
            var dateEvents = new Date(year,month-1,day);
                if(dateToday>dateEvents){
                    cards+=`<div class="col-12 col-sm-6 col-md-4">
                <div class=" card shadow m-1">
                <div class="box-img"><img class="card-img-top" alt="${x.name}"
                src="${x.image}"></div>
                <div class="card-body">
                    <h4 class="card-title text-center mb-2">${x.name}</h4>
                    <p class="card-text text-center m-4">
                    <p class="card-text   text-start mt-4   "><a
                        class="card-text text-end btn rounded-pill border  shadow-sm    p-1 border-1 ${x.category}">${x.category}</a></p>
                    <strong class="card-text fs-6 ">${x.date}</strong></p>
                    <p class="card-text text-center">${x.description}</p>
                    </div>
                    <div class="card-footer d-flex">
                    <h6 class="price">${x.price} $</h6><a class="btn btn-primary  "> Enter</a>
                </div>
                </div>
                </div>`;
                }


        }
        console.log(cards);
        body.innerHTML=cards;

    });
}
function UpcomingEvents(){
    fetch('./data.js')
    .then((response) => response.json())
    .then((json) => {
        var date1 = json.currentDate+"";
        var year= date1.substring(0,4);
        var month = date1.substring(6,7);
        var day = date1.substring(9,10);
        var dateToday = new Date(year,month-1,day);
        console.log(dateToday);
        console.log("_____________________________________________");
        for (x of json.events) {
            var date = x.date+"";
            var year= date.substring(0,4);
            var month = date.substring(5,7);
            var day = date.substring(8,10);
            var dateEvents = new Date(year,month-1,day);
                if(dateToday<dateEvents){
                    var body = document.getElementById("rows") ;

                    var contain = document.createElement("div");
                    contain.className="col-12 col-sm-6 col-md-4";
                    var card =document.createElement("div");
                    card.className=" card shadow m-1";
   
                   //img
                   var imgBox = document.createElement("div");
                   imgBox.className="box-img";
                    var img = document.createElement("img");
                   img.className="card-img-top";
                   img.alt=x.name;
                   img.src= x.image;
                   imgBox.appendChild(img);
   
                   //Body
                    var cardBody = document.createElement("div");
                    cardBody.className="card-body";
                   //title
                    var title = document.createElement("h4");
                    title.className="card-title text-center mb-2";
                    title.append(x.name);
                    cardBody.appendChild(title);
   
                   //data
                    var data = document.createElement("p")
                    data.className="card-text text-center m-4";
   
                    //category
                    var category = document.createElement("p")
                    category.className="card-text   text-start mt-4   " ; 
                    var categoryStrong = document.createElement("a");
                    categoryStrong.className="card-text text-end btn rounded-pill border  shadow-sm    p-1 border-1 " + x.category;
                    categoryStrong.append(  x.category  );
                    category.append(categoryStrong);
                    data.appendChild(category);
   
                   //date
                   var date = document.createElement("p")
                    date.className="card-text text-center m-4";
                    var dateStrong = document.createElement("strong")
                    dateStrong.className="card-text fs-6 ";
                    dateStrong.append(  x.date  );
                    data.appendChild(dateStrong); 
                    cardBody.appendChild(data);
                   //paragraph
                    var description = document.createElement("p")
                    description.className="card-text text-center";
                   description.append(x.description);
                   cardBody.appendChild(description);          
                   //FOOTER
                   var cardFooter = document.createElement("div");
                   cardFooter.className="card-footer d-flex";
                   var price = document.createElement("h6");
                   price.className="price";
                   price.append(x.price+" $");
                   var btn = document.createElement("a");
                   btn.className="btn btn-primary  ";
                   btn.append( " Enter");
                   cardFooter.appendChild(price);
                   cardFooter.appendChild(btn);
                   card.appendChild(imgBox);
                   card.appendChild(cardBody);
                   card.appendChild(cardFooter);
                   contain.appendChild(card);              
                   body.appendChild(contain);




                       
                }
             
            
           
            
                
            
                
                 
             
            

        }

    });
}
function test(){
    fetch('./data.json')
    .then((response) => response.json())
    .then((json) => { 
        for (let x of json.events) {
            console.log(`${x._id}`);



        }
        


    });




}


