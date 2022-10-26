const JamCamEndpoint = "https://api.tfl.gov.uk/Place/Type/JamCam"

class App{
    constructor(){

    }
    HTTPGet(Address){
        return fetch(Address,{
            method:"get",
            headers:{
                "Cache-Control":"no-cache"
            }
        })
    }
    JamCamRequest(){
        return this.HTTPGet(JamCamEndpoint).then(result=>{return(result.json())}) 
    }
    async ListJamCam(){
       await this.JamCamRequest().then(result=>{console.log(result)})
    }
}

let CurrentInstance = new App

CurrentInstance.ListJamCam()
