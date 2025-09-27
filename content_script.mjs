if (document.readyState === 'complete')
    my_hook()
else
    window.addEventListener('load', my_hook, { once: true })

async function my_hook() {
    const saved_code = (
        await (window.chrome || window.browser).storage.local.get([location.hostname])
    )[location.hostname]

    const hook_src = URL.createObjectURL(
        new Blob([saved_code], { type: 'text/javascript' })
    )

    const hook_node = document.createElement('script')
    hook_node.type = 'module'
    hook_node.src = hook_src
    hook_node.setAttribute('shynur-webaddon-pagehook', location.hostname)

    hook_node.onload = hook_node.onerror = function() {
        URL.revokeObjectURL(hook_src)
    }

    document.documentElement.appendChild(hook_node)
}
