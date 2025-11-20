// Admin Dashboard Page

import React, { useState, useEffect } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { DashboardService } from '../../services/api';
import type { DashboardStats } from '../../types';

const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await DashboardService.getDashboardStats();
        if (response.success && response.data) {
          setStats(response.data);
        }
      } catch (error) {
        console.error('Failed to load dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  return (
    <div className="p-6 bg-neutral-900">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p className="text-neutral-300">Overview of your hotel operations</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : stats && (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-neutral-800 to-neutral-700 border-neutral-600 shadow-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">{stats.totalRooms}</div>
                <div className="text-neutral-300 font-medium">Total Rooms</div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-neutral-800 to-neutral-700 border-neutral-600 shadow-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">{stats.availableRooms}</div>
                <div className="text-neutral-300 font-medium">Available Rooms</div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-neutral-800 to-neutral-700 border-neutral-600 shadow-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">${stats.totalRevenue.toLocaleString()}</div>
                <div className="text-neutral-300 font-medium">Total Revenue</div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-neutral-800 to-neutral-700 border-neutral-600 shadow-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">{Math.round(stats.occupancyRate)}%</div>
                <div className="text-neutral-300 font-medium">Occupancy Rate</div>
              </div>
            </Card>
          </div>

          {/* Recent Bookings */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="bg-neutral-800 border-neutral-600 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-neutral-200">Recent Bookings</h3>
                <Button variant="outline" size="sm" className="border-neutral-600 text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors">View All</Button>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-neutral-700 border border-neutral-600 rounded-lg">
                  <div>
                    <div className="font-medium text-neutral-100">John Doe</div>
                    <div className="text-sm text-neutral-400">Single Room • Nov 15-17</div>
                  </div>
                  <div className="text-sm text-yellow-400 font-semibold">$160</div>
                </div>
                <div className="flex justify-between items-center p-3 bg-neutral-700 border border-neutral-600 rounded-lg">
                  <div>
                    <div className="font-medium text-neutral-100">Jane Smith</div>
                    <div className="text-sm text-neutral-400">Double Room • Nov 18-20</div>
                  </div>
                  <div className="text-sm text-yellow-400 font-semibold">$280</div>
                </div>
              </div>
            </Card>

            <Card className="bg-neutral-800 border-neutral-600 shadow-lg">
              <h3 className="text-lg font-semibold text-neutral-200 mb-4">Room Types</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Single Rooms</span>
                  <span className="font-semibold text-neutral-100">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Double Rooms</span>
                  <span className="font-semibold text-neutral-100">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Suites</span>
                  <span className="font-semibold text-neutral-100">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Deluxe Rooms</span>
                  <span className="font-semibold text-neutral-100">2</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="bg-neutral-800 border-neutral-600 shadow-lg">
            <h3 className="text-lg font-semibold text-neutral-200 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="primary" size="sm" className="bg-yellow-500 text-neutral-900 hover:bg-yellow-400 transition-colors">
                Add New Room
              </Button>
              <Button variant="outline" size="sm" className="border-neutral-600 text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors">
                Manage Bookings
              </Button>
              <Button variant="outline" size="sm" className="border-neutral-600 text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors">
                View Reports
              </Button>
              <Button variant="outline" size="sm" className="border-neutral-600 text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors">
                Settings
              </Button>
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default DashboardPage;
