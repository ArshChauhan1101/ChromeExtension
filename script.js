document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const currentTab = tabs[0];
        const url = currentTab.url;

        if (url.includes('.atlassian.net/jira/software/projects/') && url.includes('/issues/')) {
            // Check if the URL is an issues page
            document.getElementById('jokeElement').textContent = 'You are on the JIRA issues page. Loading joke...';
            fetch('https://icanhazdadjoke.com/slack')
                .then(response => response.json())
                .then(jokeData => {
                    const jokeText = jokeData.attachments[0].text;
                    document.getElementById('jokeElement').textContent = jokeText;
                })
                .catch(error => {
                    console.error('Error fetching joke:', error);
                    document.getElementById('jokeElement').textContent = 'Failed to load joke.';
                });
        } else if (url.includes('.atlassian.net/jira')) {
            // Check if the URL is a general JIRA page
            document.getElementById('jokeElement').textContent = 'Congratulations you are on JIRA';
        } else {
            // Not a JIRA page
            document.getElementById('jokeElement').textContent = 'Nah, I don\'t wanna tell you jokes if this is not JIRA';
        }
    });
});
