document.addEventListener('DOMContentLoaded', (event) => {
    // Generate a random number between 1 and whatever its multiplying by.
    var randomNumber = Math.floor(Math.random() * 2) + 1;

    // Create the div and set its properties
    var div = document.createElement('div');
    div.className = 'fullscreen-image';
    div.style.backgroundImage = 'url(images/welcome/welcome' + randomNumber + '.png)';

    // Append the div to the body
    document.body.appendChild(div);

    // Add an event listener for the click event
    div.addEventListener('click', function() {
        this.style.animation = 'fadeout 1s forwards';
    });

    // Start the fadeout animation after 3 seconds
    setTimeout(function() {
        div.style.animation = 'fadeout 1s forwards';
    }, 3000);

    // Remove the div from the DOM after the animation ends
    div.addEventListener('animationend', function() {
        this.parentNode.removeChild(this);
    });
});
