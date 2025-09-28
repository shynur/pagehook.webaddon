#! pwsh

return

cd $PSScriptRoot
cd ..

gci "dist" -Recurse -Filter "*.js" | %  {
    $srcFilePath = Join-Path "src" (
        [IO.Path]::ChangeExtension(
            $_.FullName.Substring((Resolve-Path "dist").Path.Length + 1),
            ".mts"
        )
    )

    if (Test-Path $srcFilePath) {
        $newDistFile = [IO.Path]::ChangeExtension($_.FullName, ".mjs")
        ren $_.FullName $newDistFile
        echo "Renamed $($_.FullName) -> $newDistFile"
    }
}
