// Create an array "topic" and add 5 string values
var topic = ["dog", "cat", "bird", "lizard", "fish"];

function displayAnimalInfo() {
    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

    // Creating an ajax call for the specific animal button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        var results = response.data;
        console.log(results);

          for (var i = 0; i < results.length; i++) {

            var animalDiv = $("<div class='animal'>");

            var ratingParagraph = $("<p>").text("Rating: " + results[i].rating);

            animalDiv.append(ratingParagraph);

            var imgURL = results[i].images.fixed_height.url

            var image = $("<img>").attr("src", imgURL);

            // var animalImage = $("<img>");
            // animalImage.attr("src", results[i].images.fixed_height.url);

            animalDiv.append(image);

            $("#animal-view").prepend(animalDiv);
        }
    })
}

function renderButtons() {
    $("animal-view").empty();

    for (var i = 0; i<topic.length; i++) {

        var animalButton = $("<button>");

        // Adding a class of movie-btn to our button
        animalButton.addClass("animal-btn");
        // Adding a data-attribute
        animalButton.attr("data-name", topic[i]);
        // Providing the initial button text
        animalButton.text(topic[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(animalButton);
    }
}

// This function handles events where a movie button is clicked
$("#add-animal").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var animal = $("#animal-input").val().trim();

    // Adding movie from the textbox to our array
    topic.push(animal);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});

  // Adding a click event listener to all elements with a class of "movie-btn"
  $(document).on("click", ".animal-btn", displayAnimalInfo);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();