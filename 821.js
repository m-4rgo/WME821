//so the way this very simple code works -- each option has a title, and when you click the button, it adds that as a class to the main box.
//this toggles visibility for the image and the text
function changePane(title) {
  var mainpanel = document.getElementById('berry-hunt-wrap');
  var berryText = document.querySelector(".berry-hunt-textbox");

  mainpanel.className = title;
  berryText.scrollTop = 0

  //this hides buttons that have been clicked already, to prevent loops (may not be needed depending on plot) (commented out for now)
  //event.target.classList.add("hidden");
}

//This adds the correct item to inventory, and adds the item as a class to the image box to show the right ingredients at the end
function inventory(item) {
  var itemImage = document.getElementById(item);
  var innerContainer = document.getElementById('berry-hunt-container');

  itemImage.classList.add("earned");
  innerContainer.classList.add(item);
}

//This checks to see if you've gotten ANY items, some items, or ALL items, and changes your text
function successCheck() {
  var collectedItem = document.querySelectorAll(".earned.collectable");

  console.log(collectedItem);

  if (collectedItem.length === 0) {
    changePane("fail");
  }

  else if (collectedItem.length === 5) {
    changePane("perfect");
  }

  else {
    changePane("success");
  }
}

//This clears the game when you restart
function clearItems() {
  
  Array.from(document.querySelectorAll('.earned.collectable')).forEach(
    (el) => el.classList.remove('earned')
  );

  document.getElementById("berry-hunt-container").classList = "";

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Event listeners for all keypress functions

document.addEventListener("keydown", keyPress);

function keyPress (e) {
  if(e.key === "Escape") {
    escapeClose();
  }

  if(e.key === "ArrowLeft") {
    tabLeft();
  }

  if(e.key === "ArrowRight") {
    tabRight();
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//This lets all display images open to a modal view
var image = document.querySelectorAll(".display-image");
//add listeners to all of the icons
for (i = 0; i < image.length; i++) {
  image[i].addEventListener('click', modalOpen);
}

function modalOpen() {
  if(!this.parentNode.classList.contains("open")) {
    this.parentNode.classList.add("open");
  } else {
    this.parentNode.classList.remove("open");
  }
}

//This lets you close them with escape

function escapeClose (e) {
    var openModal = document.querySelectorAll(".art-wrap.open");
    if(openModal.length !== 0) {
        openModal[0].classList.remove("open");
    }
}

//And THIS lets you close them with an x button inside
var closeButtons = document.querySelectorAll(".close-button");

for (i = 0; i < closeButtons.length; i++) {
  closeButtons[i].addEventListener("click", buttonClose);
}

function buttonClose() {
  var openModal = this.closest(".open");
  openModal.classList.remove("open");

}

//This lets you tab left & right

//This lets all display images open to a modal view
var image = document.querySelectorAll(".left-arrow");
//add listeners to all of the icons
for (i = 0; i < image.length; i++) {
  image[i].addEventListener('click', tabLeft);
}

//This lets all display images open to a modal view
var image = document.querySelectorAll(".right-arrow");
//add listeners to all of the icons
for (i = 0; i < image.length; i++) {
  image[i].addEventListener('click', tabRight);
}

function tabLeft() {
  var openModal = document.querySelectorAll(".art-wrap.open");
  if(openModal.length > 0) {
    openModal[0].classList.remove("open");
    openModal[0].classList.remove("notrans");

    if(openModal[0].previousElementSibling !== null && openModal[0].previousElementSibling.classList.contains("art-wrap")) {
      openModal[0].previousElementSibling.classList.add("open");
      openModal[0].previousElementSibling.classList.add("notrans");
    } else {
      openModal[0].closest(".info-row").scrollIntoView();
    }
  }
}

function tabRight() {
  var openModal = document.querySelectorAll(".art-wrap.open");
  if(openModal.length > 0) {
    openModal[0].classList.remove("open");
    openModal[0].classList.remove("notrans");

    if(openModal[0].nextElementSibling !== null && openModal[0].nextElementSibling.classList.contains("art-wrap")) {
      openModal[0].nextElementSibling.classList.add("open");
      openModal[0].nextElementSibling.classList.add("notrans");
    } else {
      openModal[0].closest(".info-row").scrollIntoView({block: "end"});
    }
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//allows for tooltips to play nice on mobile, using JS. Noscript is backup styling for no JS to maintain functionality
var tooltip = document.querySelectorAll(".tooltip");
//add listeners to all of the icons
for (i = 0; i < tooltip.length; i++) {
  tooltip[i].addEventListener('mouseenter', tooltipToggle);
  tooltip[i].addEventListener('mouseleave', tooltipToggle);
  tooltip[i].addEventListener('click', tooltipToggle);
}

function tooltipToggle() {
  tooltipActive = event.target;

  if (!tooltipActive.classList.contains("open")) {
    tooltipActive.classList.add("open"); }
  else {
    tooltipActive.classList.remove("open");
  }
}