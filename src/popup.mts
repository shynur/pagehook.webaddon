const text_area = document.getElementById(
    'shynur-webaddon-pagehook-codearea'
)! as HTMLTextAreaElement

const [{url}] = await ((window as any).chrome || (window as any).browser).tabs.query(
    {active: true, currentWindow: true}
) as [{url: string}]
console.log('[shynur] 当前 URL:', url)

const host = new URL(url).hostname
console.log('[shynur] 当前 host:', host)

const saved_code = (await ((window as any).chrome || (window as any).browser).storage.local.get(
    [host]
))[host]?.trim() as (string | undefined)

console.log('[shynur] 之前保存的代码:', '\n' + saved_code)
text_area.value = typeof saved_code == 'string' ? saved_code : ''

text_area.addEventListener(
    'input',
    () => ((window as any).chrome || (window as any).browser).storage.local.set(
        {
            [host]: text_area.value
        }
    )
)
