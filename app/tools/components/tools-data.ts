export interface ToolItem {
  name: string;
  description: string;
  status: string;
  version: string;
  category: string;
  command: string;
}

export const proxy: ToolItem[] = [
  {
    name: "Burp Suite Professional",
    description: "Industry-standard proxy, scanner, and professional suite for web security testing.",
    status: "Connected",
    version: "2024.3",
    category: "Proxy",
    command: "java -jar burpsuite_pro.jar"
  },
  {
    name: "OWASP ZAP",
    description: "Open-source web application scanner and intercepting proxy.",
    status: "Offline",
    version: "2.14.0",
    category: "Proxy",
    command: "./zap.sh -daemon"
  },  
  {
    name: "Mitmproxy",
    description: "Interactive HTTPS proxy for debugging and testing HTTP traffic.",
    status: "Ready",
    version: "10.1.0",
    category: "Proxy",
    command: "mitmproxy"
  },
  {
    name: "Reqable",
    description: "Modern API debugging proxy supporting HTTP(S), WebSocket, gRPC.",
    status: "Ready",
    version: "2.7.0",
    category: "Proxy",
    command: "reqable"
  }
];

export const recon: ToolItem[] = [
  {
    name: "Amass",
    description: "Attack surface mapping and subdomain enumeration.",
    status: "Ready",
    version: "v4.3.0",
    category: "Recon",
    command: "amass enum -d target.com"
  },
  {
    name: "Subfinder",
    description: "Passive subdomain enumeration using curated sources.",
    status: "Ready",
    version: "v2.6.3",
    category: "Recon",
    command: "subfinder -d target.com"
  },
  {
    name: "Assetfinder",
    description: "Domain asset discovery made simple.",
    status: "Ready",
    version: "v0.1.0",
    category: "Recon",
    command: "assetfinder --subs-only target.com"
  },
  {
    name: "Chaos",
    description: "ProjectDiscovery's massive internet-wide asset database.",
    status: "Ready",
    version: "v1.1.1",
    category: "Recon",
    command: "chaos -d target.com -key $CHAOS_KEY"
  },
  {
    name: "Naabu",
    description: "High-speed port scanner.",
    status: "Ready",
    version: "2.1.6",
    category: "Recon",
    command: "naabu -host target.com"
  },
  {
    name: "httpx",
    description: "HTTP probe for checking live hosts.",
    status: "Ready",
    version: "v1.6.2",
    category: "Recon",
    command: "httpx -l hosts.txt"
  },
  {
    name: "Gowitness",
    description: "Screenshot capture for recon.",
    status: "Ready",
    version: "v2.5.1",
    category: "Recon",
    command: "gowitness file -f urls.txt"
  },
  {
    name: "Waybackurls",
    description: "Fetch archived URLs.",
    status: "Ready",
    version: "v0.1",
    category: "Recon",
    command: "waybackurls target.com"
  },
  {
    name: "Katana",
    description: "Next-gen crawler from ProjectDiscovery.",
    status: "Ready",
    version: "v1.0.0",
    category: "Recon",
    command: "katana -list live-hosts.txt -d 3 -jc -xhr -kf all -pc -fx -iqp -ef png,jpg,jpeg,gif,svg,css,woff,woff2,ttf,ico,map -c 10 -rl 100 -timeout 10 -jsonl -ob -or -o katana-live.json"
  },
  {
    name: "Hakrawler",
    description: "Go-based fast web crawler.",
    status: "Ready",
    version: "2.0",
    category: "Recon",
    command: "hakrawler -url https://target.com"
  },
  {
    name: "ParamSpider",
    description: "Advanced parameter finder for endpoints.",
    status: "Ready",
    version: "3.1",
    category: "Recon",
    command: "python3 paramspider.py --domain target.com"
  },
  {
    name: "Gau",
    description: "Fetch known URLs from AlienVault & Wayback.",
    status: "Ready",
    version: "2.2.0",
    category: "Recon",
    command: "gau target.com"
  },
  {
    name: "Gauplus",
    description: "GAU with filtering and performance improvements.",
    status: "Ready",
    version: "1.0",
    category: "Recon",
    command: "gauplus target.com"
  },
  {
    name: "Findomain",
    description: "Blazing fast subdomain enumeration.",
    status: "Ready",
    version: "9.0",
    category: "Recon",
    command: "findomain -t target.com"
  }
];

