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
  static async ListJamCam() {
    await App.JamCamRequest().then((result) => {
      console.log(result);
    });
  }
}

App.ListJamCam();
