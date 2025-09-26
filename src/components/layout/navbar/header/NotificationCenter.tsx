"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, X, AlertCircle, Info, MessageSquare } from "lucide-react";
import Link from "next/link";

interface Notification {
  id: string;
  type: "critical" | "message" | "update";
  message: string;
  time: string;
  read: boolean;
  actionUrl: string;
  category: string;
}

interface NotificationCenterProps {
  onClose: () => void;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "critical",
    message: "Document submission deadline approaching",
    time: "2 hours ago",
    read: false,
    actionUrl: "/dashboard/documents",
    category: "compliance",
  },
  {
    id: "2",
    type: "message",
    message: "New funding opportunity available",
    time: "1 day ago",
    read: false,
    actionUrl: "/marketplace/financial-services",
    category: "opportunity",
  },
  {
    id: "3",
    type: "update",
    message: "Profile verification completed",
    time: "3 days ago",
    read: true,
    actionUrl: "/dashboard/profile",
    category: "profile",
  },
  {
    id: "4",
    type: "message",
    message: "Monthly report submission reminder",
    time: "1 week ago",
    read: true,
    actionUrl: "/dashboard/reports",
    category: "compliance",
  },
];

export function NotificationCenter({ onClose }: NotificationCenterProps) {
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const [activeTab, setActiveTab] = useState("all");

  const unreadCount = notifications.filter((notif) => !notif.read).length;
  const criticalCount = notifications.filter(
    (notif) => notif.type === "critical" && !notif.read
  ).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "message":
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case "update":
        return <Info className="h-4 w-4 text-green-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const getFilteredNotifications = () => {
    switch (activeTab) {
      case "unread":
        return notifications.filter((notif) => !notif.read);
      case "critical":
        return notifications.filter((notif) => notif.type === "critical");
      case "messages":
        return notifications.filter((notif) => notif.type === "message");
      case "updates":
        return notifications.filter((notif) => notif.type === "update");
      default:
        return notifications;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[80vh] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <CardTitle>Notifications</CardTitle>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {unreadCount} unread
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={markAllAsRead}
                className="text-xs"
              >
                Mark all read
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-hidden">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="h-full flex flex-col"
          >
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all" className="text-xs">
                All
                {notifications.length > 0 && (
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {notifications.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="unread" className="text-xs">
                Unread
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="ml-1 text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="critical" className="text-xs">
                Critical
                {criticalCount > 0 && (
                  <Badge variant="destructive" className="ml-1 text-xs">
                    {criticalCount}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="messages" className="text-xs">
                Messages
              </TabsTrigger>
              <TabsTrigger value="updates" className="text-xs">
                Updates
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="flex-1 mt-4">
              <ScrollArea className="h-full">
                <div className="space-y-3">
                  {getFilteredNotifications().length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No notifications found</p>
                    </div>
                  ) : (
                    getFilteredNotifications().map((notification) => (
                      <Link
                        key={notification.id}
                        href={notification.actionUrl}
                        className={`block p-4 rounded-lg border transition-all duration-200 ${
                          notification.read
                            ? "bg-card hover:bg-accent/50 border-border"
                            : "bg-primary/5 hover:bg-primary/10 border-primary/20"
                        }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-1">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p
                              className={`text-sm ${
                                notification.read
                                  ? "text-muted-foreground"
                                  : "text-card-foreground font-medium"
                              }`}
                            >
                              {notification.message}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <p className="text-xs text-muted-foreground">
                                {notification.time}
                              </p>
                              <Badge
                                variant="outline"
                                className="text-xs capitalize"
                              >
                                {notification.category}
                              </Badge>
                            </div>
                          </div>
                          {!notification.read && (
                            <div className="flex-shrink-0">
                              <div className="w-2 h-2 bg-primary rounded-full" />
                            </div>
                          )}
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
