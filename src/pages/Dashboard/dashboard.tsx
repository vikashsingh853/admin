
const Dashboard = () => {
  return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-medium">Total Users</h2>
                    <p className="text-3xl font-bold mt-2">1,234</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-medium">Active Sessions</h2>
                    <p className="text-3xl font-bold mt-2">56</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-medium">Total Revenue</h2>
                    <p className="text-3xl font-bold mt-2">$12,345</p>
                </div>
            </div>
        </div>
  )
}

export default Dashboard