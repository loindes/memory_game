 function init() {
    const kartice = document.querySelectorAll(".kartica");

    let vecKliknutaKartica = false;
    let visestrukoKlikanje = false;
    let prvaKliknuta, drugaKliknuta;
    let brojacPokusaja = 0;
   
    function okreniKarticu() {
        //da se onemogući otvaranje više od 2 kartice odjednom
        if (visestrukoKlikanje) return;
        //onemogućavanje višestrukog klikanja na istu karticu jer će otići u krivu petlju
        if (this === prvaKliknuta) return;
   
        this.classList.add("okrenuta");
   
        if (!vecKliknutaKartica) {
            //prvi klik
            vecKliknutaKartica = true;
            prvaKliknuta = this;
   
            return;
        }  
       //drugi klik
       vecKliknutaKartica = false;
       drugaKliknuta = this;
   
       provjeraKartica();
    }
   
    function provjeraKartica() {
       //brojač iteracija       
       brojacPokusaja += 1;
       let h2Tag = document.getElementById("input");
       h2Tag.innerHTML = brojacPokusaja;
       
       //usporedba kartica
       let usporedbaKartica = prvaKliknuta.dataset.name === drugaKliknuta.dataset.name;
       usporedbaKartica ? onemoguciKlik() : okreniKarteNazad();
    }
   
    function onemoguciKlik() {
       prvaKliknuta.removeEventListener("click", okreniKarticu);
       drugaKliknuta.removeEventListener("click", okreniKarticu);

       resetirajVrijednosti()
    }
   
    function okreniKarteNazad() {
       visestrukoKlikanje = true;
   
       setTimeout(() => {
           prvaKliknuta.classList.remove("okrenuta");
           drugaKliknuta.classList.remove("okrenuta");
   
           resetirajVrijednosti()
          }, 1500);
    }
   
    //resetiranje vrijednosti u varijablama
   function resetirajVrijednosti(){
       [vecKliknutaKartica, visestrukoKlikanje] = [false, false];
       [prvaKliknuta, drugaKliknuta] = [null, null];
   }
   
   //random brojevi za svaku karticu + order (zato je section {display="flex"}) 
   (function izmjesaj() {
       kartice.forEach( kartica => {
           let randomBroj = Math.floor(Math.random() * 8);
           kartica.style.order = randomBroj;
       })
   })();
  
    //event listener za klik na kartice
    kartice.forEach(kartica => kartica.addEventListener("click", okreniKarticu));
 }


 //resetiraj ploču
 function resetIgre() {
    let resetItema = document.querySelectorAll(".okrenuta");
    
    resetItema.forEach( item => {
        item.classList.remove("okrenuta");
    })

    let h2Tag = document.getElementById("input");
    h2Tag.innerHTML = "_";
    //odgoda početka nove igre dok se sve kartice ne vrate u početno stanje zbog razmještaja
    setTimeout(() => {
        init();
    }, 500); 
 }




 //promijeni pozadinu kartica
 function init2() {  
 const buttons = document.querySelectorAll(".meni-btn");
 let sveKartice = document.querySelectorAll(".straznja-strana");
 let kliknutiButton;

  function provjeriValue(){
    imeButtona = this.getAttribute("name");
    
    if (imeButtona === "zima") {
        sveKartice.forEach( kartica => {              
            kartica.src = "pictures2/winter.jpg";       
        })
    } else if (imeButtona === "proljece") {
        sveKartice.forEach( kartica => {              
            kartica.src = "pictures2/spring.jpg";       
        })
    } else if (imeButtona === "ljeto") {
        sveKartice.forEach( kartica => {              
            kartica.src = "pictures2/summer.jpg";       
        })
    } else if (imeButtona === "jesen") {
        sveKartice.forEach( kartica => {              
            kartica.src = "pictures2/autumn.jpg";       
        })
    } else {
        sveKartice.forEach( kartica => {              
            kartica.src = "Pictures/memoryCard.png";       
        })
    }     
 }

buttons.forEach( button => button.addEventListener("click", provjeriValue));
}


//padajući izbornik
function padajuciIzbornik() {
    var button = document.querySelectorAll(".meni-btn");

    button.forEach(i => i.classList.toggle("visible"));    
}







 //stopwatch na svaki par s ispisom sekundi + overall time