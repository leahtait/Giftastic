// <!-- when new buttons made, they can be stuck in the below div -->
// <div id="buttons-view"></div>

// <form id="hero-form">
//         <label for="hero-input">Type the superhero you want to invite to our gif party: </label>
//         <input type="text" id="hero-input">
//         <br>
  
//         <!-- button to trigger generation of new button -->
//         <input id="add-hero" type="submit" value="MOAR SUPERHEROES!">
//       </form>
  
//       <!-- div to put in new gifs-->
//       <div id="hero-view"></div>

//initial array of buttons
var superheroes = ["Thor", "Iron Man", "Wonder Woman", "Shazam!", "Superman", "Green Lantern", "Black Widow", "The Hulk"]
// var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=8QKb7YZpKeFZKZSDMxiOKbY2Ofb9J7kT&tag=thor";

function displayHeroGif() {

    var hero = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/random?" + "api_key=8QKb7YZpKeFZKZSDMxiOKbY2Ofb9J7kT" + "&tag=" + hero;

    // Creating an AJAX call for the specific hero button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      // Creating a div to hold the hero 
      var heroDiv = $("<div class='hero'>");

      // Retrieving the URL for the image
      var imgURL = response.data.url;

      // Creating an element to hold the image
      var image = $("<img>").attr("src", imgURL);

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

    // Looping through the array of movies
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
  $("#add-hero").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var hero = $("#hero-input").val().trim();

    // Adding movie from the textbox to our array
    superheroes.push(hero);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
  });

  // Adding a click event listener to all elements with a class of "movie-btn"
  $(document).on("click", ".hero-btn", displayHeroGif);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();