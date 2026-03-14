import React from 'react'
import { RevenueVsExpenses } from './RevenueVsExpenses'
import TodaysHearings from './TodaysHearings'
import RecentActivities from './RecentActivities'

export default function DashboardCantainer() {
  return (
    <div>
    <RevenueVsExpenses />
    <div className="sm:flex justify-between gap-5 my-5">
      <div className="sm:w-2/3 w-full">
          <TodaysHearings />
      </div>
      <div className="sm:w-1/3 w-full my-5 sm:my-0">
          <RecentActivities />
      </div>
    </div>
  </div>
  )
}
