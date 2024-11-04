const endDate = "04 Nov 2024 08:39 pm";

document.getElementById('endDate').innerText = endDate;

const inputs = document.querySelectorAll("input");
const audio1 = document.getElementById('audio1'); // First audio track
const audio2 = document.getElementById('audio2'); // Second audio track

let countdownInterval; // Declare a variable to hold the interval ID

function clock() {
    const end = new Date(endDate);
    const now = new Date();
    const diff = (end - now) / 1000;

    //console.log(end);
    //console.log(now);
    //const diff = end - now 
    //console.log(diff);

    // If the countdown reaches zero
    if (diff <= 0) {
        clearInterval(countdownInterval); // Stop the countdown
        showImageAlert();

        // Set all inputs to 00
        inputs[0].value = "00"; // Days
        inputs[1].value = "00"; // Hours
        inputs[2].value = "00"; // Minutes
        inputs[3].value = "00"; // Seconds
        
        return; // Stop further processing
    }

    // Convert into Days, Hours, Minutes, Seconds
    inputs[0].value = Math.floor(diff / 3600 / 24);
    inputs[1].value = Math.floor(diff / 3600) % 24;
    inputs[2].value = Math.floor((diff / 60) % 60);
    inputs[3].value = Math.floor(diff) % 60;
}

// Function to display the image alert
function showImageAlert() {
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modalImage');

    modalImage.src = '/src/img/newyear2025.jpg'; // Replace with your image URL
    modal.style.display = 'flex';

    // Play the first audio track
    audio1.play().catch(error => {
        console.log("Audio playback failed:", error);
    });

    // Set up an event listener to play the second audio track when the first ends
    audio1.onended = function() {
        audio2.play().catch(error => {
            console.log("Second audio playback failed:", error);
        });
    };

    // Hide modal on click
    modal.onclick = function() {
        modal.style.display = 'none';
        audio1.pause(); // Pause the first audio if modal is closed
        audio1.currentTime = 0; // Reset first audio to start

        // Also pause the second audio
        audio2.pause();
        audio2.currentTime = 0; // Reset second audio to start
    };
}

// Initial call
clock();

/*
* 1 Day = 24 hrs
* 1 hrs = 60 mins
* 1 min = 60 sec
*/

// Set the interval to update the countdown every second
countdownInterval = setInterval(() => {
    clock();
}, 1000);
