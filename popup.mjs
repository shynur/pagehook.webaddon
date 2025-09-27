const text_area = document.getElementById('shynur-webaddon-pagehook-codearea')

const [{url}] = await (window.chrome || window.browser).tabs.query({active: true, currentWindow: true})
console.log('[shynur] 当前 URL:', url)

const host = new URL(url).hostname
console.log('[shynur] 当前 host:', host)

const saved_code = (await (window.chrome || window.browser).storage.local.get([host]))[host]?.trim()
console.log('[shynur] 之前保存的代码:', '\n' + saved_code)
text_area.value = typeof saved_code == 'string' ? saved_code : ''

text_area.addEventListener(
    'input',
    () => (window.chrome || window.browser).storage.local.set(
        {
            [host]: text_area.value
        }
    )
)
