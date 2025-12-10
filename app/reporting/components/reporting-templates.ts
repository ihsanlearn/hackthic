export const reportTemplates = {
    h1: `## Summary
      [Describe the vulnerability briefly]

      ## Impact
      [Describe what an attacker can do]

      ## Steps to Reproduce
      1. Go to [URL]
      2. [Step 2]
      3. [Step 3]

      ## Mitigation
      [How to fix it]

      ## References
      - [Link]`,
    pentest: `**Vulnerability Name**: [Name]
      **Severity**: [Critical/High/Medium/Low]
      **Status**: [Open]

      ### Description
      [Detailed description]

      ### Proof of Concept
      \`\`\`bash
      [Command or Request]
      \`\`\`

      ### Remediation
      [Fix details]`,
    poc: `POST /api/v1/update HTTP/1.1
      Host: target.com
      Content-Type: application/json

      {
        "id": 1,
        "role": "admin"
    }`
  }
