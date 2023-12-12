//console.log("connection check")
const issuesList = document.getElementById("issuesList");
//console.log(issuesListe)
const issueInputForm = document.getElementById("issueInputForm")

issueInputForm.addEventListener("submit", saveIssue);

function saveIssue(e) {
  let issueDesc = document.getElementById("issueDescInput").value;
  let issueSeverity = document.getElementById("issueSeverityInput").value;
  let issueAssignedTo = document.getElementById("issueAssignedToInput").value;
  let issueId = chance.guid();
  let issueStatus = "Open";

  let issue = {
    id: issueId,
    description: issueDesc,
    severity: issueSeverity,
    assignedTo: issueAssignedTo,
    status: issueStatus,
  };

  if (localStorage.getItem("issues") == null) {
    let issues = [];
    issues.push(issue);
    localStorage.setItem("issues", JSON.stringify(issues));
  } else {
    let issues = JSON.parse(localStorage.getItem("issues"));
    issues.push(issue);
    localStorage.setItem("issues", JSON.stringify(issues));
  }

  issueInputForm.reset();

  fetchIssues();

  e.preventDefault();
}

function setStatusClosed(id){
    let issues = JSON.parse(localStorage.getItem("issues"))

    for(let i=0; i < issues.length; i++)
    if(issues[i].id == id){
        issues[i].status = "Closed";

    }

    localStorage.setItem("issues",JSON.stringify(issues));

    fetchIssues();

}

function deleteIssue(id){
    let issues = JSON.parse(localStorage.getItem("issues"))

    for(let i=0; i < issues.length; i++)
    if(issues[i].id == id){
        issues.splice(i, 1);
    }

    localStorage.setItem("issues",JSON.stringify(issues));

    fetchIssues();

}


function fetchIssues() {
  const issues = JSON.parse(localStorage.getItem("issues"));
  issuesList.innerHTML = ``;
  if (!issues || !issues.length) {
    console.log("No issues found or issues is null.");
    return;
  }

  for (let i = 0; i < issues.length; i++) {
    let id = issues[i].id;
    let desc = issues[i].description;
    let severity = issues[i].severity;
    let assignedTo = issues[i].assignedTo;
    let status = issues[i].status;

    //    issuesList.innerHTML += `<div class="well"></div>`+
    //                             `<h6>Issue ID:` + id + `</h6>`
    //                             `<p><span class="label label-info">` + status + `</span></p>`

    issuesList.innerHTML += `
        <div class="well">
        <h6>Issue ID: ${id}</h6>
        <p><span class="status-info">${status}</span></p>
        <h3>${desc}</h3>
        <p><i class="bi bi-clock"></i> ${severity}</p>
        <p><i class="bi bi-person-fill"></i> ${assignedTo}</p>
        <a href="#" onClick="setStatusClosed('${id}')" class="btn btn-warning">Close</a>
        <a href="#" onClick="deleteIssue('${id}')" class="btn btn-danger">Delete</a>
        </div>
        `;
  }
}

fetchIssues();
