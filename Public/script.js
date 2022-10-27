const JamCamEndpoint = "https://api.tfl.gov.uk/Place/Type/JamCam";

class Map {
  constructor() {
    this.PreviousWindow = null;

    function initMap() {
      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: { lat: 51.507602, lng: -0.127816 },
      });

      App.ListJamCam().then(() => {
        for (let i = 0; i < Cameras.length; i++) {
          const element = Cameras[i];
          const marker = new google.maps.Marker({
            position: { lat: element.lat, lng: element.lon },
            map: map,
            fillColor: "green",
          });
          const infowindow = new google.maps.InfoWindow({
            content: `<h2>${element.name}</h2><br><img src="${element.ImageUrl}">`,
            ariaLabel: "Uluru",
          });
          marker.addListener("click", () => {
            try {
              this.PreviousWindow.close();
            } catch (error) {
              console.log("no previous oppened");
            }
            infowindow.open({
              anchor: marker,
              map,
            });
            this.PreviousWindow = infowindow;
          });
        }
      });
    }
    window.initMap = initMap;
  }
}

class JamCam {
  constructor(TempObj) {
    this.name = TempObj.commonName;
    this.lat = TempObj.lat;
    this.lon = TempObj.lon;
    this.ImageUrl = TempObj.additionalProperties[1].value;
    this.VideoUrl = TempObj.additionalProperties[2].value;
    this.status = TempObj.additionalProperties[0].value;
  }
  CreateTile(Container) {
    let tile = document.createElement("section");
    let name = document.createElement("h4");
    let latp = document.createElement("p");
    latp.id = "latp";
    let lonp = document.createElement("p");
    lonp.id = "lonp";
    let img = document.createElement("img");

    if (this.status == "true") {
      tile.style.backgroundColor = "green";
    } else {
      tile.style.backgroundColor = "red";
    }

    name.innerText = this.name;
    latp.innerText = this.lat;
    lonp.innerText = this.lon;
    img.setAttribute("src", this.ImageUrl);

    tile.appendChild(name);
    tile.appendChild(latp);
    tile.appendChild(lonp);
    tile.appendChild(img);

    Container.appendChild(tile);
  }
}

class App {
  static cameras = [];

  static HTTPGet(Address) {
    return fetch(Address, {
      method: "get",
      headers: {
        "Cache-Control": "no-cache",
      },
    });
  }

  static JamCamRequest() {
    return App.HTTPGet(JamCamEndpoint).then((result) => {
      return result.json();
    });
  }

  static async ListJamCam() {
    await App.JamCamRequest().then((result) => {
      result.forEach((element) => {
        App.cameras.push(new JamCam(element));
      });
      console.log(App.cameras.length);
    });
  }

  static async CreateJamCamTiles(DOMElement) {
    App.ListJamCam().then(() => {
      for (let i = 0; i < App.cameras.length; i++) {
        const element = App.cameras[i];
        element.CreateTile(DOMElement);
      }
    });
  }

  static getSpecificJamCam(location) {
    return new Promise((resolve, reject) => {
      const specificCameras = [];

      App.cameras.forEach((camera) => {
        if (camera.name === location) {
          specificCameras.push(camera);
        }
      });

      if (specificCameras.length > 0) {
        resolve(specificCameras);
      } else {
        reject("Camera is not present");
      }
    });
  }
}

const searchBar = document.querySelector("#search-bar");
const searchButton = document.querySelector("#search-button");

searchBar.addEventListener("keypress", (event) => {
  if (event.key === "Enter" && searchBar.value.length > 0) {
    App.getSpecificJamCam(searchBar.value).then((cameras) => {
      const container = document.querySelector(".ListContainer");

      container.innerHTML = "";

      cameras.forEach((camera) => {
        camera.CreateTile(container);
      });
    });
  } else if (event.key === "Enter" && searchBar.value.length === 0) {
    const container = document.querySelector(".ListContainer");
    container.innerHTML = "";
    App.CreateJamCamTiles(container);
  }
});

searchButton.addEventListener("click", (event) => {
  if (searchBar.value.length > 0) {
    App.getSpecificJamCam(searchBar.value).then((cameras) => {
      const container = document.querySelector(".ListContainer");

      container.innerHTML = "";

      cameras.forEach((camera) => {
        camera.CreateTile(container);
      });
    });
  } else if (searchBar.value.length === 0) {
    const container = document.querySelector(".ListContainer");
    container.innerHTML = "";
    App.CreateJamCamTiles(container);
  }
});
