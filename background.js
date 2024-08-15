chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed and background script is running.");
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getIssueDetails") {
        console.log("Background script received request:", request);

        chrome.scripting.executeScript(
            {
                target: { tabId: sender.tab.id },
                files: ["content.js"]
            },
            () => {
                chrome.tabs.sendMessage(sender.tab.id, { action: "getIssueDetails" }, (response) => {
                    if (chrome.runtime.lastError) {
                        console.error("Error sending message to content script:", chrome.runtime.lastError);
                        sendResponse({ issues: [] });
                    } else {
                        console.log("Response from content script:", response);
                        sendResponse(response);
                    }
                });
            }
        );

        return true; // Indicate that the response will be sent asynchronously
    }
});
