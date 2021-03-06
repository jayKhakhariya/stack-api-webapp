
function fetchData(){
    // calculate the past week and pass it in form of toDate and fromDate
    // also get the tag from the front end
    tag = document.getElementById("tag").innerHTML;
    print(tag);
    let mostVoted = fetchMostVoted();
    let newest = fetchNewest();

    mostVoted.forEach(question => {
        document.getElementById("questions").innerHTML+="<p>" + question["score"] + "</p>";
    });


    // data["items"][i]["creation_date"] : creation date of question[i], calculate the date from epoch time
    // data["items"][i]["title"] : title of question[i]
    // data["items"][i]["score"] : vote count of question[i]
}
function fetchNewest()
{
    const url = 'https://api.stackexchange.com/2.2/search?order=desc&sort=creation&tagged=java&site=stackoverflow&filter=!)rfa1JCWE(zXRbJs7(30';

    fetch(url
    ).then( response => {
        if(response.ok){
            console.log("success")
        }
        else{
            console.log("not success")
        }
        return response.json();
    }).then(data =>{
        // date is unix epoch (calculate the current time and the time before the week
        
        // let newestQuestions = data["items"];
        // for (let i = 0; i < 1; i++) {
        //     const question = newestQuestions[i];
        //     console.log("Title:",question["title"])
        //     console.log("creation date:",question["creation_date"])
        //     console.log("Vote count:",question["score"]);
            
        // }
        return data["items"];
    });
}
function fetchMostVoted()
{
    let tag = document.getElementById("tag").value;
    print(tag)
    const url = 'https://api.stackexchange.com/2.2/search?order=desc&sort=votes&tagged='+ tag +'&site=stackoverflow&filter=!)rfa1JCWE(zXRbJs7(30';

    fetch(url
    ).then( response => {
        if(response.ok){
            console.log("success")
        }
        else{
            console.log("not success")
        }
        return response.json();
    }).then(data =>{
        // date is unix epoch (calculate the current time and the time before the week
        // data["items"][i]["creation_date"] : creation date of question[i], calculate the date from epoch time
        // data["items"][i]["title"] : title of question[i]
        // data["items"][i]["score"] : vote count of question[i]
        let mostVoted = data["items"];
        // mostVoted.forEach(question => {
        //     document.getElementById("questions").innerHTML+="<p>" + question["score"] + "</p>";
        // });
        for (let i = 0; i < 1; i++) {
            const question = mostVoted[i];
            // console.log(question);
            document.getElementById("questions").innerHTML+="<p>" + question["score"] + "</p>";
            // console.log("Title:",question["title"])
            // console.log("creation date:",question["creation_date"])
            // console.log("Vote count:",question["score"]);
        }
        return data["items"];
    });

}
// fetchData()