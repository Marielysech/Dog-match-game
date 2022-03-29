// Global variable
let startButton = document.getElementById('startGame')
let addNewDogButton = document.getElementById('addContestant')

// contestant Array
let contestantArray = []

// Creating the class object to store contestant information 
class DogContestant {
    constructor (name, personality) {
        this.name = name;
        this.personality = personality;
        this.img = ""
    }
}

// Event listeners
addNewDogButton.addEventListener('click', addParticipantToGame)
addNewDogButton.addEventListener('click', assigningImagesToUser)
addNewDogButton.addEventListener('click', removeAlert)
startButton.addEventListener('click', launchGame)


// functions to set user attributes
function addParticipantToGame() {
    // entry variable
    let dogName = document.getElementById('dogName')
    let dogPersonnality = document.getElementById('dogPersonnality')
    let dogNameValue = dogName.value
    let dogPersonnalityValue = dogPersonnality.value

    // if array is empty -> span 2 with new class and first element and quand pas empty remove la class (le faire pour each array impair qui sont dernière et ensuite lenlever )

    if( dogNameValue !== '' && dogPersonnalityValue !== '' ) {

        // user creation 
        const user = new DogContestant(dogNameValue, dogPersonnalityValue)
        console.log(contestantArray)

        contestantArray.push(user);

        // creating a list of participant
        let userDescription = document.createElement('p')
        userDescription.innerHTML = dogNameValue + ' the ' + dogPersonnalityValue
        
        let participantListDiv = document.querySelector('.participantList')
        if (participantListDiv.hasAttribute('id') === true ) {
            participantListDiv.removeAttribute('id')
        }
        let participantEntry = document.querySelector("body > div.participantList > h2")
        participantEntry.after(userDescription)
        document.querySelector("#appearingOnEvent")

    } else {
        if (dogName === undefined && dogPersonnality) {
            dogName.setAttribute('class', 'ErrorM')
            dogName.innerHTML = "Please enter name"
        } else if(dogPersonnality === undefined && dogName) {
            dogPersonnality.setAttribute('class', 'ErrorM')
            dogPersonnality.innerHTML = "Choose personality"       
        }   dogName.setAttribute('class', 'ErrorM')
            dogName.innerHTML = "Please enter name"
            dogPersonnality.setAttribute('class', 'ErrorM')
            dogPersonnality.innerHTML = "Choose personality"   
    }
}

function assigningImagesToUser () {  
    let length = contestantArray.length;
    let url = 'https://api.unsplash.com/photos/random?collections=1254279&count=' + length + '&client_id=X5jAziNMO_54vZyjmraVcwnZItFZ_QxspTpHWLNuBkc';
    
    for (let i=0; i<contestantArray.length; i++) {
     
        fetch(url) 
            .then(function(response){
                if (response.ok) {
                return response.json()
                }
                return Promise.reject('something went wrong')
            })
            .then(function(data) {
                contestantArray[i].img = data[i].urls.regular
            })

            .catch(function(error) {
                console.log("error is", error)
            })
        
        console.log("this is the i value" + i)
    }
    
}


    // removing alert of empty input
function removeAlert() {  
      
    let alertM = document.querySelector("#alertMessage")
    if (typeof(alertM) != 'undefined' && alertM != null) {
        alertM.remove();
    }
}


// game function 

function launchGame () {
    if (contestantArray == '') {
        const alert = document.createElement('p')
        alert.innerHTML = 'PLEASE ENTER CONTESTANT TO LAUNCH THE GAME'
        alert.setAttribute('id','alertMessage')
        document.querySelector('.gamePreparation').after(alert)
    }

    // creating the image container and sub text
    let gridContainer = document.createElement('div')
    gridContainer.classList.add('gridContainer')

    let image1container = document.createElement('figure')
    image1container.classList.add('imageContainer')

    let image1 = document.createElement('img')
    image1.setAttribute('src', contestantArray[1].img)

    let image2container = document.createElement('figure')
    image2container.classList.add('imageContainer')

    let image2 = document.createElement('img')
    image2.setAttribute('src', contestantArray[0].img)

    let textImage1= document.createElement('figcaption')
    textImage1.innerHTML = contestantArray[0].name + " the " + contestantArray[0].personality

    let textImage2= document.createElement('figcaption')
    textImage2.innerHTML = contestantArray[1].name + " the " + contestantArray[1].personality

    // where to append
    let placeToAppend = document.querySelector('.participantList')

    placeToAppend.after(gridContainer)
    gridContainer.append(image1container)
    gridContainer.append(image2container)
    image1container.append(image1)
    image1container.append(textImage1)
    image2container.append(image2)
    image2container.append(textImage2)

}
