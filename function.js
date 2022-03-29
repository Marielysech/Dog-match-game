
// Creating the class object to store contestant information 

class DogContestant {
    constructor (name, personality, img) {
        this.name = name;
        this.personality = personality;
        this.img = ""
    }
}

// creating the contestants array

let contestantArray = [1,2]

// Fetching img from Unsplash 

let length = contestantArray.length;
let url = 'https://api.unsplash.com/photos/random?collections=4625880&count=' + length + 'client_id=f-T5nA4rJ9fWUTsmTHfqUGVm1RAwb9C7iFqCDc5z-rY';

function assignPictureToContestant() {
   
    fetch(url) 
        .then(function(response){
            if (response.ok) {
            return response.json()
            }
            return Promise.reject('something went wrong')
        })
        .then(function(data) {
            let img = document.createElement('img')
            document.getElementById('startGame').after(img)
            img.setAttribute('src',data[1].urls.regular)

        })

        .catch(function(error) {
            console.log("error is", error)
        })
    }
let test = document.getElementById('startGame')
test.addEventListener('click', assignPictureToContestant)