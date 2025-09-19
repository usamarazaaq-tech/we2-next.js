"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  Plus,
  FolderPlus,
  Calendar,
  Check,
  MoreHorizontal,
  ChevronRight,
  Info,
  Zap,
  Lock,
  Eye,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function FileTransferCard() {
  const [activeTab, setActiveTab] = useState("request");
  const [isOptionsOpen, setIsOptionsOpen] = useState(true);
  const [sendMethod, setSendMethod] = useState("create-link");
  const [sendMode, setSendMode] = useState("default"); // controls main card content
  const [isRecoverable, setIsRecoverable] = useState(true);
  const [expiryDays, setExpiryDays] = useState("3");
  const fileInputRef = useRef(null);
  const folderInputRef = useRef(null);

  const handleAddFiles = () => fileInputRef.current?.click();
  const handleAddFolders = () => folderInputRef.current?.click();

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files) console.log("Selected files:", Array.from(files));
  };

  const handleFolderChange = (event) => {
    const files = event.target.files;
    if (files) console.log("Selected folder files:", Array.from(files));
  };

  // NEW: sync radio selection to main-card mode & ensure Request tab visible
  const handleSendMethodChange = (value) => {
    setSendMethod(value);
    if (value === "send-email") {
      setSendMode("email");
    } else if (value === "create-link") {
      setSendMode("default");
    }
    // show the Request card so the changed content is visible
    setActiveTab("request");
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <TooltipProvider>
        {/* Tabs */}
        <div className="mb-4">
          <div className="bg-white rounded-t-2xl shadow-lg border-b border-gray-200 p-1 flex">
            <Button
              variant={activeTab === "request" ? "default" : "ghost"}
              className={cn(
                "flex-1 rounded-xl font-medium transition-all",
                activeTab === "request"
                  ? "bg-gray-100 text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              )}
              onClick={() => setActiveTab("request")}
            >
              Request files
            </Button>
            <Button
              variant={activeTab === "send" ? "default" : "ghost"}
              className={cn(
                "flex-1 rounded-xl font-medium transition-all",
                activeTab === "send"
                  ? "bg-gray-100 text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              )}
              onClick={() => setActiveTab("send")}
            >
              Send files
            </Button>
          </div>
        </div>

        {/* Main card (always above options panel) */}
        <div className="relative z-20">
          <div
            className="transition-transform duration-500 ease-in-out"
            style={{
              transform:
                activeTab === "send" ? "rotateY(180deg)" : "rotateY(0deg)",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Request card */}
            <Card
              className={cn(
                "bg-white shadow-xl rounded-2xl overflow-hidden",
                activeTab === "send" && "invisible"
              )}
              style={{ backfaceVisibility: "hidden" }}
            >
              <div className="px-6 pt-6 pb-2">
                <h2 className="text-lg font-semibold text-gray-900 text-center">
                  Request files
                </h2>
              </div>

              <div className="p-6 space-y-6">
                {/* File/folder buttons */}
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

                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
                <input
                  ref={folderInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleFolderChange}
                  webkitdirectory=""
                />

                {/* Info row */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>Get unlimited transfers</span>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-purple-600 font-medium"
                  >
                    <Zap className="w-4 h-4 mr-1" />
                    Increase limit
                  </Button>
                </div>

                {/* <-- HERE: Request card changes based on sendMode --> */}
                {sendMode === "email" ? (
                  <>
                    {/* email form fields */}
                    <div className="space-y-2">
                      <Label>Email to</Label>
                      <Input placeholder="recipient@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label>Your email</Label>
                      <Input placeholder="you@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input placeholder="Request title" />
                    </div>
                  </>
                ) : (
                  <>
                    {/* original initial data here (default / create link mode) */}
                    <div className="p-4 text-gray-700">
                      {/* Email field */}
                      <div className="space-y-2">
                        <Label htmlFor="email">Your email</Label>
                        <div className="relative">
                          <Input
                            id="email"
                            type="email"
                            className="pr-10 rounded-lg border-gray-200"
                          />
                        </div>
                      </div>

                      {/* Title/message */}
                      <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          placeholder=""
                          className="rounded-lg border-gray-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          className="rounded-lg border-gray-200 min-h-[80px] resize-none"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Footer row */}
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

            {/* Send card */}
            <Card
              className={cn(
                "bg-white shadow-xl rounded-2xl overflow-hidden absolute inset-0",
                activeTab === "request" && "invisible"
              )}
              style={{
                transform: "rotateY(180deg)",
                backfaceVisibility: "hidden",
              }}
            >
              <div className="px-6 pt-6 pb-2">
                <h2 className="text-lg font-semibold text-gray-900 text-center">
                  Send files
                </h2>
              </div>

              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Request files
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>Up to 3 GB</span>
                        <Button
                          variant="link"
                          className="p-0 h-auto text-purple-600 font-medium"
                        >
                          <Zap className="w-4 h-4 mr-1" />
                          Increase
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-md">
                    New
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="send-title">Title</Label>
                  <Input id="send-title" className="rounded-lg border-gray-200" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notify-email">Notify via email (optional)</Label>
                  <Input id="notify-email" className="rounded-lg border-gray-200" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instructions">Instructions</Label>
                  <Textarea id="instructions" className="rounded-lg border-gray-200 min-h-[120px] resize-none" />
                </div>

                <Button className="w-full h-12 bg-blue-400 hover:bg-blue-500 text-white font-medium rounded-xl">
                  Create request link
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Options panel (behind, slides in) */}
        <div
          className={cn(
            "absolute top-16 left-0 w-full h-[91%] bg-white shadow-xl rounded-r-2xl transition-transform duration-300 ease-in-out z-10",
            isOptionsOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="p-6 space-y-6 h-full overflow-y-auto">
            {/* Send method */}
            <div className="space-y-4">
              <RadioGroup value={sendMethod} onValueChange={handleSendMethodChange}>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="send-email" id="send-email" />
                  <Label htmlFor="send-email">Send email</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="create-link" id="create-link" />
                  <Label htmlFor="create-link">Create link</Label>
                </div>
              </RadioGroup>
            </div>

            <Separator />

            {/* Access control */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Label>Access control</Label>
                <Info className="w-4 h-4 text-gray-400" />
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="text-sm text-gray-600 cursor-help">
                    Anonymous
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="max-w-xs bg-white border border-gray-200 shadow-lg text-gray-900"
                >
                  <div className="space-y-3 p-2">
                    <div className="flex items-start gap-2">
                      <Lock className="w-4 h-4 text-gray-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-sm">Restricted</div>
                        <div className="text-xs text-blue-600 mb-1">
                          For email transfers only
                        </div>
                        <div className="text-xs text-gray-600">
                          Only specified recipients can access this transfer.
                          Get detailed notifications for every download.
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Eye className="w-4 h-4 text-gray-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-sm">Tracked</div>
                        <div className="text-xs text-gray-600">
                          Anyone with the link can access after authentication.
                          Notifications for every download.
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-4 h-4 mt-0.5" />
                      <div>
                        <div className="font-medium text-sm">
                          Anonymous{" "}
                          <span className="text-blue-600 text-xs">Free</span>
                        </div>
                        <div className="text-xs text-gray-600">
                          Anyone with the link can access. Only first download
                          triggers a notification.
                        </div>
                      </div>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Appearance */}
            <div className="space-y-3">
              <Label>Appearance</Label>
              <Button
                variant="ghost"
                className="w-full justify-between p-0 h-auto text-left font-normal"
              >
                <span className="text-sm text-gray-600">
                  Customize background
                </span>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-purple-600" />
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </Button>
            </div>

            {/* Price */}
            <div className="space-y-3">
              <Label>Price</Label>
              <Button
                variant="ghost"
                className="w-full justify-between p-0 h-auto text-left font-normal"
              >
                <span className="text-sm text-gray-600">Request payment</span>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-purple-600" />
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </Button>
            </div>

            {/* Password */}
            <div className="space-y-3">
              <Label>Password</Label>
              <Button variant="ghost" className="w-full justify-start p-0 h-auto text-left font-normal">
                <span className="text-sm text-gray-600">Set password</span>
              </Button>
            </div>

            {/* Recoverable */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Label>Recoverable</Label>
                <Info className="w-4 h-4 text-gray-400" />
              </div>
              <Switch
                checked={isRecoverable}
                onCheckedChange={setIsRecoverable}
              />
            </div>
          </div>
        </div>
      </TooltipProvider>
    </div>
  );
}
