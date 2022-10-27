const JamCamEndpoint = "https://api.tfl.gov.uk/Place/Type/JamCam";

const cameras = [];
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
    let lonp = document.createElement("p");
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
  constructor() {}
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
        Cameras.push(new JamCam(element));
      });
    });
  }

  static async CreateJamCamTiles(DOMElement) {
    App.ListJamCam().then(() => {
      for (let i = 0; i < Cameras.length; i++) {
        const element = Cameras[i];
        element.CreateTile(DOMElement);
      }
    });
  }

  static async getSpecificJamCam(location) {
    await App.JamCamRequest().then((result) => {
      for (const camera of result) {
        if (camera.commonName === location) {
          console.log("Found Camera!");

          console.log(camera);

          break;
        }
      }
    });
  }
}

App.getSpecificJamCam("A3 West Hill/Up Richmond Rd");
