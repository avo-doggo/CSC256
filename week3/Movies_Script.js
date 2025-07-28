function addMovie() 
{
 const movieInputs = document.getElementById('movieInputs');

 const newInput = document.createElement('input');
 newInput.type= 'text';
 newInput.placeholder = 'Enter Movie Title'
 movieInputs.appendChild(newInput);
}


function displayList() 
{
  // Select all the input fields inside #movieInputs
  const inputs = document.querySelectorAll('#movieInputs input');

  // Get the UL where the movies will be displayed
  const movieList = document.getElementById('movieList');

  // Clear any existing list items
  movieList.innerHTML = '';

  // Loop through each input, create a list item, or li, for its value, and add it to the list
  inputs.forEach(input => {
    if (input.value.trim() !== '') 
    { 
    // ignore empty inputs
    //li means list item
      const li = document.createElement('li');
      li.textContent = input.value;
      movieList.appendChild(li);
      
      // Clear the input after adding it to the list
      input.value = '';
    }
    }
    );
}

function resetList() {
//  Reset the input section (movieInputs) to its original state:
//    - Add back the heading
//    - Add back a single blank input field
  document.getElementById('movieInputs').innerHTML =
    '<h1>List Movies</h1><input type="text" placeholder="Enter Movie Title">';
// Clear the movie list display (#movieList)
//    - Removes all <li> items from the list so it looks empty again
  document.getElementById('movieList').innerHTML = '';
}