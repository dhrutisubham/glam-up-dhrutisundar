document.addEventListener("DOMContentLoaded", function () {
    // Step 1: Locate the <h1> element
    const header = document.querySelector("header h1");
  
    // Step 2: Split the text into individual words
    const text = header.textContent;
    const words = text.split(" ");
  
    // Step 3: Wrap each word in a <span> tag
    const spans = words
      .map((word, index) => {
        // Group "in the world" into one <span>
        if (index === 2) {
          return `<span id=header${index}>${words.slice(2).join(" ")}</span>`;
        }
        // Wrap other words individually
        if (index < 2) {
          return `<span id=header${index}>${word}</span>`;
        }
        // Ignore the remaining words as they are already grouped
        return "";
      })
      .join(" ");
  
    // Step 4: Reassemble and replace the content of the <h1>
    header.innerHTML = spans;
  
    // Container for SVGs
    const svgContainer = document.createElement("div");
    let decorSvg = document.createElement("img");
    svgContainer.className = "decoration";
    decorSvg.setAttribute(
      "src",
      `./svgs/decoration.svg`
    );
    svgContainer.appendChild(decorSvg);
    document.body.appendChild(svgContainer);
  
    // Create a cta-button element
    const ctaButton = document.createElement("button");
    ctaButton.className = "cta-button";
    ctaButton.textContent = "Explore!";
    document.body.appendChild(ctaButton);
  
    const nextButton = document.createElement("button");
    nextButton.className = "next-button";
    nextButton.textContent = "->";
    document.body.appendChild(nextButton);
  
    const prevButton = document.createElement("button");
    prevButton.className = "prev-button";
    prevButton.textContent = "<-";
    document.body.appendChild(prevButton);
  
    const closeButton = document.createElement("button");
    closeButton.className = "close-button";
    closeButton.textContent = "X";
    document.body.appendChild(closeButton);
  
    // Locate the gallery container and list items
    const gallery = document.querySelector("ul");
    const items = gallery.querySelectorAll("li");
  
    items.forEach((item, index) => {
      // Locate the existing h3 and p tags
      item.style.rotate = `${Math.random() * 6 - 3}deg`;
      item.style.zIndex = `${10 - index}`;
      const h3 = item.querySelector("h3");
      const p = item.querySelector("p");
  
      // Create a new div and append the h3 and p tags to it
      const newDiv = document.createElement("div");
      newDiv.appendChild(h3);
      newDiv.appendChild(p);
  
      // Create a new img tag
      const newDiv2 = document.createElement("div");
      const newImg = document.createElement("img");
  
      // Set attributes for the new img element using the index
      newImg.setAttribute(
        "src",
        `./img/beach${index + 1}.png`
      ); // dynamically set image source
      newImg.setAttribute("alt", `Image description ${index + 1}`); // dynamically set alt text
      newDiv2.appendChild(newImg);
  
      // Clear the current li content and append the new structure
      item.textContent = "";
      item.appendChild(newDiv);
      item.appendChild(newDiv2);
    });
  
    function setZindexLi() {
      items.forEach((item, index) => {
        item.style.rotate = `${Math.random() * 6 - 3}deg`;
        item.style.zIndex = `${10 - index}`;
      });
    }
  
    //   Animations
    let ctaAction = gsap.to("body", {
      translateY: "-50%",
      duration: 2,
      ease: "expo.inOut",
      paused: true,
      onComplete: function () {
        updateGallery(0);
      }
    });
  
    let showList = 0;
  
    document.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft" && showList === 1) {
        if (currentIndex > 0) {
          updateGallery(currentIndex - 1);
        }
      } else if (event.key === "ArrowRight" && showList === 1) {
        if (currentIndex < items.length - 1) {
          updateGallery(currentIndex + 1);
        }
      } else if (event.key === "Escape" && showList === 1) {
        ctaAction.reverse();
        updateGallery(-1);
        setZindexLi();
        showList = 0;
      } else if (event.code === "Space" && showList === 0) {
        showList = 1;
        ctaAction.play();
      }
    });
  
    ctaButton.addEventListener("click", function () {
      showList = 1;
      ctaAction.play();
    });
  
    closeButton.addEventListener("click", function () {
      ctaAction.reverse();
      updateGallery(-1);
      setZindexLi();
      showList = 0;
    });
  
    // Track the current index of the gallery
    let currentIndex = -1;
  
    // Function to update the gallery display with animation
    function updateGallery(newIndex) {
      const currentItem = items[currentIndex];
      const nextItem = items[newIndex];
  
      if (newIndex == -1) {
        gsap.to("li", {
          duration: 0.5,
          left: "100%",
          right: "-120%",
          ease: "expo.inOut",
          rotate: `${Math.random() * 6 - 3}deg`,
          onComplete: () => {
            setZindexLi();
            currentIndex = newIndex;
          }
        });
      } else if (newIndex < currentIndex) {
        let flag = 0;
        if (currentItem.style.zIndex <= 5) {
          currentItem.style.zIndex = 10 - parseFloat(currentItem.style.zIndex);
          flag = 1;
        }
        gsap.to(currentItem, {
          duration: 0.5,
          left: "100%",
          right: "-100%",
          ease: "expo.inOut",
          rotate: `${Math.random() * 6 - 3}deg`,
          onComplete: () => {
            if (flag === 0) {
              currentItem.style.zIndex =
                10 - parseFloat(currentItem.style.zIndex);
            }
            currentIndex = newIndex;
          }
        });
      } else {
        let flag = 0;
        if (nextItem.style.zIndex <= 5) {
          nextItem.style.zIndex = 10 - parseFloat(nextItem.style.zIndex);
          flag = 1;
        }
  
        // Animate the next item in from the left
        gsap.to(nextItem, {
          duration: 0.5,
          left: 0,
          right: 0,
          rotate: `${Math.random() * 6 - 3}deg`,
          ease: "expo.inOut",
          onComplete: () => {
            if (flag === 0) {
              nextItem.style.zIndex = 10 - parseFloat(nextItem.style.zIndex);
            }
            currentIndex = newIndex;
          }
        });
      }
    }
  
    // Event listeners for buttons
    prevButton.addEventListener("click", function () {
      if (currentIndex > 0) {
        updateGallery(currentIndex - 1);
      }
    });
  
    nextButton.addEventListener("click", function () {
      if (currentIndex < items.length - 1) {
        updateGallery(currentIndex + 1);
      }
    });
  });
  