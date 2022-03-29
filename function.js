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

// startButton.addEventListener('click', launchGame)


// functions to set user attributes
function addParticipantToGame() {
    // user creation 
    let dogName = document.getElementById('dogName').value
    let dogPersonnality = document.getElementById('dogPersonnality').value
    const user = new DogContestant(dogName, dogPersonnality)
    console.log(contestantArray)

    contestantArray.push(user);

    // element creation
    let userDescription = document.createElement('p')

    // remplissage element
    userDescription.innerHTML = dogName + ' the ' + dogPersonnality
    
    // appending element
    let participantListDiv = document.querySelector('.participantList')
    if (participantListDiv.hasAttribute('id') === true ) {
         participantListDiv.removeAttribute('id')
     }
    let participantEntry = document.querySelector("body > div.participantList > h2")
    participantEntry.after(userDescription)
    document.querySelector("#appearingOnEvent")
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



// Fetching img from Unsplash 

// let length = contestantArray.length;
// let url = 'https://api.unsplash.com/photos/random?collections=4625880&count=' + length + 'client_id=f-T5nA4rJ9fWUTsmTHfqUGVm1RAwb9C7iFqCDc5z-rY';
   


let test = document.getElementById('startGame')
test.addEventListener('click', assignPictureToContestant)