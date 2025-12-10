export type DorkEngine = 'google' | 'github' | 'shodan' | 'fofa' | 'censys' | 'hunter'

interface DorkItem {
    name: string
    query: string
}

interface DorkCategory {
    category: string
    items: DorkItem[]
}

export const dorksData: Record<DorkEngine, DorkCategory[]> = {
    google: [
        {
            category: "Specific Files",
            items: [
                { name: "Exposed Environment Files (.env)", query: "ext:env | inurl:/.env | inurl:/.env.example | inurl:/.env.local" },
                { name: "Git Config Exposure", query: "inurl:/.git/config | intitle:\"Index of /.git\"" },
                { name: "Docker Compose Exposure", query: "inurl:docker-compose.yml | inurl:docker-compose.yaml" },
                { name: "Kubeconfig Exposure", query: "inurl:/.kube/config | inurl:config.json | inurl:admin.conf" },
                { name: "NPM Registry Log (Auth Token)", query: "inurl:.npmrc | intext:\"_authToken\"" },
                { name: "Backup Files (Large Archives)", query: "ext:bkf | ext:bkp | ext:bak | ext:old | ext:backup | ext:zip | ext:tar.gz | ext:rar | ext:sql.gz" },
                { name: "Swagger UI Docs", query: "inurl:/swagger-ui.html | inurl:/api-docs | inurl:/v2/api-docs" },
                { name: "GraphQL Introspection", query: "inurl:/graphql | inurl:/graphiql | intext:\"GraphQL Playground\"" },
                { name: "Apache Server Status", query: "inurl:/server-status | intext:\"Apache Status\"" },
                { name: "Spring Boot Actuators", query: "inurl:/actuator/health | inurl:/actuator/env | inurl:/actuator/metrics" },
                { name: "Laravel Debug Mode", query: "intext:\"Whoops! There was an error.\" intext:\"Laravel\"" },
                { name: "Django Debug/Settings", query: "intext:\"DisallowedHost\" | intext:\"DEBUG = True\"" },
                { name: "Rails Web Console", query: "intext:\"Rails.application.config.web_console.whitelisted_ips\"" },
                { name: "PHP Info Page", query: "ext:php intitle:phpinfo \"PHP Version\"" },
                { name: "S3 Bucket Direct Access", query: "site:s3.amazonaws.com | site:storage.googleapis.com | site:blob.core.windows.net" },
                { name: "Publicly Exposed Documents", query: "ext:doc | ext:docx | ext:odt | ext:rtf | ext:sxw | ext:psw | ext:ppt | ext:pptx | ext:pps | ext:csv" },
                { name: "Directory Listing", query: "intitle:index.of" },
                { name: "Configuration Files", query: "ext:xml | ext:conf | ext:cnf | ext:reg | ext:inf | ext:rdp | ext:cfg | ext:txt | ext:ora | ext:ini" },
                { name: "Database Files", query: "ext:sql | ext:dbf | ext:mdb | ext:sqlite" },
                { name: "Log Files", query: "ext:log" },
                { name: "Subdomain Takeover - Pantheon", query: "site:pantheonsite.io \"404 Error\"" },
                { name: "Subdomain Takeover - Tumblr", query: "site:tumblr.com \"Whatever you were looking for doesn't currently exist at this address\"" },
                { name: "Subdomain Takeover - Cargo", query: "site:cargocollective.com \"404 Not Found\"" },
                { name: "Subdomain Takeover - StatusPage", query: "site:statuspage.io \"Better Status Communication\"" },
                { name: "Subdomain Takeover - UserVoice", query: "site:uservoice.com \"This UserVoice subdomain is currently available!\"" },
                 { name: "Subdomain Takeover - Surge.sh", query: "site:surge.sh \"project not found\"" },
                 { name: "Subdomain Takeover - Ghost", query: "site:ghost.io \"The thing you were looking for is no longer here\"" },
                 { name: "Subdomain Takeover - Bitbucket", query: "site:bitbucket.io \"Repository not found\"" }
            ]
        },
        {
            category: "Parameters (IDOR/SSRF/RCE)",
            items: [
                { name: "Potential IDOR (User/Account IDs)", query: "inurl:id= | inurl:user_id= | inurl:account_id= | inurl:member_id= | inurl:profile_id=" },
                { name: "Potential IDOR (Numeric IDs)", query: "inurl:order_id= | inurl:invoice_id= | inurl:transaction_id= | inurl:report_id=" },
                { name: "Potential SSRF (URL Params)", query: "inurl:url= | inurl:uri= | inurl:link= | inurl:src= | inurl:source= | inurl:target= | inurl:dest= | inurl:destination=" },
                { name: "Potential SSRF (Callback/Proxy)", query: "inurl:callback= | inurl:proxy= | inurl:redirect= | inurl:next= | inurl:return= | inurl:goto=" },
                { name: "Potential RCE (Cmd/Exec)", query: "inurl:cmd= | inurl:exec= | inurl:command= | inurl:execute= | inurl:ping= | inurl:query= | inurl:code=" },
                { name: "Potential LFI (File/Path)", query: "inurl:file= | inurl:path= | inurl:read= | inurl:folder= | inurl:dir= | inurl:doc= | inurl:document=" },
                { name: "Potential LFI (Include/Require)", query: "inurl:include= | inurl:require= | inurl:inc= | inurl:locate= | inurl:page= | inurl:view=" },
                { name: "Potential XSS (Search/Query)", query: "inurl:q= | inurl:s= | inurl:search= | inurl:query= | inurl:keyword= | inurl:lang= | inurl:title= | inurl:name=" },
                { name: "Potential Open Redirect", query: "inurl:return_to= | inurl:returnUrl= | inurl:continue= | inurl:checkout_url= | inurl:logout=" },
                { name: "Potential SQLi (Select/Where)", query: "inurl:select= | inurl:where= | inurl:from= | inurl:update= | inurl:delete= | inurl:order=" },
                { name: "Debug/Dev Parameters", query: "inurl:debug=true | inurl:dev=1 | inurl:test=1 | inurl:admin=true" }
            ]
        },
        {
            category: "Secrets & Keys",
            items: [
                { name: "Exposed API Keys", query: "intext:\"api_key\" OR intext:\"apikey\" OR intext:\"api-key\" filetype:txt | filetype:json | filetype:xml" },
                { name: "Exposed Access Tokens", query: "intext:\"access_token\" OR intext:\"auth_token\" OR intext:\"bearer_token\"" },
                { name: "Exposed Client Secrets", query: "intext:\"client_secret\" OR intext:\"client_id\" filetype:json | filetype:js" },
                { name: "Stripe API Keys", query: "intext:\"sk_live_\" OR intext:\"rk_live_\"" },
                { name: "AWS Credentials", query: "intext:\"aws_access_key_id\" OR intext:\"aws_secret_access_key\"" },
                { name: "Google API Keys", query: "intext:\"AIzaSy\"" },
                { name: "Slack Webhooks", query: "intext:\"hooks.slack.com/services/\"" },
                { name: "Discord Webhooks", query: "intext:\"discord.com/api/webhooks/\"" },
                { name: "Twilio Credentials", query: "intext:\"AC\" + \"twilio\"" },
                { name: "Mailgun Credentials", query: "intext:\"key-\" + \"mailgun\"" },
                { name: "PayPal Credentials", query: "intext:\"paypal_secret\" OR intext:\"paypal_client\"" },
                 { name: "Firebase Config", query: "intext:\"firebaseConfig\" OR intext:\"apiKey\" OR intext:\"authDomain\"" },
                 { name: "Algolia Keys", query: "intext:\"algolia\" + \"apiKey\" + \"appId\"" },
                 { name: "SendGrid Keys", query: "intext:\"SG.\"" },
                 { name: "Square Keys", query: "intext:\"sq0atp-\" OR intext:\"sq0csp-\"" }
            ]
        },
         {
            category: "Classic Sensitive Files",
            items: [
                { name: "Backup Files", query: "ext:bkf | ext:bkp | ext:bak | ext:old | ext:backup" },
                { name: "Environment Files", query: "ext:env | inurl:.env | intext:\"APP_KEY=\"" },
                { name: "Git Folders", query: "intitle:\"index of\" \".git\"" },
                { name: "SSH Keys", query: "ext:pem | ext:ppk | ext:id_rsa" },
                { name: "Shell History", query: "ext:bash_history | ext:zsh_history | ext:mysql_history" },
                { name: "Git Directory in Index", query: "intitle:\"index of /.git\" | intext:\"HEAD\" ext:txt" },
                { name: "Exposed Database Backup (.sql)", query: "ext:sql intext:\"password\" | intext:\"user\"" },
                { name: "Apache HTTPD Config", query: "ext:conf inurl:httpd.conf" },
                { name: "Database Log Files", query: "ext:log intext:\"failed to connect\" | intext:\"connection refused\"" },
                { name: "AWS Credentials (Global)", query: "intext:aws_access_key_id intext:aws_secret_access_key" },
                { name: "SSL Certificates", query: "intext:\"BEGIN CERTIFICATE\" | intext:\"PRIVATE KEY\" ext:pem | ext:crt" },
                { name: "SSH Configuration", query: "ext:pub intext:\"ssh-rsa\" | intext:\"BEGIN OPENSSH PRIVATE KEY\"" },
                { name: "YAML Credentials", query: "ext:yml | ext:yaml intext:\"password:\" | intext:\"secret:\"" },
                { name: "Software Licenses", query: "ext:lic | ext:key intext:\"license key\"" },
                { name: "Source Code Backups (Tar/GZ)", query: "ext:tar | ext:tar.gz | ext:tgz intext:backup" },
                { name: "Employee Email Lists", query: "filetype:csv | filetype:xls intext:\"employee\" | intext:\"staff\"" }
            ]
        },
        {
            category: "Login Portals",
            items: [
                { name: "Login Pages", query: "inurl:login" },
                { name: "Admin Portals", query: "intitle:\"login\" \"admin\"" },
                { name: "Signup Pages", query: "inurl:signup | inurl:register" },
                { name: "Portal Login", query: "intitle:\"portal\" \"login\"" },
                { name: "Dashboard Login", query: "intitle:\"Dashboard\" inurl:login" },
                { name: "VPN Portals", query: "field:\"cisco-vpn-client\" | inurl:\"/vpn/index.html\"" },
                { name: "Webmail", query: "inurl:webmail | inurl:exchange | inurl:owa" },
                { name: "Single Sign On (SSO)", query: "inurl:sso | inurl:cas | inurl:auth" },
                { name: "WordPress Admin", query: "inurl:wp-admin" },
                { name: "Joomla Admin", query: "inurl:administrator/index.php" },
                { name: "cPanel/WHM", query: "inurl:cpanel | inurl:whm" },
                { name: "phpMyAdmin", query: "inurl:phpmyadmin | intitle:\"phpMyAdmin\"" },
                { name: "Router Login", query: "intitle:\"Router\" inurl:login" },
                { name: "Web Server Status", query: "intitle:\"Apache Status\" | intitle:\"Nginx Status\"" },
                { name: "NetScaler Login", query: "inurl:vpn/tmindex.html" },
                { name: "Outdated Framework Login", query: "\"powered by\" AND \"login\" inurl:vendor" },
                { name: ".NET Login Pages", query: "ext:aspx | ext:asp \"login\" | \"signin\"" },
                { name: "Login Page Template", query: "\"login\" filetype:html | filetype:htm intext:username" },
                { name: "Exposed Admin Dashboard", query: "intext:\"Welcome admin\" | intext:\"Admin dashboard\"" },
                { name: "Login with User/Pass Params", query: "allinurl:login user password" }
            ]
        },
        {
            category: "Vulnerabilities",
            items: [
                { name: "SQL Syntax Errors", query: "intext:\"sql syntax near\" | intext:\"syntax error has occurred\" | intext:\"incorrect syntax near\" | intext:\"unexpected end of SQL command\"" },
                { name: "PHP Errors", query: "\"PHP Parse error\" | \"PHP Warning\" | \"PHP Error\"" },
                { name: "Stack Traces", query: "\"stack trace\"" },
                { name: "Struts RCE", query: "filetype:action | filetype:do" },
                { name: "Open Redirects", query: "inurl:\"return=\" | inurl:\"next=\" | inurl:\"redir=\" | inurl:\"url=\"" },
                { name: "LFI Potential", query: "inurl:\"include=\" | inurl:\"page=\" | inurl:\"file=\"" },
                { name: "MySQL SQL Injection", query: "intext:\"You have an error in your SQL syntax\"" },
                { name: "PostgreSQL SQL Injection", query: "intext:\"PostgreSQL query failed: ERROR:\"" },
                { name: "Blind SQLi Error", query: "intext:\"supplied argument is not a valid MySQL result resource\"" },
                { name: "XSS via Parameters", query: "inurl:\"q=\" | inurl:\"search=\" | inurl:\"keyword=\" intext:\".js\" | intext:\".php\"" },
                { name: "LFI (etc/passwd)", query: "inurl:\"../../../../../etc/passwd\"" },
                { name: "RCE Clues (exec)", query: "intext:\"exec(\" | intext:\"shell_exec(\" filetype:php" },
                { name: "Exposed PHPMailer", query: "intext:\"PHPMailer\" inurl:contact | inurl:feedback" },
                { name: "SSRF Clues", query: "inurl:\"redirect_uri=\" | inurl:\"callback_url=\" | inurl:\"proxy=\"" },
                { name: "XXE Clues", query: "filetype:xml intext:\"DOCTYPE SYSTEM\"" },
                { name: "Potential IDOR (User ID)", query: "inurl:\"user_id=\" | inurl:\"account_id=\" | inurl:\"client_id=\"" },
                { name: "Node.js Stack Trace", query: "intext:\"Error: Can't set headers after they are sent to the client\"" },
                { name: "Rails Stack Trace", query: "intext:\"ActionController::RoutingError\"" },
                { name: "Swagger/OpenAPI Docs", query: "intext:\"swagger: '2.0'\" | intext:\"openapi: 3.0.0\" filetype:yaml | filetype:json" },
                { name: "GraphQL Endpoints", query: "inurl:/graphql | intext:\"GraphiQL\"" },
                { name: "CORS Misconfiguration", query: "intext:\"Access-Control-Allow-Origin: *\"" },
                { name: "Admin/Secure Directory Listing", query: "intitle:\"Index of /admin\" | intitle:\"Index of /secure\" | intitle:\"Index of /uploads\"" },
                { name: "Publicly Accessible Assets", query: "\"publicly accessible\" | \"No authentication required\" | \"exposed\"" },
                { name: "Exposed Config/Debug Info", query: "\"exposed\" AND (\"configuration\" | \"debug\" | \"monitoring\")" },
                { name: "CORS Policy Blocked", query: "intext:\"has been blocked by CORS policy\"" },
                { name: "PHP Misconfiguration", query: "\"allow_url_fopen On\" | \"allow_url_include On\"" },
                { name: "Missing HSTS Header", query: "\"Strict-Transport-Security\" -intext:\"max-age\"" },
                { name: "Generic SQL Errors", query: "intext:\"SQL syntax\" | intext:\"mysql_fetch\" | intext:\"invalid query\" | intext:\"SQLSTATE\"" },
                { name: "PHP Fatal Errors", query: "\"Fatal error\" | \"Parse error\" | \"Warning: require\" | \"Warning: include\"" },
                { name: "Stack Traces (Java/Python)", query: "\"Stack trace\" | \"NullPointerException\" | \"TypeError\" | \"Unhandled exception\"" },
                { name: "Framework Errors (Rails/Django)", query: "\"Rails error\" | \"django error\" | \"express error\" | \"PDOException\"" },
                { name: "Server Fingerprinting", query: "intext:\"X-Powered-By: PHP\" | inurl:phpinfo.php" },
                { name: "Debug Mode Exposed", query: "\"Debug mode\" | \"Application is running in DEBUG mode\"" },
                { name: "API Keys in JS", query: "\"api key\" | \"secret\" | \"token\" filetype:js" },
                { name: "CSRF Token Leak", query: "\"csrf token\" | \"X-CSRF-TOKEN\" filetype:js | filetype:html" },
                { name: "Parameter Tampering", query: "intext:\"Parameter tampering\" | intext:\"Invalid parameter\"" },
                { name: "Open File Download", query: "\"file download\" | \"get file\" ext:php | ext:aspx" }
            ]
        },
         {
            category: "Network Devices",
            items: [
                { name: "Cisco Configuration", query: "inurl:\"cisco.cfg\"" },
                { name: "Network Cameras", query: "inurl:\"/view.shtml\" \"Network Camera\"" },
                { name: "Printers", query: "inurl:printer/main.html | intitle:\"Printer Status\"" },
                { name: "Routers", query: "inurl:\"/level/15/exec/-/\"" },
                { name: "Generic Webcam", query: "intitle:\"webcam\" inurl:8080 | inurl:80" },
                { name: "HP ILO Server", query: "intitle:\"HP Integrated Lights-Out\"" },
                { name: "Dell iDRAC Server", query: "intitle:\"iDRAC6\" | intitle:\"iDRAC7\"" }
            ]
        },
        {
            category: "Cloud Storage",
            items: [
                { name: "S3 Buckets", query: "site:s3.amazonaws.com" },
                { name: "Azure Blobs", query: "site:blob.core.windows.net" },
                { name: "DigitalOcean Spaces", query: "site:digitaloceanspaces.com" },
                { name: "Google Storage", query: "site:googleapis.com/storage" },
                { name: "Firebase", query: "site:firebaseio.com" },
                { name: "Slack Tokens on GitHub", query: "site:github.com intext:\"xoxp-\" | intext:\"xoxb-\"" },
                { name: "AWS Secret Keys on GitHub", query: "site:github.com filename:config intext:aws_secret_access_key" },
                { name: "Exposed Azure Storage", query: "site:blob.core.windows.net intext:\"storage account\"" },
                { name: "Google Cloud Bucket Listing", query: "site:storage.googleapis.com intitle:\"index of\"" },
                { name: "Docker Compose Passwords", query: "filename:docker-compose.yml intext:\"password\"" },
                { name: "Serverless Logs", query: "intext:\"START RequestId\" | intext:\"END RequestId\"" },
                { name: "Firebase Public Access", query: "site:firebaseio.com intext:\"authentication required\"" },
                { name: "Heroku Config Vars", query: "site:herokuapp.com intext:\"DATABASE_URL\" | intext:\"SECRET_KEY\"" },
                { name: "Open Source Repos", query: "intitle:\"index of\" \"/src/\"" },
                { name: "Public SSH Keys", query: "ext:pub intext:ssh-rsa" },
                { name: "S3 Access Denied Error", query: "site:s3.amazonaws.com intext:\"Access Denied\"" },
                { name: "DigitalOcean Bucket Error", query: "site:digitaloceanspaces.com intext:\"The specified bucket does not exist\"" },
                { name: "Firebase Storage Index", query: "site:firebasestorage.googleapis.com intitle:\"index of\"" },
                { name: "Shared/Public Buckets", query: "\"bucket\" AND (\"public\" | \"shared\")" },
                { name: "Bucket Policy Leaks", query: "\"bucket\" AND (\"policy.json\" | \"policy.xml\")" },
                { name: "S3 Public-Read ACL", query: "intext:\"Acl public-read\" | intext:\"public-read-write\"" },
                { name: "S3 Backups/Config", query: "\"S3\" AND (\"backup\" | \"dump\" | \"config\")" },
                { name: "CloudFront Origin (S3)", query: "\"CloudFront\" AND \"index of\" inurl:s3" },
                { name: "Firebase Rules Leak", query: "\"firebase\" AND \"rules.json\" filetype:json" },
                { name: "Azure Containers", query: "\"azure\" AND (\"container\" | \"storage account\")" },
                { name: "GCP Buckets", query: "\"gcloud\" AND (\"storage\" | \"bucket\")" },
                { name: "Open Bucket Keywords", query: "\"openbucket\" | \"exposed bucket\"" },
                { name: "CORS Storage Config", query: "\"cross-origin\" AND \"storage\" filetype:xml | filetype:json" },
                { name: "Azure SAS Tokens", query: "\"sv=2020-08-04\" AND \"sig=\" intext:token" },
                { name: "AWS ARN Exposure", query: "intext:\"arn:aws:iam::\" | intext:\"arn:aws:s3:::\"" }
            ]
        },
         {
            category: "Software & Services",
            items: [
                { name: "Jenkins Login", query: "intitle:\"Jenkins\" inurl:login" },
                { name: "Jira Dashboard", query: "inurl:\"/secure/Dashboard.jspa\"" },
                { name: "Kibana", query: "intitle:\"Kibana\"" },
                { name: "Grafana", query: "intitle:\"Grafana\"" },
                { name: "RabbitMQ Management", query: "intitle:\"RabbitMQ Management\"" },
                { name: "GitLab", query: "inurl:gitlab" },
                { name: "Trello Boards", query: "site:trello.com" },
                { name: "Slack Tokens", query: "intext:\"xoxp-\" | intext:\"xoxb-\"" },
                { name: "Grafana Dashboards", query: "intitle:\"Grafana\" inurl:/login | inurl:/dashboard" },
                { name: "Kibana Dashboards", query: "intitle:\"Kibana\" inurl:app/kibana" },
                { name: "Jupyter Notebooks", query: "intitle:\"Index of /\" intext:\"jupyter\"" },
                { name: "ElasticSearch Head", query: "intitle:\"Elasticsearch Head\" | intext:\"cluster_name\"" },
                { name: "Redis Manager", query: "intitle:\"Redis Manager\" | inurl:redis" },
                { name: "MQTT Brokers", query: "intitle:\"MQTT Broker Status\"" },
                { name: "WebLogic Console", query: "intitle:\"Oracle WebLogic Server Administration Console\"" },
                { name: "ColdFusion Admin", query: "inurl:/CFIDE/administrator/index.cfm" },
                { name: "Jenkins Exposed Jobs", query: "intitle:\"Jenkins\" intext:\"Build History\"" },
                { name: "Zabbix Monitoring", query: "intitle:\"Zabbix\" inurl:zabbix.php" },
                { name: "Confluence Dashboard", query: "inurl:confluence/dashboard.action" },
                { name: "Nexus Repository", query: "intitle:\"Nexus Repository Manager\"" },
                { name: "Artifactory Login", query: "intitle:\"Artifactory: Login\"" },
                { name: "Docker Registry UI", query: "intitle:\"Docker Registry UI\"" }
            ]
        },
        {
            category: "User Information",
            items: [
                { name: "User Directories", query: "intitle:\"Index of /~\"" },
                { name: "Exposed .bashrc", query: "ext:bashrc | ext:zshrc" },
                { name: "Exposed .profile", query: "ext:profile" },
                { name: "Exposed wp-config.php", query: "ext:php intext:\"DB_PASSWORD\" inurl:wp-config" },
                { name: "Passwords in JS", query: "ext:js intext:\"password\" | intext:\"apiKey\"" },
                { name: "Developer Comments", query: "intext:\"TODO\" | intext:\"FIXME\" | intext:\"HACK\" ext:html | ext:js | ext:php" },
                { name: "Test/Dev Domains", query: "inurl:test. | inurl:dev. | inurl:uat. site:targetdomain.com" },
                { name: "Hidden robots.txt", query: "inurl:robots.txt Disallow" },
                { name: "Server Version Info", query: "intext:\"Powered by\" | intext:\"Server at\"" },
                { name: "Backend Links", query: "inurl:backup | inurl:old | inurl:temp ext:zip | ext:tar" }
            ]
        }
    ],
    github: [
        {
            category: "API Keys & Tokens",
            items: [
                { name: "Stripe API Key", query: "sk_live_ language:python" },
                { name: "Stripe Publishable Key", query: "pk_live_ language:javascript" },
                { name: "AWS Access Key ID", query: "AKIA[0-9A-Z]{16}" },
                { name: "Google API Key", query: "AIza[0-9A-Za-z\\-_]{35}" },
                { name: "Google OAuth Access Token", query: "ya29\\.[0-9A-Za-z\\-_]+" },
                { name: "Slack API Token", query: "xoxp-[0-9A-Za-z\\-]+" },
                { name: "Slack Bot Token", query: "xoxb-[0-9A-Za-z\\-]+" },
                { name: "Twilio Account SID", query: "AC[a-zA-Z0-9]{32}" },
                { name: "Twilio Auth Token", query: "SK[0-9a-fA-F]{32}" },
                { name: "Mailgun API Key", query: "key-[0-9a-zA-Z]{32}" },
                { name: "MailChimp API Key", query: "[0-9a-f]{32}-us[0-9]{1,2}" },
                { name: "Heroku API Key", query: "[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}" },
                { name: "PayPal Client ID", query: "paypal_client_id language:php" },
                { name: "PayPal Secret", query: "paypal_secret language:php" },
                { name: "Square Access Token", query: "sq0atp-[0-9A-Za-z\\-_]{22}" },
                { name: "Square OAuth Secret", query: "sq0csp-[0-9A-Za-z\\-_]{43}" },
                { name: "Facebook Access Token", query: "EAACEdEose0cBA[0-9A-Za-z]+" },
                { name: "Twitter OAuth Token", query: "[1-9][0-9]+-[0-9a-zA-Z]{40}" },
                { name: "GitHub OAuth Token", query: "ghp_[0-9a-zA-Z]{36}" },
                { name: "Generic API Key (Python)", query: "api_key = \"[a-zA-Z0-9_\\-]{20,}\" language:python" },
                { name: "Generic Secret (JS)", query: "const secret = \"[a-zA-Z0-9_\\-]{20,}\" language:javascript" }
            ]
        },
        {
            category: "Internal Info",
            items: [
                { name: "Internal Domain References", query: "\"internal.\" OR \"intranet.\" OR \"corp.\"" },
                { name: "Staging/Dev Subdomains", query: "\"staging.\" OR \"dev.\" OR \"uat.\" OR \"test.\"" },
                { name: "VPN/Auth Credentials", query: "\"vpn_password\" OR \"auth_password\"" },
                { name: "Leaked Bug Bounty Reports", query: "\"bug bounty\" AND \"report\" OR \"vulnerability\"" },
                { name: "Employee Onboarding Docs", query: "filename:onboarding.md OR filename:setup.md" },
                { name: "Network Diagrams/Topology", query: "filename:network.drawio OR filename:topology.png" },
                { name: "Database Schemas", query: "filename:schema.sql OR filename:structure.sql" }
            ]
        },
        {
            category: "Secrets & Keys",
            items: [
                { name: "AWS Keys", query: "path:.aws/credentials" },
                { name: "Google API Key", query: "filename:google-services.json" },
                { name: "SSH Private Keys", query: "extension:pem private" },
                { name: "Generic API Keys", query: "filename:config.json auth_key" },
                { name: "Heroku API Key", query: "HEROKU_API_KEY language:shell" },
                { name: "Slack Token", query: "xoxp- OR xoxb- language:python" },
                { name: "Stripe API Key", query: "sk_live_ language:python" },
                { name: "Twilio Account SID", query: "AC[a-zA-Z0-9]{32} language:python" },
                { name: "Facebook Access Token", query: "access_token language:python" },
                { name: "Twitter OAuth Token", query: "oauth_token language:python" },
                { name: "AWS Secret Key (Generic)", query: "aws_secret_access_key extension:rb | extension:php | extension:js | extension:py" },
                { name: "OAuth Tokens", query: "oauth_token OR oauth_secret" },
                { name: "FTP Password", query: "ftp password extension:js | extension:php" },
                { name: "Database Connection String", query: "jdbc:postgres:// OR mysql:// password" }
            ]
        },
        {
            category: "Configuration",
            items: [
                { name: "Docker Compose", query: "filename:docker-compose.yml" },
                { name: "Kubernetes Config", query: "filename:config extension:yaml kind:Secret" },
                { name: "Environment Files", query: "filename:.env" },
                { name: "NPM RC", query: "filename:.npmrc _auth" },
                { name: "Dockercfg", query: "filename:.dockercfg" },
                { name: "WP Config", query: "filename:wp-config.php" },
                { name: "Django Settings", query: "filename:settings.py SECRET_KEY" },
                { name: "Rails Database", query: "filename:database.yml password" },
                { name: "GitLab CI/CD Credentials", query: "filename:.gitlab-ci.yml password" },
                { name: "Jenkinsfile Credentials", query: "filename:Jenkinsfile credentialsId" },
                { name: "Terraform State", query: "filename:terraform.tfstate password" }
            ]
        }
    ],
    shodan: [
        {
             category: "Vulnerable Services",
             items: [
                 { name: "Vulnerable Exchange Servers", query: "http.favicon.hash:1768726119" },
                 { name: "Vulnerable Pulse Secure VPN", query: "http.html:\"Pulse Secure\" http.html:\"/dana-na/\"" },
                 { name: "Vulnerable BIG-IP F5", query: "http.title:\"BIG-IP\"" },
                 { name: "Vulnerable Citrix ADC", query: "http.title:\"Citrix Gateway\"" },
                 { name: "Vulnerable Fortigate SSL VPN", query: "http.html:\"/remote/login\" \"FortiGate\"" },
                 { name: "Exposed Docker API", query: "port:2375 product:\"Docker\"" },
                 { name: "Exposed Kubernetes API", query: "port:6443 \"Kubernetes\"" },
                 { name: "Exposed Etcd (Kubernetes)", query: "port:2379 product:\"etcd\"" },
                 { name: "Exposed Consul", query: "port:8500 product:\"Consul\"" },
                 { name: "Exposed MongoDB (No Auth)", query: "port:27017 \"ok\" \"version\"" },
                 { name: "Exposed Redis (No Auth)", query: "port:6379 \"-ERR\"" },
                 { name: "Exposed Memcached (No Auth)", query: "port:11211 \"STAT pid\"" },
                 { name: "Exposed ElasticSearch (No Auth)", query: "port:9200 \"lucene\"" }
             ]
        },
        {
            category: "Databases",
            items: [
                { name: "MongoDB Open", query: "port:27017 -authentication" },
                { name: "ElasticSearch Open", query: "port:9200 json.pretty" },
                { name: "Redis Open", query: "port:6379 -auth" },
                { name: "PostgreSQL Open", query: "port:5432 \"FATAL: no pg_hba.conf entry\"" },
                { name: "MySQL Open", query: "port:3306 \"Access denied for user\"" },
                 { name: "Cassandra Open", query: "port:9042" },
                 { name: "Memcached Open", query: "port:11211" },
                 { name: "CouchDB Open", query: "port:5984" },
                 { name: "Microsoft SQL Server", query: "port:1433 product:\"Microsoft SQL Server\"" }
            ]
        },
        {
            category: "Infrastructure",
            items: [
                { name: "Jenkins", query: "product:\"Jenkins\"" },
                { name: "Apache Tomcat", query: "product:\"Apache Tomcat\"" },
                { name: "Remote Desktop", query: "port:3389" },
                { name: "FTP Anonymous", query: "port:21 \"230 Login successful\"" },
                { name: "Telnet Open", query: "port:23" },
                { name: "SMB Open", query: "port:445 authentication:disabled" },
                { name: "VNC Open", query: "port:5900 authentication:disabled" },
                { name: "Kibana Panel", query: "title:\"Kibana\"" },
                { name: "Grafana Panel", query: "title:\"Grafana\"" },
                { name: "Jira Server", query: "title:\"System Dashboard\" product:\"Jira\"" },
                { name: "LDAP Open", query: "port:389" },
                { name: "Rsync Open", query: "port:873" }
            ]
        },
        {
             category: "ICS & IoT",
             items: [
                 { name: "Webcams", query: "Server: SQ-WEBCAM" },
                 { name: "Siemens S7", query: "port:102" },
                 { name: "Modbus", query: "port:502" },
                 { name: "MQTT Broker", query: "port:1883" },
                 { name: "Printers", query: "port:9100" },
                 { name: "BACnet", query: "port:47808" },
                 { name: "D-Link Cameras", query: "Server: dlink-systems" }
             ]
        }
    ],
    fofa: [
        {
            category: "Critical Assets",
            items: [
                { name: "Exposed Spring Actuator", query: "body=\"/actuator/heapdump\"" },
                { name: "Exposed .git Folder", query: "body=\"Index of /.git\"" },
                { name: "Exposed .env File", query: "body=\"DB_PASSWORD=\"" },
                { name: "Exposed Swagger UI", query: "title=\"Swagger UI\"" },
                { name: "Exposed GraphQL Playground", query: "title=\"GraphQL Playground\"" },
                { name: "Admin Panels (Generic)", query: "title=\"Admin\" OR title=\"Dashboard\"" },
                { name: "Test Environments", query: "domain=\"test.\" OR domain=\"staging.\" OR domain=\"dev.\"" },
                { name: "Debug Mode Pages", query: "body=\"Django\" && body=\"DisallowedHost\"" }
            ]
        },
        {
             category: "Web Frameworks",
             items: [
                 { name: "Spring Boot", query: "icon_hash=\"116323821\"" },
                 { name: "Laravel", query: "app=\"Laravel\"" },
                 { name: "JBoss", query: "title=\"JBoss\"" },
                 { name: "Django", query: "app=\"Django\"" },
                 { name: "Ruby on Rails", query: "app=\"Ruby-On-Rails\"" },
                 { name: "ThinkPHP", query: "app=\"ThinkPHP\"" },
                 { name: "Struts", query: "app=\"Apache-Struts\"" }
             ]
        },
        {
            category: "Services",
            items: [
                { name: "RDP", query: "protocol=\"rdp\"" },
                { name: "SSH", query: "protocol=\"ssh\"" },
                { name: "FTP", query: "protocol=\"ftp\"" },
                { name: "Telnet", query: "protocol=\"telnet\"" },
                { name: "VPN Fortigate", query: "app=\"Fortinet-FortiGate\"" },
                { name: "Citrix Login", query: "title=\"Citrix Gateway\"" }
            ]
        },
        {
            category: "Devices",
            items: [
                { name: "Hikvision Camera", query: "app=\"HIKVISION-Video-Monitoring\"" },
                { name: "MikroTik Router", query: "app=\"MikroTik-RouterOS\"" },
                { name: "Synology NAS", query: "app=\"Synology-NAS\"" },
                { name: "Cisco Devices", query: "app=\"Cisco\"" },
                { name: "Dahua DVR", query: "app=\"Dahua-DVR\"" }
            ]
        }
    ],
    censys: [
        {
            category: "High Risk",
            items: [
                { name: "Exposed RDP (BlueKeep Potential)", query: "services.port: 3389 and services.rdp.banner: \"Windows\"" },
                { name: "Exposed SMB (EternalBlue Potential)", query: "services.port: 445 and services.smb.server_guid: *" },
                { name: "Exposed ADB (Android Debug Bridge)", query: "services.port: 5555" },
                { name: "Exposed Docker Daemon", query: "services.port: 2375" },
                { name: "Vulnerable Weblogic", query: "services.http.response.headers.server: \"WebLogic\"" }
            ]
        },
        {
            category: "Hosts",
            items: [
                { name: "Exposed RDP", query: "services.port: 3389" },
                { name: "Unauthenticated VNC", query: "services.port: 5900" },
                { name: "Open Elasticsearch", query: "services.port: 9200" },
                { name: "Open Postgres", query: "services.port: 5432" },
                { name: "Open Redis", query: "services.port: 6379" },
                 { name: "Anonymous FTP", query: "services.port: 21 and services.banner: \"230\"" },
                { name: "Weblogic Default Page", query: "services.http.response.body: \"Welcome to WebLogic Application Server\"" },
                { name: "Exposed Kubernetes API", query: "services.http.response.body: \"kubernetes\" and services.port: 6443" }
            ]
        },
         {
            category: "Certificates",
            items: [
                { name: "Self-Signed Certs", query: "services.tls.certificates.leaf_data.subject.common_name: \"localhost\"" },
                { name: "Expired Certs", query: "services.tls.certificates.leaf_data.validity.end: < now" },
                { name: "Domain in Cert Subject", query: "services.tls.certificates.leaf_data.subject.common_name: targetdomain.com" },
                { name: "Wildcard Certificates", query: "services.tls.certificates.leaf_data.subject.common_name: \"*.\"" }
            ]
        }
    ],
    hunter: [
         {
            category: "Critical Vulns",
            items: [
                 { name: "Log4j Remote Code Execution", query: "cve=\"CVE-2021-44228\"" },
                 { name: "Spring4Shell", query: "cve=\"CVE-2022-22965\"" },
                 { name: "F5 BIG-IP RCE", query: "cve=\"CVE-2020-5902\"" },
                 { name: "Citrix ADC path traversal", query: "cve=\"CVE-2019-19781\"" },
                 { name: "Pulse Secure VPN RCE", query: "cve=\"CVE-2019-11510\"" },
                 { name: "FortiOS Path Traversal", query: "cve=\"CVE-2018-13379\"" },
                 { name: "Microsoft Exchange RCE", query: "cve=\"CVE-2020-0688\"" }
             ]
        },
        {
            category: "Product Search",
            items: [
                { name: "ElasticSearch", query: "product=\"Elasticsearch\"" },
                { name: "Kibana", query: "product=\"Kibana\"" },
                { name: "Jenkins", query: "product=\"Jenkins\"" },
                { name: "GitLab", query: "product=\"GitLab\"" },
                { name: "Grafana", query: "product=\"Grafana\"" },
                { name: "Zabbix", query: "product=\"Zabbix\"" },
                { name: "Jira", query: "product=\"Jira\"" }
            ]
        },
        {
            category: "Vulnerabilities",
            items: [
                 { name: "Log4j", query: "cve=\"CVE-2021-44228\"" },
                 { name: "Exchange Proxyshell", query: "cve=\"CVE-2021-34473\"" },
                 { name: "OpenSSL Heartbleed", query: "cve=\"CVE-2014-0160\"" },
                 { name: "Apache Struts RCE", query: "cve=\"CVE-2017-5638\"" }
             ]
        },
        {
            category: "Technology Search",
            items: [
                 { name: "Cloudflare Protected", query: "web.server=\"cloudflare\"" },
                 { name: "Google Analytics", query: "web.title=\"Google Analytics\"" },
                 { name: "JQuery Version", query: "js.name=\"jquery\"" }
             ]
        }
    ]
}