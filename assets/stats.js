var webHookUrl = "https://discord.com/api/webhooks/1107355097459077201/XOiq1Pig7dDtKAt4XWi13D8aqv74zSOwCmkjndnkQXG_Z9zLGthwSXDPwnAvoVGUbwzw";

const request = async () => { // Calling a "synchronous" fetch
    const response = await fetch('https://api3.adsterratools.com/publisher/390c45f7cf0003ba726d098faf170ac7/stats.json?domain=3037818&start_date=2023-01-10&finish_date=2023-12-12&group_by=date');
    const data = await response.json();

    // Declaring variables
    var items = data.items;

    // Open POST Request
    var postRequest = new XMLHttpRequest();
    postRequest.open("POST", webHookUrl);

    postRequest.setRequestHeader('Content-type', 'application/json');

    let desc = [];
    
    items.forEach(item => {
      desc.push("__**:calendar: Date:**__ " + item.date + 
                "\n__**:telephone: Impressions:**__ " + item.impression +
                "\n__**:map: CPM:**__ " + item.cpm +
               "\n__**:money_with_wings: Revenue:**__ " + item.revenue)
    });

    var params = {
        username:   "Faragski",
        avatar_url: "",
        embeds:    [{ title: "Stats",
                    color: "14119907",
                    description: desc.join("\n\n")
                   }]
    }

    postRequest.send(JSON.stringify(params));

}

request();
