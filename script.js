document.addEventListener('DOMContentLoaded', function () {
    // Step 1: Locate the <h1> element
    const header = document.querySelector('header h1');

    // Step 2: Split the text into individual words
    const text = header.textContent;
    const words = text.split(' ');

    // Step 3: Wrap each word in a <span> tag
    const spans = words.map((word, index) => {
      // Group "in the world" into one <span>
      if (index === 2) {
        return `<span id=${index}>${words.slice(2).join(' ')}</span>`;
      }
      // Wrap other words individually
      if (index < 2) {
        return `<span id=${index}>${word}</span>`;
      }
      // Ignore the remaining words as they are already grouped
      return '';
    }).join(' ');

    // Step 4: Reassemble and replace the content of the <h1>
    header.innerHTML = spans;
  });