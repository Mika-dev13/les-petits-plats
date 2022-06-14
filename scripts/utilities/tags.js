import { RECIPES } from "../data/recipes.js";

const tagList = document.querySelector(".tag-list");

export default class ListContent {

    constructor(nameTag) {
        this.nameTag = nameTag
        this.dataList = []
        this.dropDownContainer = document.getElementById(nameTag);
        this.tagList = document.querySelector(`#${nameTag} ul`);
        this.searchTagContent = document.querySelector(`#${nameTag} .search-tag-content`);
        this.inputDropDown = document.querySelector(`#${nameTag} .input-search-filter`);
        this.textDropDown = document.querySelector(`#${nameTag} .text-search-filter`);
        this.liTagList = document.querySelectorAll(".tag-list li");
        this.getData()
        this.render()
        console.log(this.tagList)
    }

    getData(){
        switch (this.nameTag) {
            case "ingredients":
                this.dataList = this.dataIngredientList
                break;
        
            case "appliances":
                this.dataList = this.dataApplianceList
                break;

            case "ustensils":
                this.dataList = this.dataUstensilList
                break;

            default:
                break;
        }
        this.displayTagList()
        this.displayInputTextDropDown()
        this.closeTagList()
    }

    get dataIngredientList() {
        let arrayIngredient = []
        for( let recipe of RECIPES) {
            for (let ingredient of recipe.ingredients) {

                let strIngredient = ingredient.ingredient;
                let strIngredientUppercase = this.toStrUppercase(strIngredient);
                arrayIngredient.push(strIngredientUppercase)                            
            } 
        }
        let arrayIngredientFiltered = [...new Set(arrayIngredient)];
        return arrayIngredientFiltered.sort();
    }

    get dataApplianceList() {
        let arrayAppliance = []
        for(let recipe of RECIPES) {
            let strAppliance = recipe.appliance;
            let strApplianceUppercase = this.toStrUppercase(strAppliance)
            arrayAppliance.push(strApplianceUppercase)
        }
        let arrayApplianceFiltered = [...new Set(arrayAppliance)]
        return arrayApplianceFiltered;
    }

    get dataUstensilList() {
        let arrayUstensil = []
        for(let recipe of RECIPES) {
            for(let ustensil of recipe.ustensils) {
               let strUstensilUppercase = this.toStrUppercase(ustensil)

               arrayUstensil.push(strUstensilUppercase)
            }
        }
        let arrayUstensilFiltered = [...new Set(arrayUstensil)]
        return arrayUstensilFiltered.sort()
    }

    toStrUppercase(str) {     
        // Suprime les accents
        let strNormal = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");  
        return strNormal.charAt(0).toUpperCase() + strNormal.substring(1).toLocaleLowerCase()
    }
    
    render() {
        for(let elem of this.dataList) {
            const tagListElement = document.createElement('li');
            tagListElement.textContent = elem
            this.tagList.appendChild(tagListElement);
        }
        return tagList;
    }

    displayTagList() {
        this.searchTagContent.addEventListener("click", ()=> {
            this.tagList.classList.remove("d-none")
            this.dropDownContainer.style.width = "100%"
        })
    }

    displayInputTextDropDown() {

        this.searchTagContent.addEventListener("click", () => {
            
            this.inputDropDown.classList.remove("d-none")
            this.textDropDown.classList.add("d-none")
    
        })
    }

    closeTagList() {
        for(let li of this.liTagList) {          
            li.addEventListener("click", () => {
                this.tagList.classList.add("d-none")
                this.dropDownContainer.style.width = "170px"
                this.inputDropDown.classList.add("d-none")
                this.textDropDown.classList.remove("d-none")

                let liTexContent = li.textContent
                console.log(liTexContent)
            })
        }
    }
}

let ingredients = new ListContent('ingredients')
let appliances = new ListContent('appliances')
let ustensils = new ListContent('ustensils')



/* <div class="row">
    <div class="col mt-5 d-flex">
        <div class="bg-primary rounded px-3 py-2">
            <span class="text-white fs-6 me-2">Ingrédients</span>
            <i class="bi bi-x-circle text-white"></i>
        </div>
        <div class="bg-success rounded px-3 py-2 d-none">
            <span class="text-white fs-6 me-2">Appareils</span>
            <i class="bi bi-x-circle text-white"></i>
        </div>
        <div class="bg-danger rounded px-3 py-2 d-none">
            <span class="text-white fs-6 me-2">Ustensiles</span>
            <i class="bi bi-x-circle text-white"></i>
        </div>
    </div>
</div> */



//App.js
// let tagIngredient = new TagSyteme();

// FUNCTION ou CLASS
// --------------------
//Données différentes (ingredient, appliance, ustensil) - Ques des tableau
    //Créer mes données pour chaque ITEM
    function getIngretien(recipe) {
        return ['coco', 'tomate']
    }
    
    //FUNCTION ou CLASS (Diffrention le HTML avec des ID)
        //Couleur différente
        //Afficher le nom de la catégorie TAG
        //Afficher list de tags
        //Les fonctinnalités (Class, au clique add tag)
    
        //Systeme de recherche (ingredient, appliance, ustensil) ou faire un système qui cherche dans tout la donné d'une recette
    
        function TagGestion(MesDonneesTab , NameIdTag) {
            const divElt = document.getElementById(NameIdTag)
            // console.log(divElt , MesDonneesTab)
        }
        
        class TagGestionClass{
            constructor(MesDonneesTab , NameIdTag){
                this.divElt = document.getElementById(NameIdTag)
                this.MesDonneesTab = MesDonneesTab
                // console.log(this.divElt , this.MesDonneesTab)
            }
        }
    
        //APP.JS Lancer les function
        const mesIngredients = getIngretien()
        TagGestion(mesIngredients, "ingredients")
        const TagIngredients = new TagGestionClass(mesIngredients, "ingredients")
        TagGestion(['blender'], "appareils")
        const TagApp = new TagGestionClass(['blender'], "appareils")
    