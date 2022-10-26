const JamCamEndpoint = "https://api.tfl.gov.uk/Place/Type/JamCam"

class JamCam {
    constructor(){

    }
}

class App{
    constructor(){

    }
    static HTTPGet(Address){
        return fetch(Address,{
            method:"get",
            headers:{
                "Cache-Control":"no-cache"
            }
        })
    }
    static JamCamRequest(){
        return this.HTTPGet(JamCamEndpoint).then(result=>{return(result.json())}) 
    }
    static async ListJamCam(){
       await this.JamCamRequest().then(result=>{console.log(result)})
    }
}

App.ListJamCam()
