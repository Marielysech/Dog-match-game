// Creating the class object to store contestant information 
class DogContestant {
    constructor (name, personality) {
        this.name = name;
        this.personality = personality;
        this.img = ""
    }
} 

// Global variable
let startButton = document.getElementById('startGame')
let addNewDogButton = document.getElementById('addContestant')
let imageGrid = document.querySelector(".gridContainer")

// contestant Array
let contestantArray = []

// Event listeners
addNewDogButton.addEventListener('click', addParticipantToGame)
addNewDogButton.addEventListener('click', assigningImagesToUser)
addNewDogButton.addEventListener('click', removeAlert)
startButton.addEventListener('click', launchGame)


// functions 

function addParticipantToGame() {
    // entry variable
    let dogName = document.getElementById('dogName')
    let dogPersonnality = document.getElementById('dogPersonnality')
    let dogNameValue = dogName.value.toUpperCase()
    let dogPersonnalityValue = dogPersonnality.value.toUpperCase()

    //TODO if array is empty -> span 2 with new class and first element and quand pas empty remove la class (le faire pour each array impair qui sont dernière et ensuite lenlever )

    if( dogNameValue !== '' && dogPersonnalityValue !== '' ) {
        // user creation 
        const user = new DogContestant(dogNameValue, dogPersonnalityValue)
        console.log(contestantArray)

        contestantArray.push(user);

        // creating a list of participant
        let userDescription = document.createElement('p')
        userDescription.innerHTML = dogNameValue + ' THE ' + dogPersonnalityValue
        
        let participantListDiv = document.querySelector('.participantList')
        if (participantListDiv.hasAttribute('id') === true ) {
            participantListDiv.removeAttribute('id')
        }
        let participantEntry = document.querySelector("body > div.participantList > h2")
        participantEntry.after(userDescription)
        document.querySelector("#appearingOnEvent")

    } else {
        if (dogNameValue == '' && dogPersonnalityValue) {
            dogName.setAttribute('placeholder', '! Please enter name')

        } else if(dogPersonnalityValue  == '' && dogNameValue) {
            dogPersonnality.setAttribute('placeholder', '! Choose personality')
        }   
        dogPersonnality.setAttribute('placeholder', '! Please enter name')
        dogName.setAttribute('placeholder', '! Choose personality')
    }
}

function assigningImagesToUser () {  
    let length = contestantArray.length;
    let url = 'https://api.unsplash.com/photos/random?collections=1254279&count=' + length + '&orientation=landscape&client_id=5t2yb1hMgg8GvSB7IapuXUB7D5f2za7RF6BeYnftRIU';
    
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

function createEntry(index, parent) {
    // create 
    let imageContainer = document.createElement('div')
    imageContainer.classList.add('imageContainer')
   
    let image = document.createElement('img')
    image.setAttribute('src', contestantArray[index].img)
     
    let textImage= document.createElement('p')
    textImage.innerHTML = contestantArray[index].name + " THE " + contestantArray[index].personality

    // append
    parent.append(imageContainer)
    imageContainer.append(image)
    imageContainer.append(textImage)
 }

function launchGame () {
    //alert no contestant
    if (contestantArray == '') {
        const alert = document.createElement('p')
        alert.innerHTML = 'PLEASE ENTER CONTESTANT TO LAUNCH THE GAME'
        alert.setAttribute('id','alertMessage')
        document.querySelector('.gamePreparation').after(alert)
    }
    //creating container to display players
    imageGrid = document.createElement('div')
    imageGrid.classList.add('gridContainer')
    document.querySelector('.participantList').after(imageGrid)

    createEntry(0, imageGrid)
    createEntry(1, imageGrid)

    imageGrid.addEventListener('click', selectRoundWinner);
    
}


 function selectRoundWinner(event) {
    let winner = event.target.src
    let player1 = document.querySelector('body > div.gridContainer > div:nth-child(1) > img')
    let player2 = document.querySelector('body > div.gridContainer > div:nth-child(2) > img')   

    if (contestantArray.length > 2) {
        if (winner === player1.src) {
            contestantArray.splice(1,1)
            imageGrid.remove()
            launchGame()

        } else if (winner === player2.src) {
            contestantArray.shift('')
            imageGrid.remove()
            launchGame()
        }
    } else if (contestantArray.length > 1) {
            if (winner === player1.src) {
                contestantArray.splice(1,1)
                winnerAnnouce()

            } else if (winner === player2.src) {
                contestantArray.shift('')
                winnerAnnouce()
        }
    }
 }


 function winnerAnnouce() {
     if(contestantArray.length === 1) {
        imageGrid.remove()
        imageGrid = document.createElement('div')
        imageGrid.classList.add('finalGrid')
        document.querySelector('.participantList').after(imageGrid)
        let winnerMessage = document.createElement('h2')
        winnerMessage.setAttribute('id', 'winnerMessage')
        winnerMessage.innerHTML = "The winner is " + contestantArray[0].name + ' THE ' + contestantArray[0].name
        imageGrid.append(winnerMessage)
        createEntry(0, imageGrid)

    }
 }
