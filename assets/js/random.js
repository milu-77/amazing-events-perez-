function getRandomInt() {
    min = Math.ceil(1);
    max = Math.floor(15);
    return Math.floor(Math.random() * (max - min) + min);
  }


function RandomEvents(){
    fetch('./data.json')
    .then((response) => response.json())
    .then((json) => {
        var cards = "";
        var body = document.getElementById("rows") ;
        var id = getRandomInt();
        console.log(id);
        for (x of json.events) {
                if(id==x._id){
                    var porc= x.assistance/x.capacity*100;
                    cards+=` <div class="card mb-3 shadow m-1">
                    <div class="row g-0">
                      <div class="col-md-6">
                        <div class="  box-img-datails d-flex" ><img class="card-img-left "
                            alt="${x.name}" src="${x.image}"></div>
                      </div>
                      <div class="col-md-6">
                        <div class="card-body">
                          <h2 class="card-title text-center mb-2 text-uppercase">${x.name}</h2>
                          <p class="card-text  m-4 d-flex align-content-center">
                            <a
                              class="card-text text-end btn rounded-pill border  shadow-sm    p-1 border-1 ${x.category}">${x.category}</a>
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
                            <div class="progress-bar" role="progressbar" style="width:  ${porc}% "aria-valuenow="${x.assistance}" aria-valuemin="0" aria-valuemax="${x.capacity}"></div>
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
                  </div>`;
                }
        }
        console.log(cards);
        body.innerHTML=cards;
    });
}