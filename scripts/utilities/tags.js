import { RECIPES } from "../data/recipes.js";

export default class ListContent {

    constructor(nameTag) {
        
        this.dropDownContainer = document.getElementById(nameTag);
        this.tagList = document.querySelector(`#${nameTag} ul`);
        this.searchTagContent = document.querySelector(`#${nameTag} .search-tag-content`);
        this.inputDropDown = document.querySelector(`#${nameTag} .input-search-filter`);
        this.textDropDown = document.querySelector(`#${nameTag} .text-search-filter`);
        this.iconDropDown = document.querySelector(`#${nameTag} i`);

        this.nameTag = nameTag
        this.dataList = []
        this.liTexContent = "";
        this.colorTag = "bg-primary"
        this.init()
    }

    init() {
        this.getData()
        this.render()
        this.selectTagInList()
        this.displayTagList()
    }

    getData(){
        switch (this.nameTag) {
            case "ingredients":
                this.dataList = this.dataIngredientList
                this.colorTag = "bg-primary"
                break;
        
            case "appliances":
                this.dataList = this.dataApplianceList
                this.colorTag = "bg-danger"
                break;

            case "ustensils":
                this.dataList = this.dataUstensilList
                this.colorTag = "bg-success"
                break;

            default:
                break;
        }
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
    }

    displayTagList() {
        this.searchTagContent.addEventListener("click", (e)=> {
            
            this.openTagList()
            console.log("open 1")
            this.closeTagList()
        })
    }

    openTagList(){
        this.tagList.classList.remove("d-none")
        this.dropDownContainer.style.width = "100%"
        this.iconDropDown.classList.add("bi", "bi-chevron-up")
        this.iconDropDown.classList.remove("bi", "bi-chevron-down")
        this.inputDropDown.classList.remove("d-none")
        this.textDropDown.classList.add("d-none")
    }


    closeTagList() {
        this.iconDropDown.addEventListener("click", (e) => {
            
            e.stopPropagation()
            
            if( Array.from(this.iconDropDown.classList).includes('bi-chevron-up')){
                console.log("close")

                this.tagList.classList.add("d-none")
                this.dropDownContainer.style.width = "170px"
                this.inputDropDown.classList.add("d-none")
                this.textDropDown.classList.remove("d-none")
                this.iconDropDown.classList.remove("bi", "bi-chevron-up")
                this.iconDropDown.classList.add("bi", "bi-chevron-down")

            }
        })       
    }

    selectTagInList(){
        let allLiTagList = document.querySelectorAll(`#${this.nameTag} .tag-list li`);
        allLiTagList.forEach(element => {
            element.addEventListener("click", (e) => {
                this.tagTextContent = e.target.textContent
                this.tagBuilderHtml() 
                // this.filterTagAppareil() 
                // this.filterTagUstensil()       
            })
        });
    }

    tagBuilderHtml() {
        const tagContainer = document.querySelector(".tag-container")
        const divTag = document.createElement("div");
        divTag.classList.add( this.colorTag, "rounded", "px-3", "py-2", "me-3", "mt-4", "tag-content")
        tagContainer.appendChild(divTag)

        const spanTag = document.createElement("span");
        spanTag.classList.add("text-white", "fs-6", "me-3");
        spanTag.textContent = this.tagTextContent;
        divTag.appendChild(spanTag)

        const iconTag = document.createElement("i");
        iconTag.classList.add("bi", "bi-x-circle", "text-white");
        divTag.appendChild(iconTag);

        const article = document.getElementsByTagName("article");
        // fermeture des tags
        iconTag.addEventListener("click", () => {
            divTag.remove()
            Array.from(article).forEach(elem => elem.style.display = "")
        })
        
    }


    filterTagAppareil() {
        const article = document.getElementsByTagName("article");
              
        for(let i = 0; i < RECIPES.length; i++) {
            let appliance = RECIPES[i].appliance

            if(appliance.includes(this.tagTextContent)) {
                article[i].style.display = "";
            } else {
                article[i].style.display = "none";
            }
        }
    }

    filterTagUstensil() {
        const article = document.getElementsByTagName("article");
            for(let recipe of RECIPES) {
                for(let ustensil of recipe.ustensils) {
                    if(ustensil.includes(this.tagTextContent.toLowerCase())) {
                        Array.from(article).forEach(elem => elem.style.display = "")
                        console.log(this.tagTextContent)
                    } else {
                        Array.from(article).forEach(elem => elem.style.display = "none")
                    }
                }
            }
    }
}





    