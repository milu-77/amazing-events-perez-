


stats();
print();

 async function stats() { 
    try {
    const date =  await fetch("https://mindhub-xj03.onrender.com/api/amazing")
        console.log(date);
        const card = await date.json();
         card.events.forEach(element => {
            try{element.assistance
                 if(element.assistance != undefined) {
                    console.log(element.name+" : "+ ((element.assistance/element.capacity)*100).toFixed(2) + " %")
                 }
                 else {
                    console.log(element.name+" : "+ ((element.estimate/element.capacity)*100).toFixed(2) + " % -" + element.date)
                 }

                

            }
            catch(err){
                console.log(err);
            }

        });  

    //   .then((response) =>  response.json() )
    //   .then(json => console.log(json)  )
//       .then((json) => {
//         let cardView2 = json.events.filter(
//           (card) => dateCreate(card.date) >= dateCreate(json.currentDate)
//         );
//         pushCard(cardView2);
//         cardView2.forEach((element) => {
//           categoryCreate(element.category);
//         });
//         renderCard(cardDate);
//         categoryView();
//         iniciarVariables();
//       });
//       .catch(err) {
//         console.log(err);
       }
       catch (err) {
        console.log(err);
       }
   } 
   function print(){
    console.log("hola perro");
   }