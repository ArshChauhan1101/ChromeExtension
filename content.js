chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getIssueDetails") {
        console.log('Content script received request:', request);

        let issues = [];
        document.querySelectorAll('li[data-testid="issue-navigator.ui.issue-results.detail-view.card-list.card.list-item"]').forEach(issue => {
            console.log('Processing issue element:', issue);
            
            let issueDetails = {
                title: issue.querySelector('div[data-testid="issue-navigator.ui.issue-results.detail-view.card-list.card.summary"]') 
                    ? issue.querySelector('div[data-testid="issue-navigator.ui.issue-results.detail-view.card-list.card.summary"]').textContent.trim() 
                    : 'N/A',
                description: 'N/A',
                assignee: issue.querySelector('div[role="img"] > span[hidden]') 
                    ? issue.querySelector('div[role="img"] > span[hidden]').textContent.trim() 
                    : 'N/A',
                reporter: 'N/A',
                status: 'N/A'
            };

            console.log('Extracted issue details:', issueDetails);

            issues.push(issueDetails);
        });

        if (issues.length > 0) {
            console.log('Issues found:', issues);
            sendResponse({ issues: issues });
        } else {
            console.log('No issues found on the page.');
            sendResponse({ issues: [] });
        }
    }
});
