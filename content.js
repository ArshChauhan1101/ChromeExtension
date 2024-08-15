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
                description: issue.querySelector('div[aria-label="Description area, start typing to enter text."]')
                    ? issue.querySelector('div[aria-label="Description area, start typing to enter text."]').textContent.trim()
                    : 'N/A',
                assignee: issue.querySelector('div[role="img"] > span[hidden]') 
                    ? issue.querySelector('div[role="img"] > span[hidden]').textContent.trim() 
                    : 'N/A',
                reporter: issue.querySelector('a[data-testid="issue-navigator.ui.issue-results.detail-view.card-list.card.reporter"]')
                    ? issue.querySelector('a[data-testid="issue-navigator.ui.issue-results.detail-view.card-list.card.reporter"]').textContent.trim()
                    : 'N/A',
                status: issue.querySelector('span[data-testid="issue-navigator.ui.issue-results.detail-view.card-list.card.status"]')
                    ? issue.querySelector('span[data-testid="issue-navigator.ui.issue-results.detail-view.card-list.card.status"]').textContent.trim()
                    : 'N/A'
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
