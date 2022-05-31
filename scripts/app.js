import { RECIPES } from "./data/recipes.js";
import { cardFactory } from "./components/card.js";
import { filter } from "./utilities/search.js";
import {displayTextDropDown} from "./utilities/tags.js";
import {getDropDownIngredient} from "./utilities/tags.js";

function displayCard(RECIPES) {
    const cardSection = document.querySelector(".card_section");
   
    for(const recipe of RECIPES) {
        const cardModel = cardFactory(recipe);
        const cardDom = cardModel.getCardDom()
        cardSection.appendChild(cardDom);
    }
}

function init() {
    displayCard(RECIPES)
    filter()
    displayTextDropDown()
    getDropDownIngredient()
}

init()




// const ingTab = ['coco' , 'lait']

// function tag(IDTag , nameTag , tagList = []){
//     console.log("Tag ID = " + IDTag + " Nom catégorie tag = " + nameTag)

//     let testVarFunc = "TOTO"

//     afficheListTag(tagList ,testVarFunc)

//     function afficheListTag(tagList, testVarFunc){
//         for(const tag of tagList){
//             console.log(tag + " " + testVarFunc)
//         }
//     }
// }

// tag('ingredient' , 'ingrédient' , ingTab)
// tag('apperile' , 'apperile')
// tag('ustensile' , 'ustensile', ingTab)

// class TagPerso{
//     constructor(IDTag , nameTag , tagList = []){
//         this.IDTag = IDTag
//         this.nameTag = nameTag
//         this.tagList = tagList
//         console.log("CLASS Tag ID = " + this.IDTag + " Nom catégorie tag = " + this.nameTag)
//         this.affcherListTag()
//         // this.init()
//     }

//     init(){
//         //Je lance mes méthode(function) important au lancement
        // console.log(this.IDTag)
//     }
    // renderHTML(){
    //     //Create element pour creer HTML
    // }
//     affcherListTag(){
//         for(const tag of this.tagList){
//             console.log(tag)
//         }
//     }
// }

// const tagIngredient = new TagPerso('ingredient' , 'ingrédient' , ingTab);
// const tagAppliance = new TagPerso('apperile' , 'apperile');