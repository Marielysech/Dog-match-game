// function pour ajouter une classe à un élément d'une array s'il est en position impaire ET qu'il est le dernier élement de l'array


// let entryList = []

// for (i=0; i<entryList.length; i++) {
//     if (entry[i] % 2 == 0 && i=entryList.lenght)
// }

// if (entry[i] % 2 == 0 && i=entryList.lenght)


 // creating the image container and sub text
    

 
 let textImage1= document.createElement('p')
 textImage1.innerHTML = contestantArray[0].name + " THE " + contestantArray[0].personality

 let textImage2= document.createElement('p')
 textImage2.innerHTML = contestantArray[1].name + " THE " + contestantArray[1].personality

 let fightIcon = document.createElement('img')
 fightIcon.setAttribute('id','fightIcon')
 fightIcon.setAttribute('src', 'ressources/img/ versus.png')

 function createEntry(index, parent) {
    // create 
    let imageContainer = document.createElement('div')
    imageContainer.classList.add('imageContainer')
   
    let image = document.createElement('img')
    image.setAttribute('src', contestantArray[1].img)
     
    let textImage= document.createElement('p')
    textImage.innerHTML = contestantArray[index].name + " THE " + contestantArray[index].personality

    // append
    parent.append(imageContainer)
    image1container.append(image)
    image1container.append(textImage)
    
 }


 let image1container = document.createElement('div')
 image1container.classList.add('imageContainer')

 let image1 = document.createElement('img')
 image1.setAttribute('src', contestantArray[1].img)

 let image2container = document.createElement('div')
 image2container.classList.add('imageContainer')

 let image2 = document.createElement('img')
 image2.setAttribute('src', contestantArray[0].img)

 let textImage1= document.createElement('p')
 textImage1.innerHTML = contestantArray[0].name + " THE " + contestantArray[0].personality

 let textImage2= document.createElement('p')
 textImage2.innerHTML = contestantArray[1].name + " THE " + contestantArray[1].personality

 