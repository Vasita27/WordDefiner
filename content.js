document.addEventListener('selectionchange', async () => {
  const selectedText = window.getSelection().toString().trim();
  console.log(selectedText); // Getting the selected text  
  let definitionBox = document.getElementById('definition-box');

  // Creating the definition box if it doesn't exist
  if (!definitionBox) {
    definitionBox = document.createElement('div');
    definitionBox.id = 'definition-box';
    definitionBox.style.position = 'absolute';
    definitionBox.style.backgroundColor = 'white';
    definitionBox.style.border = '1px solid black';
    definitionBox.style.padding = '10px';
    definitionBox.style.zIndex = '9999';
    definitionBox.style.fontSize = '14px';
    definitionBox.style.color = 'black';
    definitionBox.style.maxWidth = '250px'; 
    definitionBox.style.maxHeight = '150px'; 
    definitionBox.style.overflowY = 'auto'; 
    definitionBox.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'; // Add shadow
    definitionBox.style.borderRadius = '5px'; 
    document.body.appendChild(definitionBox); // Appending the definition box to the body
  }

  // Hiding the text box if the text is not selected
  if (!selectedText) {
    definitionBox.style.display = 'none';
    return;
  }

  // Fetching the definition for the selected text by calling the function
  const definition = await fetchDefinition(selectedText);

  // Setting the text content of the definition box and showing it
  definitionBox.innerHTML = definition;
  definitionBox.style.display = 'block';

  // Positioning the definition box next to the selected word
  const range = window.getSelection().getRangeAt(0);
  const rect = range.getBoundingClientRect(); // Getting the position of the selected word

  // Positioning the box next to the selected word
  definitionBox.style.left = `${rect.right + window.scrollX + 5}px`; 
  definitionBox.style.top = `${rect.top + window.scrollY}px`; 
});

// Fetching the definition of a word using Dictionary API
async function fetchDefinition(word) {
  const apiURL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error('Error fetching definition');
    }
    const data = await response.json();
    if (data[0] && data[0].meanings) {
      let definitionContent = '';
      // Looping through each part of speech and its definitions
      data[0].meanings.forEach((meaning) => {
        definitionContent += `<strong>${meaning.partOfSpeech}:</strong><br>`;
        meaning.definitions.forEach((def, index) => {
          definitionContent += `${index + 1}. ${def.definition}<br>`;
        });
        definitionContent += `<br>`;
      });
      return definitionContent;
    } else {
      return 'No definition found';
    }
  } catch (error) {
    console.error('Error fetching definition:', error);
    return 'The definition could not be found. Please try using more common or recognizable words.';
  }
}
