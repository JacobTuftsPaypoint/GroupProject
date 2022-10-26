const JamCamEndpoint = "https://api.tfl.gov.uk/Place/Type/JamCam";

class App {
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

  static async ListAllJamCams() {
    await App.JamCamRequest().then((result) => {
      console.log(result);
    });
  }
}

App.getSpecificJamCam("A3 West Hill/Up Richmond Rd");
