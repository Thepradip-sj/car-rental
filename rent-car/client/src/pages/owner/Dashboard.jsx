import React from 'react'

const Dashboard = () => {
    Const [data,setData]=useState({
        totalCars:0,
        totalBookings:0,
        pendingBookings:0,
        completeBookings:0,
        recentBookings:[],
        monthlyRevenue:0,
    })
    const dashboardCards=[
        {title: "Total Cars",value:data.totalCars,icon:assets.carIconColored },
        {title: "Total Bookings",value:data.totalBookings,icon:assets.carIconColored },
        {title: "Pending",value:data.pendingBookings,icon:assets.carIconColored },
        {title: "Confirmed",value:data.completedBookings,icon:assets.carIconColored },
    ]
    useEffect(()=>{
        setData(dummyDashboardData);
    },[])
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard;