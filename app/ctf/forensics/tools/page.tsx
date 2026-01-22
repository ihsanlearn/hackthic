"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Copy, Terminal, Activity, FileSearch, Eye, Database, Globe, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ForensicsToolsPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Forensics Tools</h1>
        <p className="text-muted-foreground">Comprehensive guide and cheat sheets for common digital forensics tools.</p>
      </div>

      <Tabs defaultValue="binwalk" className="flex flex-col gap-6 h-full">
        <div className="w-full shrink-0">
             <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 h-auto bg-transparent gap-2 p-0">
                <TabsTrigger value="binwalk" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary border border-transparent data-[state=active]:border-primary/20 h-24 flex flex-col gap-2 items-center justify-center">
                    <Terminal className="h-6 w-6" />
                    Binwalk
                </TabsTrigger>
                <TabsTrigger value="volatility" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary border border-transparent data-[state=active]:border-primary/20 h-24 flex flex-col gap-2 items-center justify-center">
                    <Activity className="h-6 w-6" />
                    Volatility 3
                </TabsTrigger>
                <TabsTrigger value="wireshark" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary border border-transparent data-[state=active]:border-primary/20 h-24 flex flex-col gap-2 items-center justify-center">
                    <Globe className="h-6 w-6" />
                    Wireshark
                </TabsTrigger>
                <TabsTrigger value="exiftool" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary border border-transparent data-[state=active]:border-primary/20 h-24 flex flex-col gap-2 items-center justify-center">
                    <ImageIcon className="h-6 w-6" />
                    Exiftool
                </TabsTrigger>
                <TabsTrigger value="strings" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary border border-transparent data-[state=active]:border-primary/20 h-24 flex flex-col gap-2 items-center justify-center">
                    <FileSearch className="h-6 w-6" />
                    Strings
                </TabsTrigger>
                <TabsTrigger value="steghide" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary border border-transparent data-[state=active]:border-primary/20 h-24 flex flex-col gap-2 items-center justify-center">
                    <Eye className="h-6 w-6" />
                    Steghide
                </TabsTrigger>
                <TabsTrigger value="zsteg" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary border border-transparent data-[state=active]:border-primary/20 h-24 flex flex-col gap-2 items-center justify-center">
                    <ImageIcon className="h-6 w-6" />
                    zsteg
                </TabsTrigger>
                <TabsTrigger value="foremost" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary border border-transparent data-[state=active]:border-primary/20 h-24 flex flex-col gap-2 items-center justify-center">
                    <Database className="h-6 w-6" />
                    Foremost
                </TabsTrigger>
                <TabsTrigger value="pngcheck" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary border border-transparent data-[state=active]:border-primary/20 h-24 flex flex-col gap-2 items-center justify-center">
                    <ImageIcon className="h-6 w-6" />
                    pngcheck
                </TabsTrigger>
                <TabsTrigger value="bulk_extractor" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary border border-transparent data-[state=active]:border-primary/20 h-24 flex flex-col gap-2 items-center justify-center">
                    <Database className="h-6 w-6" />
                    bulk_extractor
                </TabsTrigger>
                <TabsTrigger value="hexdump" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary border border-transparent data-[state=active]:border-primary/20 h-24 flex flex-col gap-2 items-center justify-center">
                    <Terminal className="h-6 w-6" />
                    Hexdump / xxd
                </TabsTrigger>
            </TabsList>
        </div>

        <ScrollArea className="flex-1 rounded-md border bg-card/50">
          <div className="p-6">
            
            {/* Binwalk Content */}
            <TabsContent value="binwalk" className="mt-0 space-y-6">
                <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold">Binwalk</h2>
                                <p className="text-muted-foreground mt-1">A tool for searching a given binary image for embedded files and executable code.</p>
                            </div>
                            <Badge variant="outline" className="text-base px-4 py-1">Firmware Analysis</Badge>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Installation</h3>
                            <div className="bg-muted p-3 rounded-md font-mono text-sm border">
                                sudo apt install binwalk
                            </div>
                        </div>
                        
                        <Separator />
                        
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Cheat Sheet</h3>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium">Scan for file signatures</p>
                                    <div className="bg-black/50 p-3 rounded-md font-mono text-sm border flex justify-between items-center group">
                                        <span>binwalk file.bin</span>
                                        <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100"><Copy className="h-3 w-3" /></Button>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium">Extract files automatically</p>
                                    <div className="bg-black/50 p-3 rounded-md font-mono text-sm border flex justify-between items-center group">
                                        <span>binwalk -e file.bin</span>
                                        <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100"><Copy className="h-3 w-3" /></Button>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium">Recursive extraction</p>
                                    <div className="bg-black/50 p-3 rounded-md font-mono text-sm border flex justify-between items-center group">
                                        <span>binwalk -Me file.bin</span>
                                        <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100"><Copy className="h-3 w-3" /></Button>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium">Entropy graph</p>
                                    <div className="bg-black/50 p-3 rounded-md font-mono text-sm border flex justify-between items-center group">
                                        <span>binwalk -E file.bin</span>
                                        <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100"><Copy className="h-3 w-3" /></Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </TabsContent>

             {/* Volatility Content */}
             <TabsContent value="volatility" className="mt-0 space-y-6">
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                         <div>
                            <h2 className="text-2xl font-bold">Volatility 3</h2>
                            <p className="text-muted-foreground mt-1">Advanced memory forensics framework.</p>
                        </div>
                        <Badge variant="outline" className="text-base px-4 py-1">Memory Forensics</Badge>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Installation</h3>
                         <div className="bg-muted p-3 rounded-md font-mono text-sm border">
                            pip3 install volatility3
                        </div>
                    </div>
                    <Separator />
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Cheat Sheet</h3>
                         <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-1">
                                <p className="text-sm font-medium">Get OS Info (Windows)</p>
                                <div className="bg-black/50 p-3 rounded-md font-mono text-sm border flex justify-between items-center group">
                                    <span className="truncate w-[200px]">vol -f dump.mem windows.info</span>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100"><Copy className="h-3 w-3" /></Button>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium">List Processes (pslist)</p>
                                <div className="bg-black/50 p-3 rounded-md font-mono text-sm border flex justify-between items-center group">
                                    <span className="truncate w-[200px]">vol -f dump.mem windows.pslist</span>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100"><Copy className="h-3 w-3" /></Button>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium">Network Connections</p>
                                <div className="bg-black/50 p-3 rounded-md font-mono text-sm border flex justify-between items-center group">
                                    <span className="truncate w-[200px]">vol -f dump.mem windows.netscan</span>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100"><Copy className="h-3 w-3" /></Button>
                                </div>
                            </div>
                             <div className="space-y-1">
                                <p className="text-sm font-medium">CmdLine Arguments</p>
                                <div className="bg-black/50 p-3 rounded-md font-mono text-sm border flex justify-between items-center group">
                                    <span className="truncate w-[200px]">vol -f dump.mem windows.cmdline</span>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100"><Copy className="h-3 w-3" /></Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </TabsContent>

             {/* Wireshark Content */}
             <TabsContent value="wireshark" className="mt-0 space-y-6">
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                         <div>
                            <h2 className="text-2xl font-bold">Wireshark</h2>
                            <p className="text-muted-foreground mt-1">Network protocol analyzer.</p>
                        </div>
                        <Badge variant="outline" className="text-base px-4 py-1">Network Forensics</Badge>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Display Filters Cheat Sheet</h3>
                        <div className="grid gap-4 md:grid-cols-2">
                             <div className="space-y-1">
                                <p className="text-sm font-medium">Filter by Protocol</p>
                                <div className="bg-black/50 p-3 rounded-md font-mono text-sm border flex justify-between items-center group">
                                    <span>http || dns || ftp</span>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100"><Copy className="h-3 w-3" /></Button>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium">Filter by IP</p>
                                <div className="bg-black/50 p-3 rounded-md font-mono text-sm border flex justify-between items-center group">
                                    <span>ip.addr == 192.168.1.5</span>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100"><Copy className="h-3 w-3" /></Button>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium">POST Requests</p>
                                <div className="bg-black/50 p-3 rounded-md font-mono text-sm border flex justify-between items-center group">
                                    <span>http.request.method == "POST"</span>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100"><Copy className="h-3 w-3" /></Button>
                                </div>
                            </div>
                             <div className="space-y-1">
                                <p className="text-sm font-medium">Content Search</p>
                                <div className="bg-black/50 p-3 rounded-md font-mono text-sm border flex justify-between items-center group">
                                    <span>frame contains "flag"</span>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100"><Copy className="h-3 w-3" /></Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </TabsContent>


            {/* Exiftool Content */}
             <TabsContent value="exiftool" className="mt-0 space-y-6">
                <div className="space-y-6">
                     <div className="flex items-center justify-between">
                         <div>
                            <h2 className="text-2xl font-bold">ExifTool</h2>
                            <p className="text-muted-foreground mt-1">Metadata manipulation tool.</p>
                        </div>
                        <Badge variant="outline" className="text-base px-4 py-1">Metadata</Badge>
                    </div>
                     <div>
                        <h3 className="text-lg font-semibold mb-2">Installation</h3>
                        <div className="bg-muted p-3 rounded-md font-mono text-sm border">
                            sudo apt install libimage-exiftool-perl
                        </div>
                    </div>
                    <Separator />
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Cheat Sheet</h3>
                        <div className="grid gap-4 md:grid-cols-2">
                             <div className="space-y-1">
                                <p className="text-sm font-medium">View all metadata</p>
                                <div className="bg-black/50 p-3 rounded-md font-mono text-sm border flex justify-between items-center group">
                                    <span>exiftool image.jpg</span>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100"><Copy className="h-3 w-3" /></Button>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium">Remove all metadata</p>
                                <div className="bg-black/50 p-3 rounded-md font-mono text-sm border flex justify-between items-center group">
                                    <span>exiftool -all= image.jpg</span>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100"><Copy className="h-3 w-3" /></Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </TabsContent>

            {/* Strings Content */}
             <TabsContent value="strings" className="mt-0 space-y-6">
                <div className="space-y-6">
                     <div className="flex items-center justify-between">
                         <div>
                            <h2 className="text-2xl font-bold">Strings</h2>
                            <p className="text-muted-foreground mt-1">Find printable strings in files.</p>
                        </div>
                        <Badge variant="outline" className="text-base px-4 py-1">Basic Analysis</Badge>
                    </div>
                    <div>
                         <h3 className="text-lg font-semibold mb-4">Cheat Sheet</h3>
                         <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-1">
                                <p className="text-sm font-medium">Basic usage</p>
                                <div className="bg-black/50 p-3 rounded-md font-mono text-sm border flex justify-between items-center group">
                                    <span>strings file.bin</span>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100"><Copy className="h-3 w-3" /></Button>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium">Minimum length 10</p>
                                <div className="bg-black/50 p-3 rounded-md font-mono text-sm border flex justify-between items-center group">
                                    <span>strings -n 10 file.bin</span>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100"><Copy className="h-3 w-3" /></Button>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium">Grep for flags</p>
                                <div className="bg-black/50 p-3 rounded-md font-mono text-sm border flex justify-between items-center group">
                                    <span>strings file.bin | grep "CTF"</span>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100"><Copy className="h-3 w-3" /></Button>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium">Show offsets</p>
                                <div className="bg-black/50 p-3 rounded-md font-mono text-sm border flex justify-between items-center group">
                                    <span>strings -t x file.bin</span>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100"><Copy className="h-3 w-3" /></Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </TabsContent>
            
            {/* Steghide Content */}
            <TabsContent value="steghide" className="mt-0 space-y-6">
                 <div className="space-y-6">
                     <div className="flex items-center justify-between">
                         <div>
                            <h2 className="text-2xl font-bold">Steghide</h2>
                            <p className="text-muted-foreground mt-1">Hide data in image and audio files.</p>
                        </div>
                        <Badge variant="outline" className="text-base px-4 py-1">Steganography</Badge>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Installation</h3>
                        <div className="bg-muted p-3 rounded-md font-mono text-sm border">
                            sudo apt install steghide
                        </div>
                    </div>
                    <Separator />
                    <div>
                         <h3 className="text-lg font-semibold mb-4">Cheat Sheet</h3>
                         <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-1">
                                <p className="text-sm font-medium">Extract data</p>
                                <div className="bg-black/50 p-3 rounded-md font-mono text-sm border flex justify-between items-center group">
                                    <span>steghide extract -sf img.jpg</span>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100"><Copy className="h-3 w-3" /></Button>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium">Embed data</p>
                                <div className="bg-black/50 p-3 rounded-md font-mono text-sm border flex justify-between items-center group">
                                    <span className="truncate w-[200px]">steghide embed -cf img.jpg -ef note.txt</span>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100"><Copy className="h-3 w-3" /></Button>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium">View info</p>
                                <div className="bg-black/50 p-3 rounded-md font-mono text-sm border flex justify-between items-center group">
                                    <span>steghide info image.jpg</span>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100"><Copy className="h-3 w-3" /></Button>
                                </div>
                            </div>
                         </div>
                    </div>
                </div>
            </TabsContent>

             {/* Zsteg Content */}
             <TabsContent value="zsteg" className="mt-0 space-y-6">
                 <div className="space-y-6">
                     <div className="flex items-center justify-between">
                         <div>
                            <h2 className="text-2xl font-bold">zsteg</h2>
                            <p className="text-muted-foreground mt-1">Detect hidden data in PNG and BMP.</p>
                        </div>
                        <Badge variant="outline" className="text-base px-4 py-1">Steganography</Badge>
                    </div>
                     <div>
                        <h3 className="text-lg font-semibold mb-2">Installation</h3>
                        <div className="bg-muted p-3 rounded-md font-mono text-sm border">
                            gem install zsteg
                        </div>
                    </div>
                    <Separator />
                    <div>
                         <h3 className="text-lg font-semibold mb-4">Cheat Sheet</h3>
                         <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-1">
                                <p className="text-sm font-medium">Auto-detect all</p>
                                <div className="bg-black/50 p-3 rounded-md font-mono text-sm border flex justify-between items-center group">
                                    <span>zsteg -a image.png</span>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100"><Copy className="h-3 w-3" /></Button>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium">Extract specific channel</p>
                                <div className="bg-black/50 p-3 rounded-md font-mono text-sm border flex justify-between items-center group">
                                    <span className="truncate w-[200px]">zsteg -E "b1,r,lsb,xy" img.png &gt; out.dat</span>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100"><Copy className="h-3 w-3" /></Button>
                                </div>
                            </div>
                         </div>
                    </div>
                </div>
            </TabsContent>

            {/* Foremost Content */}
             <TabsContent value="foremost" className="mt-0 space-y-6">
                 <div className="space-y-6">
                     <div className="flex items-center justify-between">
                         <div>
                            <h2 className="text-2xl font-bold">Foremost</h2>
                            <p className="text-muted-foreground mt-1">Recover files based on headers/footers.</p>
                        </div>
                        <Badge variant="outline" className="text-base px-4 py-1">File Carving</Badge>
                    </div>
                     <div>
                        <h3 className="text-lg font-semibold mb-2">Installation</h3>
                        <div className="bg-muted p-3 rounded-md font-mono text-sm border">
                            sudo apt install foremost
                        </div>
                    </div>
                    <Separator />
                    <div>
                         <h3 className="text-lg font-semibold mb-4">Cheat Sheet</h3>
                         <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-1">
                                <p className="text-sm font-medium">Extract all known</p>
                                <div className="bg-black/50 p-3 rounded-md font-mono text-sm border flex justify-between items-center group">
                                    <span>foremost -t all -i image.dd</span>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100"><Copy className="h-3 w-3" /></Button>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium">Extract specific (png,jpg)</p>
                                <div className="bg-black/50 p-3 rounded-md font-mono text-sm border flex justify-between items-center group">
                                    <span>foremost -t png,jpg -i image.dd</span>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100"><Copy className="h-3 w-3" /></Button>
                                </div>
                            </div>
                         </div>
                    </div>
                </div>
            </TabsContent>

            {/* PNGCheck Content */}
            <TabsContent value="pngcheck" className="mt-0 space-y-6">
                 <div className="space-y-6">
                     <div className="flex items-center justify-between">
                         <div>
                            <h2 className="text-2xl font-bold">pngcheck</h2>
                            <p className="text-muted-foreground mt-1">Test PNG/IDAT integrity.</p>
                        </div>
                        <Badge variant="outline" className="text-base px-4 py-1">Image Analysis</Badge>
                    </div>
                     <div>
                        <h3 className="text-lg font-semibold mb-2">Installation</h3>
                        <div className="bg-muted p-3 rounded-md font-mono text-sm border">
                            sudo apt install pngcheck
                        </div>
                    </div>
                    <Separator />
                    <div>
                         <h3 className="text-lg font-semibold mb-4">Cheat Sheet</h3>
                         <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-1">
                                <p className="text-sm font-medium">Check integrity</p>
                                <div className="bg-black/50 p-3 rounded-md font-mono text-sm border flex justify-between items-center group">
                                    <span>pngcheck image.png</span>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100"><Copy className="h-3 w-3" /></Button>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium">Verbose info</p>
                                <div className="bg-black/50 p-3 rounded-md font-mono text-sm border flex justify-between items-center group">
                                    <span>pngcheck -v image.png</span>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100"><Copy className="h-3 w-3" /></Button>
                                </div>
                            </div>
                         </div>
                    </div>
                </div>
            </TabsContent>

             {/* Bulk Extractor Content */}
             <TabsContent value="bulk_extractor" className="mt-0 space-y-6">
                 <div className="space-y-6">
                     <div className="flex items-center justify-between">
                         <div>
                            <h2 className="text-2xl font-bold">Bulk Extractor</h2>
                            <p className="text-muted-foreground mt-1">Rapid artifact extraction.</p>
                        </div>
                        <Badge variant="outline" className="text-base px-4 py-1">Data Extraction</Badge>
                    </div>
                     <div>
                        <h3 className="text-lg font-semibold mb-2">Installation</h3>
                        <div className="bg-muted p-3 rounded-md font-mono text-sm border">
                            sudo apt install bulk-extractor
                        </div>
                    </div>
                    <Separator />
                    <div>
                         <h3 className="text-lg font-semibold mb-4">Cheat Sheet</h3>
                         <div className="grid gap-4 md:grid-cols-2">
                             <div className="space-y-1">
                                <p className="text-sm font-medium">Basic extraction</p>
                                <div className="bg-black/50 p-3 rounded-md font-mono text-sm border flex justify-between items-center group">
                                    <span>bulk_extractor -o out/ img.dd</span>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100"><Copy className="h-3 w-3" /></Button>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium">PCAP artifacts</p>
                                <div className="bg-black/50 p-3 rounded-md font-mono text-sm border flex justify-between items-center group">
                                    <span>bulk_extractor -o out/ net.pcap</span>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100"><Copy className="h-3 w-3" /></Button>
                                </div>
                            </div>
                         </div>
                    </div>
                </div>
            </TabsContent>

             {/* Hexdump Content */}
             <TabsContent value="hexdump" className="mt-0 space-y-6">
                <div className="space-y-6">
                     <div className="flex items-center justify-between">
                         <div>
                            <h2 className="text-2xl font-bold">Hexdump / xxd</h2>
                            <p className="text-muted-foreground mt-1">View files in hexadecimal.</p>
                        </div>
                        <Badge variant="outline" className="text-base px-4 py-1">Basic Analysis</Badge>
                    </div>
                    <div>
                         <h3 className="text-lg font-semibold mb-4">Cheat Sheet</h3>
                         <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-1">
                                <p className="text-sm font-medium">Canonical view</p>
                                <div className="bg-black/50 p-3 rounded-md font-mono text-sm border flex justify-between items-center group">
                                    <span>hexdump -C file.bin</span>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100"><Copy className="h-3 w-3" /></Button>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium">Reverse hex to binary</p>
                                <div className="bg-black/50 p-3 rounded-md font-mono text-sm border flex justify-between items-center group">
                                    <span>xxd -r hex.txt &gt; bin.bin</span>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100"><Copy className="h-3 w-3" /></Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </TabsContent>
          </div>
        </ScrollArea>
      </Tabs>
    </div>
  )
}
