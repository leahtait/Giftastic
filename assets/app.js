//initial array of buttons
var superheroes = ["Thor", "Iron Man", "Wonder Woman", "Shazam!", "Superman", "Green Lantern", "Black Widow", "The Hulk"]

//making a function to display the GIF
function displayHeroGif() {

  var hero = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=8QKb7YZpKeFZKZSDMxiOKbY2Ofb9J7kT&tag=" + hero;

  // Creating an AJAX call for the specific hero button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    console.log(response.data) //console.log to see what I'm getting from the API

    // Creating a div to hold the hero gif
    var heroDiv = $("<div class='hero'>");

    // Retrieving the URL for the image 
    var imgURL = response.data.images.original.url;

    // Creating an element to hold the image
    var image = $("<img class='herogif'>").attr("src", imgURL);
    //giving the image the attribute of the still/non-gif version from the giphy API. not using it here when we first load the image, just putting it there for elater
    image.attr("otherURL", response.data.images.original_still.url);


    // Appending the image
    heroDiv.append(image);

    // Putting the entire hero gif above the previous gifs
    $("#hero-view").prepend(heroDiv);
  });

}

// Function for displaying hero buttons
function renderButtons() {

  // Deleting old buttons prior to adding new buttons to avoid repeat buttons
  $("#buttons-view").empty();

  // Looping through the array of heroes
  for (var i = 0; i < superheroes.length; i++) {

    //generating buttons for each hero in the array
    var a = $("<button>");
    // Adding a class: hero-btn to our button
    a.addClass("hero-btn");
    // Adding a data-attribute
    a.attr("data-name", superheroes[i]);
    // Providing the initial button text
    a.text(superheroes[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function handles events where a hero button is clicked
$("#add-hero").on("click", function (event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var hero = $("#hero-input").val().trim();

  // Adding hero from the textbox to our array
  superheroes.push(hero);

  // Calling renderButtons which handles the processing of our hero array
  renderButtons();
});

//click event listener for all elements with a class of "hero-btn". when you click hero-btn, run the displayHeroGif function
$(document).on("click", ".hero-btn", displayHeroGif);

// Calling the renderButtons function to display the intial buttons. 
renderButtons();

//click event that when you click on a herogif, it changes the attribute on the image you click from it's current attribute to the "other" one. 
$(document).on("click", ".herogif", function () {
  console.log("click");
  var src = $(this).attr("src");
  var otherURL = $(this).attr("otherURL");
  $(this).attr("src", otherURL);
  $(this).attr("otherURL", src);
});