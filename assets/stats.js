var webHookUrl = "https://discord.com/api/webhooks/1211802871050281011/LTJ-f5cYHfxQ8X5Uy4Wq9erRLaFl7DiNPs_VEysLpgRoLvQo9sGYnQC25rL22PJzruEy?hf-ignore";

const request = async () => { // Calling a "synchronous" fetch
    const response = await fetch('https://cors-anywhere.herokuapp.com/api3.adsterratools.com/publisher/390c45f7cf0003ba726d098faf170ac7/stats.json?domain=3037818&start_date=2023-01-10&finish_date=2024-12-12&group_by=date');
    const data = await response.json();

    // Declaring variables
    var items = data.items.reverse();

    // Open POST Request
    var postRequest = new XMLHttpRequest();
    postRequest.open("POST", webHookUrl);

    postRequest.setRequestHeader('Content-type', 'application/json');

    let desc = [];
    let totalrev = 0;
    
    items.forEach(item => {
      desc.push("__**:calendar: Date:**__ " + item.date + 
                "\n__**:telephone: Impressions:**__ " + item.impression +
                "\n__**:map: CPM:**__ " + item.cpm +
               "\n__**:money_with_wings: Revenue:**__ $" + item.revenue);
        totalrev = totalrev + item.revenue;
    });

    var params = {
        username:   "Faragski",
        avatar_url: "",
        embeds:    [{ title: "Past Week Stats",
                    color: "14119907",
                    description: "__**:moneybag: TOTAL:**__ $" + totalrev.toFixed(2) + "\n\n\n" + desc.slice(0, 7).join("\n\n")
                   }]
    }

    postRequest.send(JSON.stringify(params));

}

request();