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
    let url = 'https://api.unsplash.com/photos/random?collections=1254279&count=' + length + '&orientation=landscape&client_id=LNuQ_LmhYxZNEWuRN5Nd1CvCKY7BIMWuNLlDXtPmhP4';
    
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
    let imageGrid = document.querySelector(".gridContainer")
    imageGrid.addEventListener('click', selectRoundWinner);
   

    function selectRoundWinner(event) {
        let winner = event.target.src

        if (contestantArray.length > 0) {
            if (winner === imageLeft.src) {
                contestantArray.splice(1,1)
                gridContainer.remove()
                winnerAnnouce()
                launchGame()

            } else if (winner === imageRight.src) {
                gridContainer.remove()
                contestantArray.shift('')
                winnerAnnouce()
                launchGame()
              
            }
        // } else if (contestantArray.length === 1 ) {
        //         contestantArray.shift('')
        //         imageLeft.classList.add('winnerDog')
        //         let winnerAnnounce = document.createElement('h2')
        //         winnerAnnounce.innerHTML = "The winner is" + contestantArray[0].name + ' THE ' + contestantArray[0].name
        //         imageLeft.before(winnerAnnounce)
        //         launchGame()

        // }  
    }    
    // console.log(contestantArray)
    // imageGrid.addEventListener('click', endGame);

}
    function winnerAnnouce (){
        if(contestantArray.length == 1) {
            let winnerAnnounce = document.createElement('h2')
            imageLeft.classList.add('winnerDog')
            winnerAnnounce.innerHTML = "The winner is" + contestantArray[0].name + ' THE ' + contestantArray[0].name
            imageGrid.append(winnerAnnounce)
        }

    }

    // function endGame(event) {
    //     let winner = event.target.src
    //     if (winner === imageLeft.src) {
    //         contestantArray.splice(1,1)
    //         gridContainer.remove()
    //         let winnerAnnounce = document.createElement('h2')
    //         winnerAnnounce.innerHTML = "The winner is" + contestantArray[0].name + ' THE ' + contestantArray[0].name
    //         imageGrid.append(winnerAnnounce)
    //         createEntry(0, gridContainer)

    //     } else if (winner === imageRight.src) {
    //         gridContainer.remove()
    //         contestantArray.shift('')
    //         let winnerAnnounce = document.createElement('h2')
    //         winnerAnnounce.innerHTML = "The winner is" + contestantArray[0].name + ' THE ' + contestantArray[0].name
    //         imageGrid.append(winnerAnnounce)
    //         createEntry(0, gridContainer)

    //     }
    // }
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