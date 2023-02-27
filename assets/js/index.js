function allDate() {
    //fetch('./data.json')
    fetch('./data.json')
        .then((response) => response.json())
        .then((json) => {
            var cards = "";
            var body = document.getElementById("rows") ;
            for (x of json.events) {
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
                    <p class="card-text text-center  ">${x.description}</p>
                    </div>
                    <div class="card-footer d-flex">
                    <h6 class="price m-0">${x.price} $</h6><a class="btn btn-primary  " href="./details.html"> More Info</a>
                </div>
                </div>
                </div>`;
            }
            console.log(cards);
            body.innerHTML=cards;
        });
}


