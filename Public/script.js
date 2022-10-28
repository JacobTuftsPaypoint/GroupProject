const JamCamEndpoint = "https://api.tfl.gov.uk/Place/Type/JamCam";
const SpeedCameraEndpoint = "https://api.tfl.gov.uk/Place/Type/SpeedCam";
const RedLightCameraEndpoint = "https://api.tfl.gov.uk/Place/Type/RedLightCam";
const RedLightAndSpeedCamerasEndpoint =
  "https://api.tfl.gov.uk/Place/Type/RedLightAndSpeedCam";

class Map {
  constructor() {
    this.PreviousWindow = null;

    function initMap() {
      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: { lat: 51.507602, lng: -0.127816 },
      });

      App.ListJamCam().then(() => {
        for (let i = 0; i < App.cameras.length; i++) {
          const element = App.cameras[i];
          const marker = new google.maps.Marker({
            position: { lat: element.lat, lng: element.lon },
            map: map,
            icon: {
              url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
            },
          });
          const infowindow = new google.maps.InfoWindow({
            content: `<h2 style="color:black">${element.name}</h2><br><a href="${element.VideoUrl}" style="font-size:2rem" target="_blank">Video Link</a><br><img src="${element.ImageUrl}">`,
            ariaLabel: element.name,
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
      App.ListSpeedCam().then(() => {
        for (let i = 0; i < App.SpeedCameras.length; i++) {
          const element = App.SpeedCameras[i];
          const marker = new google.maps.Marker({
            position: { lat: element.lat, lng: element.lon },
            map: map,
            icon: {
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            },
          });
          const infowindow = new google.maps.InfoWindow({
            content: `<h1 style="color:black">Speed Camera</h1><br><h2 style="color:black">${element.name}</h2><br><h3 style="color:red; font-weight:bold">${element.speed}mph</h3>`,
            ariaLabel: element.name,
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
      App.ListRedLightCam().then(() => {
        for (let i = 0; i < App.RedLightCameras.length; i++) {
          const element = App.RedLightCameras[i];
          const marker = new google.maps.Marker({
            position: { lat: element.lat, lng: element.lon },
            map: map,
            icon: {
              url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
            },
          });
          const infowindow = new google.maps.InfoWindow({
            content: `<h1 style="color:black">Red Light Camera</h1><br><h2 style="color:black">${element.name}</h2>`,
            ariaLabel: element.name,
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
      App.ListRedLightAndSpeedCameras().then(() => {
        for (let i = 0; i < App.RedLightAndSpeedCameras.length; i++) {
          const element = App.RedLightAndSpeedCameras[i];
          const marker = new google.maps.Marker({
            position: { lat: element.lat, lng: element.lon },
            map: map,
            icon: {
              url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
            },
          });
          const infowindow = new google.maps.InfoWindow({
            content: `<h1 style="color:black">Red Light & Speed Camera</h1><br><h2 style="color:black">${element.name}</h2><br><h3 style="color:red; font-weight:bold">${element.speed}mph</h3>`,
            ariaLabel: element.name,
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

      map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);
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
    let vidlink = document.createElement("a");
    let img = document.createElement("img");

    if (this.status == "true") {
      name.style.backgroundColor = "green";
    } else {
      name.style.backgroundColor = "red";
    }

    vidlink.setAttribute("href", this.VideoUrl);
    vidlink.setAttribute("target", "_blank");
    vidlink.innerText = "Video clip";

    name.innerText = this.name;
    latp.innerHTML = `<b>Latitude:</b> ${this.lat}`;
    lonp.innerHTML = `<b>Longitude:</b> ${this.lon}`;

    img.setAttribute("src", this.ImageUrl);

    tile.appendChild(name);
    tile.appendChild(latp);
    tile.appendChild(lonp);
    tile.appendChild(vidlink);
    tile.appendChild(img);

    Container.appendChild(tile);
  }
}

class SpeedCamera {
  constructor(TempObj) {
    this.name = TempObj.commonName;
    this.lat = TempObj.lat;
    this.lon = TempObj.lon;
    this.speed = TempObj.additionalProperties[0].value;
  }
}

class RedLightCamera {
  constructor(TempObj) {
    this.name = TempObj.commonName;
    this.lat = TempObj.lat;
    this.lon = TempObj.lon;
  }
}

class RedLightAndSpeedCamera {
  constructor(TempObj) {
    this.name = TempObj.commonName;
    this.lat = TempObj.lat;
    this.lon = TempObj.lon;
    this.speed = TempObj.additionalProperties[0].value;
  }
}

class App {
  static cameras = [];
  static SpeedCameras = [];
  static RedLightCameras = [];
  static RedLightAndSpeedCameras = [];

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

  static SpeedCamRequest() {
    return App.HTTPGet(SpeedCameraEndpoint).then((result) => {
      return result.json();
    });
  }

  static async ListSpeedCam() {
    await App.SpeedCamRequest().then((result) => {
      result.forEach((element) => {
        App.SpeedCameras.push(new SpeedCamera(element));
      });
      console.log(App.SpeedCameras.length);
    });
  }

  static RedLightCamRequest() {
    return App.HTTPGet(RedLightCameraEndpoint).then((result) => {
      return result.json();
    });
  }

  static async ListRedLightCam() {
    await App.RedLightCamRequest().then((result) => {
      result.forEach((element) => {
        App.RedLightCameras.push(new RedLightCamera(element));
      });
      console.log(App.RedLightCameras.length);
    });
  }

  static RedLightAndSpeedCamRequest() {
    return App.HTTPGet(RedLightAndSpeedCamerasEndpoint).then((result) => {
      return result.json();
    });
  }

  static async ListRedLightAndSpeedCameras() {
    await App.RedLightAndSpeedCamRequest().then((result) => {
      result.forEach((element) => {
        App.RedLightAndSpeedCameras.push(new RedLightAndSpeedCamera(element));
      });
      console.log(App.RedLightAndSpeedCameras.length);
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
        if (
          camera.name.includes(location) ||
          camera.name.toLowerCase().includes(location.toLowerCase())
        ) {
          specificCameras.push(camera);
        }
      });

      console.log(specificCameras);

      if (specificCameras.length > 0) {
        resolve(specificCameras);
      } else {
        reject("Camera is not present");
      }
    });
  }
}

try {
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
} catch {
  console.log("Not present");
}
