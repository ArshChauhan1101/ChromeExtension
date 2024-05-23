document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const currentTab = tabs[0];
        const url = currentTab.url;

        if (url.includes('.atlassian.net/jira')) {
            document.getElementById('jokeElement').textContent = 'You are on JIRA. Loading joke...';
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
        } else {
            document.getElementById('jokeElement').textContent = 'This is not JIRA.';
        }
    });
});