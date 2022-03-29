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
    let dogNameValue = dogName.value.toUpperCase()
    let dogPersonnalityValue = dogPersonnality.value.toUpperCase()

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
    let url = 'https://api.unsplash.com/photos/random?collections=1254279&count=' + length + '&client_id=ys6tVpDbr_tZoTx9wvBWH6lGgR4035lBTUfeMq6GpD4';
    
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

    // creating grid container
    // where to append
    let placeToAppend = document.querySelector('.participantList')
    let gridContainer = document.createElement('div')
    gridContainer.classList.add('gridContainer')
    // let fightIcon = document.createElement('img')
    // fightIcon.setAttribute('id','fightIcon')
    // fightIcon.setAttribute('src', 'ressources/img/ versus.png')
    placeToAppend.after(gridContainer)
    // gridContainer.append(fightIcon)

    createEntry(0, gridContainer)
    createEntry(1, gridContainer)

    

    //create event listener
    let imageLeft = document.querySelector('body > div.gridContainer > div:nth-child(1) > img')
    console.log('this is the left image' + imageLeft)
    let imageRight = document.querySelector('body > div.gridContainer > div:nth-child(2) > img')
    let imageGrid = document.querySelector("body > div.gridContainer")
    imageGrid.addEventListener('click', selectRoundWinner);

    function selectRoundWinner(event) {
        while (contestantArray.length > 1) {
            let winner = event.target.src
            console.log(winner)
            console.log(imageLeft)

            if (winner === imageLeft.src) {
                contestantArray.splice(1,1)
                imageRight.remove()
                imageLeft.remove()
                createEntry(0, gridContainer)
                createEntry(1, gridContainer)

            } else if (winner === imageRight.src) {
                contestantArray.shift('')
                imageRight.remove()
                imageLeft.remove()
                createEntry(0, gridContainer)
                createEntry(1, gridContainer)
            }
        }
    }  
}

// shift to renmive first array element
// click game

// click event (on the div) => change the nextelementsibling for next entry in array 
// remove the looser from the array 
// this.user.counter();

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