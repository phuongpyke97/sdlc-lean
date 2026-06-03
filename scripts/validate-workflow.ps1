param(
    [string]$PullRequestBodyPath = ""
)

$ErrorActionPreference = "Stop"
$failed = $false

function Pass($message) {
    Write-Host "PASS: $message" -ForegroundColor Green
}

function Fail($message) {
    Write-Host "FAIL: $message" -ForegroundColor Red
    $script:failed = $true
}

function Check-Path($path) {
    if (Test-Path $path) { Pass $path } else { Fail "Missing $path" }
}

$requiredPaths = @(
    "README.md",
    "docs/workflow.md",
    "docs/change-types.md",
    "docs/requirement-quality.md",
    "docs/definition-of-done.md",
    "docs/risk-matrix.md",
    "docs/approval-policy.md",
    "docs/test-strategy.md",
    "docs/review-checklist.md",
    "docs/ai-agent-policy.md",
    "docs/graphify-protocol.md",
    "templates/requirement-brief.md",
    "templates/impact-analysis.md",
    ".github/PULL_REQUEST_TEMPLATE.md"
)

foreach ($path in $requiredPaths) {
    Check-Path $path
}

if ($PullRequestBodyPath -ne "") {
    if (-not (Test-Path $PullRequestBodyPath)) {
        Fail "PR body file not found: $PullRequestBodyPath"
    } else {
        $body = Get-Content $PullRequestBodyPath -Raw
        $requiredSections = @("Change type", "Summary", "Impact analysis", "Test evidence", "Rollback plan")
        foreach ($section in $requiredSections) {
            if ($body -match [regex]::Escape($section)) { Pass "PR body has $section" } else { Fail "PR body missing $section" }
        }
    }
}

if ($failed) {
    Write-Host "Workflow validation failed." -ForegroundColor Red
    exit 1
}

Write-Host "Workflow validation passed." -ForegroundColor Green
exit 0
