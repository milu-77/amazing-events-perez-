function UpcomingEvents() {
    fetch('./data.json')
        .then((response) => response.json())
        .then((json) => {
            var date1 = json.currentDate + "";
            var year = date1.substring(0, 4);
            var month = date1.substring(6, 7);
            var day = date1.substring(9, 10);
            var dateToday = new Date(year, month - 1, day);
            console.log(dateToday);
            console.log("_____________________________________________");
            for (x of json.events) {
                var date = x.date + "";
                var year = date.substring(0, 4);
                var month = date.substring(5, 7);
                var day = date.substring(8, 10);
                var dateEvents = new Date(year, month - 1, day);
                if (dateToday < dateEvents) {
                    var body = document.getElementById("rows");
                    var contain = document.createElement("div");
                    contain.className = "col-12 col-sm-6 col-md-4";
                    var card = document.createElement("div");
                    card.className = " card shadow m-1";

                    //img
                    var imgBox = document.createElement("div");
                    imgBox.className = "box-img";
                    imgBox.style = "background-image: url('" + x.image + "')";
                    var img = document.createElement("img");
                    img.className = "card-img-top";
                    img.alt = x.name;
                    img.src = x.image;
                    imgBox.appendChild(img);

                    //Body
                    var cardBody = document.createElement("div");
                    cardBody.className = "card-body";

                    //title
                    var title = document.createElement("h4");
                    title.className = "card-title text-center mb-2 text-uppercase ";
                    title.append(x.name);
                    cardBody.appendChild(title);

                    //data
                    var data = document.createElement("p")
                    data.className = "card-text text-center m-4 d-flex align-content-center";

                    //category
                    var categoryStrong = document.createElement("a");
                    categoryStrong.className = "card-text text-end btn rounded-pill border  shadow-sm    p-1 border-1 " + x.category;
                    categoryStrong.append(x.category);
                    data.appendChild(categoryStrong);

                    //date
                    var date = document.createElement("p")
                    date.className = "card-text text-center m-4  ";
                    var dateStrong = document.createElement("strong")
                    dateStrong.className = "card-text fs-6 align-self-center flex-grow-1 text-end";
                    dateStrong.append(x.date);
                    data.appendChild(dateStrong);
                    cardBody.appendChild(data);

                    //paragraph
                    var description = document.createElement("p")
                    description.className = "card-text text-center";
                    description.append(x.description);
                    cardBody.appendChild(description);

                    //FOOTER
                    var cardFooter = document.createElement("div");
                    cardFooter.className = "card-footer d-flex";
                    var price = document.createElement("h6");
                    price.className = "price m-0";
                    price.append(x.price + " $");
                    var btn = document.createElement("a");
                    btn.className = "btn btn-primary  ";
                    btn.href= "./details.html";
                    btn.append("More Info");
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