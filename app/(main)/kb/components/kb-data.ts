export interface OwaspItem {
    id: string;
    title: string;
    description: string;
}

export const owaspTop10: OwaspItem[] = [
    {
        id: "A01:2021",
        title: "Broken Access Control",
        description: "Access control enforces policy such that users cannot act outside of their intended permissions. Failures typically lead to unauthorized information disclosure, modification, or destruction of all data or performing a business function outside the user's limits."
    },
    {
        id: "A02:2021",
        title: "Cryptographic Failures",
        description: "Previously known as Sensitive Data Exposure, which is a symptom rather than a root cause. The renewed focus is on failures related to cryptography which often leads to sensitive data exposure or system compromise. Checks include weak crypto, weak keys, or improper certificate validation."
    },
    {
        id: "A03:2021",
        title: "Injection",
        description: "Injection allows an attacker to send hostile data to an interpreter. Common injections include SQL, NoSQL, OS command, Object Relational Mapping (ORM), LDAP, and Expression Language (EL) or OGNL injection. The data is not validated, filtered, or sanitized by the application."
    },
    {
        id: "A04:2021",
        title: "Insecure Design",
        description: "A new category for 2021, focusing on risks related to design flaws. If we want to move left as an industry, it calls for more use of threat modeling, secure design patterns, and reference architectures. An insecure design cannot be fixed by a perfect implementation."
    },
    {
        id: "A05:2021",
        title: "Security Misconfiguration",
        description: "Moved up from #6 in the previous edition. This includes insecure default configurations, incomplete or ad-hoc configurations, open cloud storage, misconfigured HTTP headers, and verbose error messages containing sensitive information."
    },
    {
        id: "A06:2021",
        title: "Vulnerable and Outdated Components",
        description: "Previously known as Using Components with Known Vulnerabilities. It is the only category not to have any Common Vulnerabilities and Exposures (CVEs) mapped to the included CWEs, so a default exploit and impact weight is factored into its score."
    },
    {
        id: "A07:2021",
        title: "Identification and Authentication Failures",
        description: "Previously known as Broken Authentication. This category includes vulnerabilities such as weak passwords, credential stuffing, brute force, session fixation, and missing multi-factor authentication."
    },
    {
        id: "A08:2021",
        title: "Software and Data Integrity Failures",
        description: "A new category for 2021, focusing on making assumptions related to software updates, critical data, and CI/CD pipelines without verifying integrity. This includes deserialization vulnerabilities and insecure software updates."
    },
    {
        id: "A09:2021",
        title: "Security Logging and Monitoring Failures",
        description: "Previously known as Insufficient Logging & Monitoring. This category helps to detect, escalate, and respond to active breaches. Without logging and monitoring, breaches cannot be detected."
    },
    {
        id: "A10:2021",
        title: "Server-Side Request Forgery",
        description: "SSRF flaws occur whenever a web application is fetching a remote resource without validating the user-supplied URL. It allows an attacker to coerce the application to send a crafted request to an unexpected destination, even when protected by a firewall, VPN, or another type of network access control list (ACL)."
    }
];
