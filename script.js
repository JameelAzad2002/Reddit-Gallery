let images = []; //to store all images recieved from the API

const imageContainer = document.getElementById('imageContainer');

//creating the image element to be plcaed
function createImageElement(imageUrl, imageTitle) {
  const imageDiv = document.createElement('div');
  imageDiv.classList.add('image');
  
  const imageElement = document.createElement('img');
  imageElement.src = imageUrl;
  imageElement.alt = imageTitle;

  const titleDiv = document.createElement('div');
  titleDiv.classList.add('title');
  titleDiv.innerHTML += imageTitle;


  // Add event listener to open image in a new tab
  imageElement.addEventListener('click', () => {
    window.open(imageUrl, '_blank');
  });

  imageDiv.appendChild(imageElement);
  imageDiv.appendChild(titleDiv);
  imageContainer.appendChild(imageDiv);
}

//fetch the pictures from the subreddit
function sendReq(req) {
  fetch(req)
    .then(response => response.json())
    .then(data => {
      images = data.data.children;

      //create image element for each image
      images.forEach(image => {
        const imageUrl = image.data.url;
        const imageTitle = image.data.title;

        //make sure it is image before creating the image element and is not hosted on external platform like imgur
        if ((imageUrl.endsWith(".jpg") || imageUrl.endsWith(".jpeg") || imageUrl.endsWith(".png")) && !imageUrl.includes("imgur.com")) {
          createImageElement(imageUrl, imageTitle);
        };
      });
    })
    .catch(error => {
      console.log('An error occurred:', error);
    });
}


//implement search
const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', () => {
  const searchQuery = searchInput.value.trim().toLowerCase();

  //if search query is empty
  if (searchQuery === '') {
    images.forEach(image => {
      const imageUrl = image.data.url;
      if ((imageUrl.endsWith(".jpg") || imageUrl.endsWith(".jpeg") || imageUrl.endsWith(".png")) && !imageUrl.includes("imgur.com")) {
        createImageElement(image.data.url, image.data.title);
      }
    });
  } else {
    const filteredImages = images.filter(image => {
      const title = image.data.title.toLowerCase();
      return title.includes(searchQuery);
    });

    imageContainer.innerHTML = '';
    filteredImages.forEach(image => {
      const imageUrl = image.data.url;
      if ((imageUrl.endsWith(".jpg") || imageUrl.endsWith(".jpeg") || imageUrl.endsWith(".png")) && !imageUrl.includes("imgur.com")) {
        createImageElement(image.data.url, image.data.title);
      }
    });
  }
});


//implement size change
const sizeInput = document.getElementById('size');
const container = document.getElementById('imageContainer');

sizeInput.addEventListener('change', () => {
  const size = sizeInput.value;

  if (size === 'small') {
    container.classList.add('S');
    container.classList.remove('M');
    container.classList.remove('L');
  } else if (size === 'medium') {
    container.classList.add('M');
    container.classList.remove('S');
    container.classList.remove('L');
  } else if (size === 'large') {
    container.classList.add('L');
    container.classList.remove('M');
    container.classList.remove('S');
  }
});



//implement sorting of images by new,top etc.
//default fetch
document.addEventListener('DOMContentLoaded', () => {
  sendReq('https://www.reddit.com/r/pics/hot.json?limit=500') //default sort option is hot
});

function clearImageContainer() {
  imageContainer.innerHTML = '';
}

const sortInput = document.getElementById('sort');

sortInput.addEventListener('change', () => {
  const sortBy = sortInput.value;

  clearImageContainer(); //clear the previous fetch

  if (sortBy === 'hot') {
    const url = 'https://www.reddit.com/r/pics/hot.json?limit=500';
    const req = new Request(url);
    sendReq(req);
  }
  else if (sortBy === 'new') {
    const url = 'https://www.reddit.com/r/pics/new.json?limit=500';
    const req = new Request(url);
    sendReq(req);
  }
  else if (sortBy == 'top') {
    const url = 'https://www.reddit.com/r/pics/top.json?limit=500';
    const req = new Request(url);
    sendReq(req);
  }
  else if (sortBy == 'rising') {
    const url = 'https://www.reddit.com/r/pics/rising.json?limit=500';
    const req = new Request(url);
    sendReq(req);
  }
})








