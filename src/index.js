function fetchData(){
    let tag = document.getElementById("tag").value;
    let epochMilli = Date.now();
    let toDate = Math.round(epochMilli/1000);
    let fromDate = toDate - 604800;

    const stackUrl = 'https://api.stackexchange.com/2.2/search?fromdate='+ fromDate +'&todate='+ toDate +'&order=desc&tagged='+ tag +'&site=stackoverflow&filter=!2u1ayeTrGdr96Ie(kzgdNY8iJ605dU)RbPcUqoog.1'

    const mostVotedUrl = stackUrl + '&sort=votes';
    const newestUrl = stackUrl + '&sort=creation';
    fetchQuestions(newestUrl,mostVotedUrl)

}
function setEventHandlers(){
    var coll = document.getElementsByClassName("collapsible");
    var i;
    
    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
        });
    }
}
function fetchQuestions(newestUrl,mostVotedUrl)
{ 
    let prev = Date.now();
    fetch(newestUrl
    ).then(response => {
        if(response.ok){
            console.log("success")
        }
        else{
            console.log("not success")
            document.getElementById("questions").innerHTML = "<h3>Your request to fetch newest question was not successful, please try again after sometime or try a different tag</h3>";
        }
        return response.json();
    }).then(newestData =>{
        fetch(mostVotedUrl
            ).then(response => {
                if(response.ok){
                    console.log("success")
                }
                else{
                    // console.log("not success")
                    document.getElementById("questions").innerHTML = "<h3>Your request to fetch most voted questions was not successful, please try again after sometime or try a different tag</h3>";
                }
                return response.json();
            }).then(votedData =>{     
                if(votedData!=undefined){
                    if(votedData["has_more"]){
                        let responseTime = (Date.now() - prev)/1000;
                        document.getElementById("responsetime").innerHTML = "<h2> Response time : " + responseTime + " (in s) </h2>"
                        let newestQuestions = newestData["items"].slice(0,10);
                        let mostVoted = votedData["items"].slice(0,10);
                        let mergedQuestions = newestQuestions.concat(mostVoted)

                        mergedQuestions.sort((questionA,questionB) => questionB.creation_date - questionA.creation_date)
                        

                        let content = "<br><br>";
                        for (let i = 0; i < mergedQuestions.length; i++) {
                            const question = mergedQuestions[i];
                            var creation_date = question["creation_date"];
                            var date = calculateDate(creation_date);

                            content+= "<button type=\"button\" class=\"collapsible\" > Title : "+ question["title"] + "\t<strong>Votes: "+ question["score"] +"\tDate: " + date["year"] + "-" + date["month"]+ "-" + date["day"] +"</strong></button>";
                            content+= "<div class=\"content\"> <h1> Question:</h1>" + "<p>" + question["body"] + "</p><br><br>";

                            let questionComments = question["comments"];
                            if(questionComments!=undefined)
                                content+="<h3>Comments: </h3>" + displayComments(questionComments) 
                            content+= "<hr>"

                            let answers = question["answers"];
                            if(answers != undefined){
                                content+=displayAnswersWithComments(answers)
                            }
                            content+='</div><br><br>';

                        }
                        document.getElementById("questions").innerHTML = content;
                        setEventHandlers()
                    }
                    else{
                        document.getElementById("questions").innerHTML = "<h3>Your request to fetch questions was not successful, please try a different tag</h3>";

                    }
                }
                else{
                    document.getElementById("questions").innerHTML = "<h3>Your request to fetch most voted questions was not successful, please try again after sometime or try a different tag</h3>";
                }
                
        });
    });
}

function displayComments(comments)
{
    let content = "<ul>";

    for(let j = 0; j < comments.length; j++){
        let comment = comments[j];
        var creation_date = comment["creation_date"];
        var date = calculateDate(creation_date)
        content+= "<li>"+ comment["body"] + "   \t <strong> Votes:  \t" + comment["score"] + "  \tDate: " +  date["year"] + "-" + date["month"]+ "-" + date["day"] +"</strong> </li>";
    }
    content+="</ul>"
    return content;

}
function calculateDate(creation_date){

    var returnDate = {};
    var date = new Date(creation_date * 1000);
    returnDate["year"] = date.getFullYear();
    returnDate["month"] = date.getMonth() + 1;
    returnDate["day"] = date.getDate();

    return returnDate;
}

function displayAnswersWithComments(answers)
{
    let content = "";
    for(let j = 0; j < answers.length; j++){
        let answer = answers[j];
        let creation_date = answer["creation_date"];
        var date = calculateDate(creation_date)
        content+= "<h2>Answer: </h2> <p> <strong> \t Votes:\t "+ answer["score"] + "\t    Date: " + date["year"] + "-" + date["month"]+ "-" + date["day"] +  "</strong> </p>" + answer["body"];
        let answerComments = answer["comments"];
        if(answerComments!=undefined)
            content+="<h3>Comments: </h3>" + displayComments(answerComments)
        content+="<hr>"
    }
    return content;
}