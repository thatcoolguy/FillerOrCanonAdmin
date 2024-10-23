import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CalendarDateRangePicker from '@/components/sections/dashboard/date-range-picker';
import Overview from '@/components/sections/dashboard/overview';
import { CalendarIcon, VideoIcon } from '@radix-ui/react-icons';
import AppointMents from '@/components/sections/dashboard/appointMents';

function Dashboard() {
  return (
    <div className="mb-4 ">
      <div className="items-center justify-between space-y-2 md:flex">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex flex-col space-x-2 md:flex-row md:items-center">
          <CalendarDateRangePicker />
          <Button className=" mt-2 md:mt-0">Download</Button>
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className=" max-md:hidden">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics" disabled>
            Analytics
          </TabsTrigger>
          <TabsTrigger value="reports" disabled>
            Reports
          </TabsTrigger>
          <TabsTrigger value="notifications" disabled>
            Notifications
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-gradient-to-r from-purple-600 to-purple-500 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Appointments
                </CardTitle>
                <CalendarIcon className="h-4 w-4 text-gray-300" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24.4K</div>
                <p className="text-xs text-gray-300">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Students
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-gray-300"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">166.3k</div>
                <p className="text-xs text-gray-300">+180.1% from last month</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Students Consulting
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-gray-300"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">53.5k</div>
                <p className="text-xs text-gray-300">+19% from last month</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-red-600 to-red-500 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Video Consulting
                </CardTitle>
                <VideoIcon className="h-4 w-4 text-gray-300" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">28.0k</div>
                <p className="text-xs text-gray-300">+201 since last hour</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-12 overflow-auto lg:col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
                <CardDescription>Summary of your Students</CardDescription>
              </CardHeader>
              <CardContent className="-2">
                <Overview />
              </CardContent>
            </Card>
            <Card className="col-span-12 overflow-auto lg:col-span-3">
              <CardHeader>
                <CardTitle>Today's Exam Participant</CardTitle>
                <CardDescription>24 Participants today</CardDescription>
              </CardHeader>
              <CardContent>
                <AppointMents />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

Dashboard.layout = 'dashboard';
export default Dashboard;
