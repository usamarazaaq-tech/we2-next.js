"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { Plus, FolderPlus, Calendar, Check, MoreHorizontal, ChevronRight, Info, Zap, Lock, Eye } from "lucide-react"
import { cn } from "@/lib/utils"

export function FileTransferCard() {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)
  const [sendMethod, setSendMethod] = useState("create-link")
  const [accessControl, setAccessControl] = useState("anonymous")
  const [isRecoverable, setIsRecoverable] = useState(true)
  const [expiryDays, setExpiryDays] = useState("3")
  const fileInputRef = useRef(null)
  const folderInputRef = useRef(null)

  const handleAddFiles = () => {
    fileInputRef.current?.click()
  }

  const handleAddFolders = () => {
    folderInputRef.current?.click()
  }

  const handleFileChange = (event) => {
    const files = event.target.files
    if (files) {
      console.log("Selected files:", Array.from(files))
    }
  }

  const handleFolderChange = (event) => {
    const files = event.target.files
    if (files) {
      console.log("Selected folder files:", Array.from(files))
    }
  }

  return (
    <div className="relative w-full max-w-md mx-auto">
      <TooltipProvider>
        <Card className="bg-white shadow-xl rounded-2xl overflow-hidden relative">
          <div className="px-6 pt-6 pb-2">
            <h2 className="text-lg font-semibold text-gray-900 text-center">Request files</h2>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="h-20 bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700 font-medium rounded-xl flex flex-col items-center justify-center gap-2"
                onClick={handleAddFiles}
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <Plus className="w-4 h-4 text-white" />
                </div>
                Add files
              </Button>
              <Button
                variant="outline"
                className="h-20 bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700 font-medium rounded-xl flex flex-col items-center justify-center gap-2"
                onClick={handleAddFolders}
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <FolderPlus className="w-4 h-4 text-white" />
                </div>
                Add folders
              </Button>
            </div>

            <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileChange} />
            <input
              ref={folderInputRef}
              type="file"
              webkitdirectory=""
              className="hidden"
              onChange={handleFolderChange}
            />

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Get unlimited transfers</span>
              <Button variant="link" className="p-0 h-auto text-purple-600 font-medium">
                <Zap className="w-4 h-4 mr-1" />
                Increase limit
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Your email
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value="usamarazaag@decotechs.xyz"
                  className="pr-10 rounded-lg border-gray-200"
                  readOnly
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                Title
              </Label>
              <Input id="title" placeholder="" className="rounded-lg border-gray-200" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                Message
              </Label>
              <Textarea id="message" placeholder="" className="rounded-lg border-gray-200 min-h-[80px] resize-none" />
            </div>

            <div className="flex items-center justify-between gap-4">
              <Select value={expiryDays} onValueChange={setExpiryDays}>
                <SelectTrigger className="w-32 rounded-lg border-gray-200">
                  <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 day</SelectItem>
                  <SelectItem value="3">3 days</SelectItem>
                  <SelectItem value="7">7 days</SelectItem>
                  <SelectItem value="30">30 days</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-12 h-12 bg-blue-50 hover:bg-blue-100 border-blue-200"
                onClick={() => setIsOptionsOpen(!isOptionsOpen)}
              >
                <MoreHorizontal className="w-5 h-5 text-blue-600" />
              </Button>
            </div>

            <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl">
              Get a link
            </Button>
          </div>
        </Card>

        <div
          className={cn(
            "absolute top-0 left-0 w-full h-full bg-white shadow-xl rounded-2xl transition-all duration-300 ease-in-out z-10",
            isOptionsOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="p-6 space-y-6 h-full overflow-y-auto">
            <div className="space-y-4">
              <RadioGroup value={sendMethod} onValueChange={setSendMethod}>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="send-email" id="send-email" />
                  <Label htmlFor="send-email" className="text-sm font-medium">
                    Send email
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="create-link" id="create-link" />
                  <Label htmlFor="create-link" className="text-sm font-medium">
                    Create link
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium text-gray-700">Access control</Label>
                <Info className="w-4 h-4 text-gray-400" />
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="text-sm text-gray-600 cursor-help">Anonymous</div>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="max-w-xs bg-white border border-gray-200 shadow-lg text-gray-900"
                >
                  <div className="space-y-3 p-2">
                    <div className="flex items-start gap-2">
                      <Lock className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-sm">Restricted</div>
                        <div className="text-xs text-blue-600 mb-1">For email transfers only</div>
                        <div className="text-xs text-gray-600">
                          Only specified recipients can access this transfer. Get detailed notifications for every
                          download. If enabled in your settings.
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Eye className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-sm">Tracked</div>
                        <div className="text-xs text-gray-600">
                          Anyone with the link can access after authentication. Get detailed notifications for every
                          download.
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-sm">
                          Anonymous <span className="text-blue-600 text-xs">Free</span>
                        </div>
                        <div className="text-xs text-gray-600">
                          Anyone with the link can access. Get notified the first time your files are downloaded. If
                          enabled in your settings.
                        </div>
                      </div>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700">Appearance</Label>
              <Button variant="ghost" className="w-full justify-between p-0 h-auto text-left font-normal">
                <span className="text-sm text-gray-600">Customize background</span>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-purple-600" />
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </Button>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700">Price</Label>
              <Button variant="ghost" className="w-full justify-between p-0 h-auto text-left font-normal">
                <span className="text-sm text-gray-600">Request payment</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Button>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700">Password</Label>
              <Button variant="ghost" className="w-full justify-start p-0 h-auto text-left font-normal">
                <span className="text-sm text-gray-600">Set password</span>
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium text-gray-700">Recoverable</Label>
                <Info className="w-4 h-4 text-gray-400" />
              </div>
              <Switch checked={isRecoverable} onCheckedChange={setIsRecoverable} />
            </div>
          </div>
        </div>
      </TooltipProvider>
    </div>
  )
}
