function fetchData(){
    let tag = document.getElementById("tag").value;
    let epochMilli = Date.now();
    let toDate = Math.round(epochMilli/1000);
    let fromDate = toDate - 604800;

    const stackUrl = 'https://api.stackexchange.com/2.2/search?fromdate='+ fromDate +'&todate='+ toDate +'&order=desc&tagged='+ tag +'&site=stackoverflow'

    const mostVotedUrl = stackUrl + '&sort=votes';
    const newestUrl = stackUrl + '&sort=creation';
    fetchMostVoted(newestUrl,mostVotedUrl)
}
function fetchMostVoted(newestUrl,mostVotedUrl)
{ 
    fetch(newestUrl
    ).then(response => {
        if(response.ok){
            console.log("success")
        }
        else{
            console.log("not success")
        }
        return response.json();
    }).then(newestData =>{
        fetch(mostVotedUrl
            ).then(response => {
                if(response.ok){
                    console.log("success")
                }
                else{
                    console.log("not success")
                }
                return response.json();
            }).then(votedData =>{
                let newestQuestions = newestData["items"];
                let mostVoted = votedData["items"];
                for (let i = 0; i < 10; i++) {
                    const question = newestQuestions[i];
                    document.getElementById("questions").innerHTML+="<p>" + question["title"] + "</p>";
                }
                
                for (let i = 0; i < 10; i++) {
                    const question = mostVoted[i];
                    document.getElementById("questions").innerHTML+="<p>" + question["title"] + "</p>";
                }
        });
    });
}
// try passing the json  array parameter