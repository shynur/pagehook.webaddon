'use strict'

if (document.readyState === 'complete')
    my_hook()
else
    window.addEventListener('load', my_hook, {once:true})

async function my_hook() {
    const browser_api = (window as any).browser || (window as any).chrome
    const saved_code = (
        await browser_api.storage.local.get([location.hostname])
    )[location.hostname] as (string | undefined)

    if (!saved_code)
        return

    // Send message to background service worker to execute the script
    // This bypasses CSP restrictions since scripting.executeScript runs in privileged context
    browser_api.runtime.sendMessage({
        type: 'EXECUTE_USER_SCRIPT',
        code: saved_code
    }, (response: any) => {
        if (response && !response.success) {
            console.error('[pagehook] Failed to execute user script:', response.error)
        }
    })
}
