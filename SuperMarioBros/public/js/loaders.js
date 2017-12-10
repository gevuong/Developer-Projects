// function takes a url and returns a promise
export function loadImage(url) {
  return new Promise(resolve => {
    const image = new Image(); // create image instance and attach a "load" type event listener. Load event fires when image is downloaded and ready to display
    image.addEventListener('load', () => {
      resolve(image); // resolve promise with the image itself, meaning promise is fulfilled
    });
    image.src = url; // in order to initiate image downloading
  })
}

export function loadLevel(name) {
  return fetch(`/levels/${name}.json`)
    .then(res => res.json());
}
