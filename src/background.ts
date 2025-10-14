'use strict'

// Background service worker to handle CSP-safe script execution
// Uses chrome.scripting.executeScript which bypasses CSP restrictions

const browser_api = (self as any).browser || (self as any).chrome

// Listen for messages from content scripts requesting script execution
browser_api.runtime.onMessage.addListener(
    (message: any, sender: any, sendResponse: (response: any) => void) => {
        if (message.type === 'EXECUTE_USER_SCRIPT') {
            const tabId = sender.tab?.id
            const code = message.code

            if (!tabId || !code) {
                sendResponse({ success: false, error: 'Missing tabId or code' })
                return true
            }

            // Execute the user script in the main world context, bypassing CSP
            browser_api.scripting.executeScript({
                target: { tabId: tabId },
                world: 'MAIN' as any, // Execute in main world, not isolated world
                func: (userCode: string) => {
                    // Execute user code in the page context
                    try {
                        // Use indirect eval to execute in global scope
                        const result = (0, eval)(userCode)
                        return { success: true, result: result }
                    } catch (error: any) {
                        return { success: false, error: error.message }
                    }
                },
                args: [code]
            }).then((results: any[]) => {
                if (results && results[0]) {
                    sendResponse(results[0].result)
                } else {
                    sendResponse({ success: false, error: 'No result from script execution' })
                }
            }).catch((error: Error) => {
                sendResponse({ success: false, error: error.message })
            })

            return true // Keep message channel open for async response
        }
    }
)
