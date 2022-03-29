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
startButton.addEventListener('click', launchGame)


// functions to set user attributes
function addParticipantToGame() {
    let dogName = document.getElementById('dogName')
    let dogPersonnality = document.getElementById('dogPersonnality')
    let dogNameValue = dogName.value
    let dogPersonnalityValue = dogPersonnality.value

    //removing alert of empty input
    let alertM = document.querySelector("#alertMessage")
    if (typeof(alertM) != 'undefined' && alertM != null) {
        alertM.remove();
    }

    // if array is empty -> span 2 with new class and first element and quand pas empty remove la class

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
    fetch('https://dog.ceo/api/breeds/image/random') 
        .then(function(response){
            if (response.ok) {
            return response.json()
            }
            return Promise.reject('something went wrong')
        })
        .then(function(data) {
            contestantArray.forEach(element => element.img = data.message)
        })

        .catch(function(error) {
            console.log("error is", error)
        })
    }

// game function 

function launchGame () {
    if (contestantArray == '') {
        const alert = document.createElement('p')
        alert.innerHTML = 'PLEASE ENTER CONTESTANT TO LAUNCH THE GAME'
        alert.setAttribute('id','alertMessage')
        document.querySelector('.gamePreparation').after(alert)
    }

    // creating the image container
    let imagesContainer = document.createElement('div')
    let image1 = document.createElement('img')
    image1.setAttribute('src', contestantArray[0].img)
    let image2 = document.createElement('img')
    image2.setAttribute('src', contestantArray[1].img)


    // where to append
    let placeToAppend = document.querySelector('.participantList')

    placeToAppend.after(imagesContainer)
    imagesContainer.append(image1)
    imagesContainer.append(image2)

}



// Fetching img from Unsplash 
// let length = contestantArray.length;
// let url = 'https://api.unsplash.com/photos/random?collections=4625880&count=' + length + 'client_id=f-T5nA4rJ9fWUTsmTHfqUGVm1RAwb9C7iFqCDc5z-rY';
   
