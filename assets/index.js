$(document).ready(function () {


	const animals = ['Dog', 'Cat', 'Lion'];


	function displayAnimalGifs() {

		const animal = $(this).attr('data-name');
		const queryURL =  "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=1F5y0c9GuPTkYaANh7BRAAD2d9jEupUs"

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {
			console.log(response);
			
			const results = response.data;	

			for(let i = 0; i<results.length; i++) {

				const gifDiv = $("<div class='animalPlace'>");

				const gifImage = $("<img class='gif-image'>");

				const rating = results[i].rating;

				const p = $("<p>").text("Rating:"+rating.toUpperCase());

				gifImage.attr("src", results[i].images.fixed_height_still.url);

				gifImage.attr("data-still", results[i].images.fixed_height_still.url);

				gifImage.attr("data-animate", results[i].images.fixed_height.url);
				
				gifImage.attr("data-state", "still");

				gifDiv.prepend(p);

				gifDiv.prepend(gifImage);

				$("#gifs-holder").prepend(gifDiv);

			};

			$(".gif-image").on("click", function() {

			let state = $(this).attr("data-state");

			if (state==="still") {
				$(this).attr("src", $(this).attr("data-animate"))
				$(this).attr("data-state", "animate");
			} 

			else {
				$(this).attr("src", $(this).attr("data-still"))
				$(this).attr("data-state", "still");
			}

			});

		})
	}

	function renderButtons() {

		$("#buttons-holder").empty();

		for(let i = 0; i <animals.length; i++) {

			const b = $("<button>");

			b.addClass("animal");

			b.attr("data-name", animals[i]);

			b.text(animals[i]);

	
			$("#buttons-holder").append(b);
		}
	}

	$("#add-animal").on("click", function(event) {
		event.preventDefault();

		const animal = $("#animal-input").val().trim();

		animals.push(animal);

		renderButtons();
	});

	$(document).on("click", ".animal", displayAnimalGifs);

	renderButtons();
});