"use client"

import { ShieldAlert, CheckCircle2, XCircle } from "lucide-react"

export default function LegalPage() {
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col gap-6 p-4 md:gap-8 md:p-8">
       <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4 border-b border-red-500/20 pb-6">
            <div className="p-3 bg-red-500/10 rounded-lg">
                <ShieldAlert className="h-14 w-14 text-red-500" />
            </div>
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-red-500">Legal & Ethical Notice</h1>
                <p className="text-muted-foreground">Mandatory compliance guidelines for using this platform.</p>
                <p className="text-xs text-muted-foreground mt-1 italic">
                    Last Updated: December 2025
                </p>
            </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-6">
                <div className="rounded-lg border border-red-500/20 bg-red-950/10 p-6">
                    <h2 className="text-xl font-semibold text-red-400 mb-4">Warning: Strict Legal Compliance</h2>
                    <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                        <p>
                            All tools, payloads, and methodologies provided in <strong className="text-foreground">Hunt.Hub</strong> are strictly for <strong className="text-red-400">ETHICAL & LEGAL USE ONLY</strong>.
                        </p>
                        <p>
                            You must only perform security testing on your own systems or systems where you have obtained <strong className="text-foreground">explicit written permission</strong> from the owner.
                        </p>
                        <p className="border-l-2 border-red-500/50 pl-4 py-1 italic text-foreground/80">
                            Any form of unauthorized access, intrusion, scanning, exploitation, or interruption of electronic 
                            systems is <strong>ILLEGAL in all countries</strong> and may result in severe criminal penalties.
                            <br />
                            <br />
                            This includes, but is not limited to, laws such as:
                            <ul className="list-disc pl-6 mt-1">
                            <li>Computer Fraud & Abuse Act (CFAA) – United States</li>
                            <li>Computer Misuse Act – United Kingdom</li>
                            <li>Cybercrime Act – Australia</li>
                            <li>General Data Protection Regulation (GDPR) – Europe</li>
                            <li>Singapore Computer Misuse and Cybersecurity Act (CMCA)</li>
                            <li>Your country’s relevant cybercrime & electronic transaction laws</li>
                            </ul>
                            <br />
                            <strong>Especially in Indonesia</strong>, unauthorized cyber activities are punishable under:
                            <ul className="list-disc pl-6 mt-1">
                            <li><strong>UU ITE (Undang-Undang Informasi dan Transaksi Elektronik)</strong></li>
                            <li><strong>KUHP (Kitab Undang-Undang Hukum Pidana)</strong></li>
                            </ul>
                        </p>
                    </div>
                </div>

                 <div className="rounded-lg border border-white/5 bg-card/50 p-6">
                    <h2 className="text-lg font-semibold mb-4">Disclaimer of Liability</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        The developers, contributors, and the owner of that website assume <strong>NO RESPONSIBILITY</strong> for any misuse of these tools or information. All actions taken by the user are their own sole responsibility. Functionality is provided "as is" for educational and defensive purposes only.
                    </p>
                </div>
            </div>

            <div className="space-y-6">
                 <div className="rounded-lg border border-green-500/20 bg-green-950/5 p-6">
                    <h2 className="text-lg font-semibold text-green-500 mb-4 flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5" /> Allowed Activities
                    </h2>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                        <li className="flex gap-2">
                            <span className="text-green-500 font-bold">•</span>
                            Security research in isolated home labs.
                        </li>
                        <li className="flex gap-2">
                            <span className="text-green-500 font-bold">•</span>
                            Authorized Bug Bounty hunting on platforms (e.g., HackerOne, Bugcrowd) following their specific policy scope and ensuring minimal disruption and avoiding excessive scanning load.
                        </li>
                        <li className="flex gap-2">
                            <span className="text-green-500 font-bold">•</span>
                            Penetration testing with signed contracts and Rules of Engagement (RoE).
                        </li>   
                    </ul>
                </div>

                <div className="rounded-lg border border-red-500/20 bg-red-950/5 p-6">
                    <h2 className="text-lg font-semibold text-red-500 mb-4 flex items-center gap-2">
                        <XCircle className="h-5 w-5" /> Prohibited Activities
                    </h2>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                        <li className="flex gap-2">
                             <span className="text-red-500 font-bold">•</span>
                            Scanning or attacking government, educational, or corporate websites without permission.
                        </li>
                        <li className="flex gap-2">
                             <span className="text-red-500 font-bold">•</span>
                            Using tools for malicious intent, data theft, or disruption of service (DoS).
                        </li>
                        <li className="flex gap-2">
                             <span className="text-red-500 font-bold">•</span>
                            Sharing or selling sensitive data (credentials, PII) obtained through these tools.
                        </li>
                    </ul>
                </div>

                <div className="p-4 text-center text-xs text-muted-foreground opacity-70">
                    By accessing and using this platform, you acknowledge and agree to these terms completely.
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