export const scanning: ToolItem[] = [
  {
    name: "Nuclei",
    description: "Template-based vulnerability scanner.",
    status: "Ready",
    version: "v3.1.2",
    category: "Scanner",
    command: "nuclei -u target.com"
  },
  {
    name: "Nikto",
    description: "Classic web server scanner.",
    status: "Ready",
    version: "2.5.0",
    category: "Scanner",
    command: "nikto -host https://target.com"
  },
  {
    name: "Wapiti",
    description: "Attack-based web vulnerability scanner.",
    status: "Ready",
    version: "v3.1.5",
    category: "Scanner",
    command: "wapiti -u https://target.com"
  },
  {
    name: "WhatWeb",
    description: "Website fingerprinting engine.",
    status: "Ready",
    version: "v0.5.5",
    category: "Scanner",
    command: "whatweb target.com"
  },
  {
    name: "Golismero",
    description: "Framework for scanning & recon automation.",
    status: "Ready",
    version: "2.0",
    category: "Scanner",
    command: "golismero scan target.com"
  }
];

export const fuzzing: ToolItem[] = [
  {
    name: "ffuf",
    description: "Fast web fuzzer.",
    status: "Ready",
    version: "v2.1.0",
    category: "Fuzzing",
    command: "ffuf -u https://target.com/FUZZ -w wordlist.txt"
  },
  {
    name: "Feroxbuster",
    description: "Recursive directory brute-forcing.",
    status: "Ready",
    version: "v2.10.0",
    category: "Fuzzing",
    command: "feroxbuster -u https://target.com -w wordlist.txt"
  },
  {
    name: "Dirsearch",
    description: "Path brute-forcer.",
    status: "Ready",
    version: "v0.4.3",
    category: "Fuzzing",
    command: "dirsearch -u https://target.com -w paths.txt"
  },
  {
    name: "Arjun",
    description: "Parameter discovery tool.",
    status: "Ready",
    version: "v2.2.1",
    category: "Fuzzing",
    command: "arjun -u https://target.com"
  },
  {
    name: "X8",
    description: "Parameter miner with smart mutation.",
    status: "Ready",
    version: "1.2",
    category: "Fuzzing",
    command: "x8 -u https://target.com"
  },
];

export const osint: ToolItem[] = [
  {
    name: "DNSX",
    description: "Fast DNS resolver.",
    status: "Ready",
    version: "v1.1.0",
    category: "Utility",
    command: "dnsx -l subs.txt"
  },
  {
    name: "MassDNS",
    description: "High performance DNS resolver.",
    status: "Ready",
    version: "0.3",
    category: "Utility",
    command: "massdns -r resolvers.txt -t A subs.txt"
  },
  {
    name: "GHunt",
    description: "Google account OSINT framework.",
    status: "Ready",
    version: "2.0",
    category: "OSINT",
    command: "ghunt email target@gmail.com"
  },
  {
    name: "theHarvester",
    description: "Passive OSINT footprinting.",
    status: "Ready",
    version: "4.4.0",
    category: "OSINT",
    command: "theHarvester -d target.com -b all"
  },
  {
    name: "Sherlock",
    description: "Find usernames across social platforms.",
    status: "Ready",
    version: "0.15",
    category: "OSINT",
    command: "sherlock username"
  },
  {
    name: "Holehe",
    description: "Check if email is linked to accounts.",
    status: "Ready",
    version: "1.6",
    category: "OSINT",
    command: "holehe email@gmail.com"
  }
];

export const exploitation: ToolItem[] = [
  {
    name: "Metasploit Framework",
    description: "Industry-standard exploitation suite.",
    status: "Ready",
    version: "6.3.19",
    category: "Exploitation",
    command: "msfconsole"
  },
  {
    name: "SQLMap",
    description: "SQL Injection automation.",
    status: "Ready",
    version: "1.8.4",
    category: "Exploitation",
    command: "sqlmap -u 'https://target.com/?id=1'"
  },
  {
    name: "XSStrike",
    description: "Advanced XSS scanner.",
    status: "Ready",
    version: "3.1.6",
    category: "Exploitation",
    command: "xsstrike -u https://target.com"
  },
  {
    name: "Xray",
    description: "Web scanner & interceptor.",
    status: "Ready",
    version: "1.9.0",
    category: "Exploitation",
    command: "./xray webscan --url https://target.com --html-output report.html"
  },
  {
    name: "Dalfox",
    description: "Powerful XSS & bypass scanner.",
    status: "Ready",
    version: "2.9.0",
    category: "Exploitation",
    command: "dalfox url https://target.com"
  },
  {
    name: "Commix",
    description: "Automatic command injection tool.",
    status: "Ready",
    version: "4.1",
    category: "Exploitation",
    command: "commix --url https://target.com"
  },
  {
    name: "CORSy",
    description: "Scan for CORS misconfigurations.",
    status: "Ready",
    version: "1.0",
    category: "Exploitation",
    command: "python corsy.py -u https://target.com"
  }
];