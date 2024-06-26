document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const currentTab = tabs[0];
        const url = currentTab.url;

        console.log('Current tab URL:', url);

        if (url.includes('.atlassian.net/jira/software/projects/') && url.includes('/issues/')) {
            document.getElementById('jokeElement').textContent = 'You are on the JIRA issues page. Loading issue details...';

            chrome.tabs.sendMessage(currentTab.id, { action: "getIssueDetails" }, function(response) {
                if (chrome.runtime.lastError) {
                    console.error('Error sending message to content script:', chrome.runtime.lastError);
                    document.getElementById('jokeElement').textContent = 'Failed to load issue details.';
                } else {
                    console.log('Response from content script:', response);

                    if (response && response.issues) {
                        if (response.issues.length === 0) {
                            document.getElementById('jokeElement').textContent = 'No issues found on the page.';
                        } else {
                            let issueDetailsHTML = '<h2>Issue Details:</h2>';
                            response.issues.forEach(issue => {
                                issueDetailsHTML += `
                                    <div class="issue">
                                        <h3>${issue.title}</h3>
                                        <p><strong>Description:</strong> ${issue.description}</p>
                                        <p><strong>Assignee:</strong> ${issue.assignee}</p>
                                        <p><strong>Reporter:</strong> ${issue.reporter}</p>
                                        <p><strong>Status:</strong> ${issue.status}</p>
                                    </div>
                                `;
                            });
                            document.getElementById('jokeElement').innerHTML = issueDetailsHTML;
                        }
                    } else {
                        console.log('No issues found in the response.');
                        document.getElementById('jokeElement').textContent = 'Failed to load issue details.';
                    }
                }
            });

        } else if (url.includes('.atlassian.net/jira')) {
            document.getElementById('jokeElement').textContent = 'Congratulations you are on JIRA';

        } else {
            document.getElementById('jokeElement').textContent = 'Wait What you are not on JIRA. Haw! Dont talk to me :(';
        }
    });
});
