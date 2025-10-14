'use strict'

if (document.readyState === 'complete')
    my_hook()
else
    window.addEventListener('load', my_hook, {once:true})

async function my_hook() {
    const saved_code = (
        await ((window as any).browser || (window as any).chrome).storage.local.get([location.hostname])
    )[location.hostname] as (string | undefined)

    if (!saved_code)
        return

    const hook_node = document.createElement('script')
    hook_node.type = 'module'
    hook_node.textContent = saved_code
    hook_node.setAttribute('shynur-webaddon-pagehook', location.hostname)

    document.documentElement.appendChild(hook_node)
}
