//Cattura Elementi

const mostra = document.querySelector("#mostra");
const aggiungi = document.querySelector("#aggiungi");
const modifica = document.querySelector("#modifica");
const elimina = document.querySelector("#elimina");
const newName = document.querySelector("#newName");
const newNumber = document.querySelector("#newNumber");
const olDname = document.querySelector("#olDname");
const newModName = document.querySelector("#newModName");
const newModTel = document.querySelector("#newModTel");
const boxContatti = document.querySelector(".box-contatti");
const aggiorna = document.querySelector(".aggiorna");
const contactForm = document.querySelector("#contactForm");
const submitBtn =  document.querySelector("#submitBtn");

//Object Rubrica
const rubrica = {
    contatti : [
        {nome : "John Connor", tel : "99999999"},
        {nome : "Sarah Connor", tel : "99999998"},
        {nome : "Kyle Rees", tel : "99999997"},
    ],

    mostraContatti : function(){
        boxContatti.innerHTML = "";
        this.contatti.forEach(contatto => {
            let appendCard = document.createElement("div")
            appendCard.innerHTML = `
         <div class="card my-3">
            <div class="card-body d-flex py-2 px-3">
              <span class="text-start">Nome: ${contatto.nome}</span>
              <span>Tel: ${contatto.tel}</span>
                 <div>
                  <i class="fa-solid fa-arrows-rotate modicons ms-5"></i>
                  <i class="fa-regular fa-trash-can icons ms-2"></i>
                 </div>
            </div>
         </div>
          `
          boxContatti.appendChild(appendCard);
        });
        let icons = document.querySelectorAll(".icons");
          icons.forEach((icon, i)=>{
             icon.addEventListener('click', ()=>{
                this.contatti.splice(i, 1);
                this.mostraContatti();
            });
        });
        let modicons = document.querySelectorAll(".modicons");
         modicons.forEach((modicon, i)=>{
            
            modicon.addEventListener('click', ()=>{
                if (newName.value && newNumber.value){
                console.log(this.contatti[i]);
                this.contatti[i]={nome: newName.value, tel: newNumber.value};
                this.mostraContatti();
                newName.value = "";
                newNumber.value = "";            
                }else{
                    alert("Almeno un campo vuoto");
                }
            });
            modicon.addEventListener('mouseover', ()=> {
                newName.classList.add('flashing');
                newNumber.classList.add('flashing');
            });
            
            modicon.addEventListener('mouseout', ()=> {
                newName.classList.remove('flashing');
                newNumber.classList.remove('flashing');
            });
        });

    },

    aggiungiContatto : function(newName, newNumber){
        this.contatti.push({nome: newName, tel: newNumber});
        this.mostraContatti();
        if (mostraNascondi){
            mostra.innerText = "Nascondi Contatti";
            mostraNascondi = false;
        }
    },

    eliminaContatto: function(deleteName){
       let justNames =  this.contatti.map((contatto) => contatto.nome);
       let index = justNames.indexOf(deleteName);
       if (index >= 0){
            if (mostraNascondi){
            mostra.innerText = "Nascondi Contatti";
            mostraNascondi = false;
            }
       this.contatti.splice(index, 1);
       this.mostraContatti();
        }else{
            alert("Non presente in rubrica");
        }
    },

    modificaContatto: function(olDname, newModName, newModTel){
       let justNames =  this.contatti.map((contatto) => contatto.nome);
       let index = justNames.indexOf(olDname);
       if(olDname && newModName && newModTel){
            if(index >= 0){
            this.contatti[index] = {nome: newModName, tel: newModTel};
            this.mostraContatti();
            }else{
            alert("Nome non presente in rubrica");}
        }else{
        alert("almeno un campo vuoto");
        }
    }
}
//Fine Object Rubrica
            
let mostraNascondi = true;
mostra.addEventListener('click', ()=>{
    if (mostraNascondi){
        rubrica.mostraContatti();
        mostra.innerText = "Nascondi Contatti";
        mostraNascondi = false;
    }else{
        boxContatti.innerHTML = "";
        mostra.innerText = "Mostra Contatti";
        mostraNascondi = true;
    }
});

aggiungi.addEventListener('click', ()=>{
    if(newName.value && newNumber.value){
    rubrica.aggiungiContatto(newName.value, newNumber.value);
    newName.value = "";
    newNumber.value = "";
    }else{
    alert("almeno un campo vuoto");
    }
    
});

elimina.addEventListener('click', ()=> {
    rubrica.eliminaContatto(newName.value);
    newName.value = "";
});
    
aggiorna.addEventListener('click', ()=>{
    rubrica.modificaContatto(olDname.value, newModName.value, newModTel.value);
    
});

document.getElementById('contactForm').addEventListener('input', ()=> {
    let justNames =  rubrica.contatti.map((contatto) => contatto.nome);
    let index = justNames.indexOf(olDname.value);
    console.log(justNames);
    console.log(index);
    if(index !=-1 && newModName.value && newModTel.value){
        submitBtn.removeAttribute('disabled');
    }
 });

 modifica.addEventListener('click', ()=> {
    olDname.value = "";
    newModName.value = "";
    newModTel.value = "";
    submitBtn.setAttribute('disabled', '');
});

aggiungi.addEventListener('mouseover', ()=> {
    newName.classList.add('flashing');
    newNumber.classList.add('flashing');
});

aggiungi.addEventListener('mouseout', ()=> {
    newName.classList.remove('flashing');
    newNumber.classList.remove('flashing');
});

elimina.addEventListener('mouseover', ()=> {
    newName.classList.add('flashing');
    newNumber.classList.add('flashing');
});

elimina.addEventListener('mouseout', ()=> {
    newName.classList.remove('flashing');
    newNumber.classList.remove('flashing');
});