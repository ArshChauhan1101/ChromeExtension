chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getIssueDetails") {
        console.log('Content script received request:', request);

        let issues = [];
        document.querySelectorAll('.ghx-issue').forEach(issue => {
            let issueDetails = {
                title: issue.querySelector('.ghx-summary') ? issue.querySelector('.ghx-summary').textContent.trim() : 'N/A',
                description: issue.querySelector('.ghx-description') ? issue.querySelector('.ghx-description').textContent.trim() : 'N/A',
                assignee: issue.querySelector('.ghx-avatar-img') ? issue.querySelector('.ghx-avatar-img').getAttribute('alt') : 'N/A',
                reporter: issue.querySelector('.ghx-reporter') ? issue.querySelector('.ghx-reporter').textContent.trim() : 'N/A',
                status: issue.querySelector('.ghx-status') ? issue.querySelector('.ghx-status').textContent.trim() : 'N/A'
            };
            issues.push(issueDetails);
        });

        console.log('Issues found:', issues);
        sendResponse({ issues: issues });
    }
});
