function fetchData(){
    let tag = document.getElementById("tag").value;
    let epochMilli = Date.now();
    let toDate = Math.round(epochMilli/1000);
    let fromDate = toDate - 604800;

    const stackUrl = 'https://api.stackexchange.com/2.2/search?fromdate='+ fromDate +'&todate='+ toDate +'&order=desc&tagged='+ tag +'&site=stackoverflow'

    const mostVotedUrl = stackUrl + '&sort=votes';
    const newestUrl = stackUrl + '&sort=creation';
    fetchMostVoted(newestUrl,mostVotedUrl)

    
    // temp(newestUrl)
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
                let newestQuestions = newestData["items"].slice(0,10);
                let mostVoted = votedData["items"].slice(0,10);
                let mergedQuestions = newestQuestions.concat(mostVoted)

                mergedQuestions.sort((questionA,questionB) => questionB.creation_date - questionA.creation_date)
                
                for (let i = 0; i < mergedQuestions.length; i++) {
                    const question = mergedQuestions[i];
                    var creation_date = question["creation_date"];
                    var date = new Date(creation_date * 1000);

                    var year = date.getFullYear();
                    var month = date.getMonth() + 1;
                    var day = date.getDate();
                    document.getElementById("questions").innerHTML+="<p>" + question["title"] + " Date: " + year + "  " + month+ "  " + day +"</p>";
                }
                

        });
    });
}

function temp(newestUrl){
    fetch(newestUrl
        ).then(response => {
            if(response.ok){
                console.log("success")
            }
            else{
                console.log("not success")
            }
            return response.json();
        }).then(data =>{
            let newestQuestions = data["items"];
            for (let i = 0; i < 10; i++) {
                const question = newestQuestions[i];
                document.getElementById("questions").innerHTML+="<p>" + question["title"] + "</p>";
            }
    });
}
// try passing the json  array parameter