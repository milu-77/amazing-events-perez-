 
//crea una instancia de Vue
const { createApp } = Vue;

createApp({
  //define el estado de la aplicación
  data() {
    return {
      message: "¡Hola, Mundo!",
      info: null,
      cardAssistance: [],
      cardEstimate: [],
    };
  },
      async created  ()  {
    const date = await fetch("https://mindhub-xj03.onrender.com/api/amazing");
    const card = await date.json();
     
      try{
        card.events.forEach((element) => {
          if (element.assistance != undefined) {
            this.cardAssistance.push(element);
            //console.log(element.name+" : "+ ((element.assistance/element.capacity)*100).toFixed(2) + " %")
          } else {
            //console.log(element.name+" : "+ ((element.estimate/element.capacity)*100).toFixed(2) + " % -" + element.date)
            this.cardEstimate.push(element);
          }
      });
      this.cardAssistance.sort(function (x, y) {
          if (x.assistance / x.capacity > y.assistance / y.capacity) {
            return -1;
          }
          if (x.assistance / x.capacity < y.assistance / y.capacity) {
            return 1;
          }
          return 0;
      });
      this.cardEstimate.sort(function (x, y) {
          if (x.capacity > y.capacity) {
            return -1;
          }
          if ( x.capacity < y.capacity) {
            return 1;
          }
          return 0;
      });
      }catch(error){
        console.log(error);


      }
     
    },
   
    methods: {
      categoryTotal(cat){
        let total=0;
        this.cardAssistance.forEach(element => {
          if(element.category==cat){
            total
          }
          
        });
        return total;
      }
    },
  
   

  //inicializa la instancia de Vue
}).mount("#app");

  








 