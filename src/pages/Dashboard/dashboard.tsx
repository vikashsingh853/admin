import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowUp, ArrowDown, Users, Activity, DollarSign, Clock } from 'lucide-react';

// Sample data for charts
const revenueData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 2780 },
  { name: 'May', revenue: 1890 },
  { name: 'Jun', revenue: 2390 },
];

const userGrowthData = [
  { name: 'Jan', users: 400 },
  { name: 'Feb', users: 300 },
  { name: 'Mar', users: 500 },
  { name: 'Apr', users: 278 },
  { name: 'May', users: 189 },
  { name: 'Jun', users: 239 },
];

const serviceDistributionData = [
  { name: 'Service A', value: 400 },
  { name: 'Service B', value: 300 },
  { name: 'Service C', value: 300 },
  { name: 'Service D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard = () => {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      
      {/* Statistics Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-card p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium text-muted-foreground">Total Users</h2>
              <p className="text-3xl font-bold mt-2">1,234</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-full">
              <Users className="h-6 w-6 text-primary" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm text-green-600">
            <ArrowUp className="h-4 w-4 mr-1" />
            <span>12% from last month</span>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium text-muted-foreground">Active Sessions</h2>
              <p className="text-3xl font-bold mt-2">56</p>
            </div>
            <div className="p-3 bg-green-500/10 rounded-full">
              <Activity className="h-6 w-6 text-green-500" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm text-red-600">
            <ArrowDown className="h-4 w-4 mr-1" />
            <span>8% from last month</span>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium text-muted-foreground">Total Revenue</h2>
              <p className="text-3xl font-bold mt-2">$12,345</p>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-full">
              <DollarSign className="h-6 w-6 text-purple-500" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm text-green-600">
            <ArrowUp className="h-4 w-4 mr-1" />
            <span>24% from last month</span>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium text-muted-foreground">Avg. Session</h2>
              <p className="text-3xl font-bold mt-2">4m 32s</p>
            </div>
            <div className="p-3 bg-yellow-500/10 rounded-full">
              <Clock className="h-6 w-6 text-yellow-500" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm text-green-600">
            <ArrowUp className="h-4 w-4 mr-1" />
            <span>3% from last month</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Revenue Trend Chart */}
        <div className="bg-card p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Revenue Trend</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="name" className="text-muted-foreground" />
                <YAxis className="text-muted-foreground" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Growth Chart */}
        <div className="bg-card p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">User Growth</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="name" className="text-muted-foreground" />
                <YAxis className="text-muted-foreground" />
                <Tooltip />
                <Legend />
                <Bar dataKey="users" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Service Distribution Chart */}
        <div className="bg-card p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Service Distribution</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={serviceDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {serviceDistributionData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;