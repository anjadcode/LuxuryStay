// User Management Page - Updated with luxury dark theme

import React, { useState, useEffect } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { UserService } from '../../services/api';
import type { User } from '../../types';

const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await UserService.getUsers();
        if (response.success && response.data) {
          setUsers(response.data);
        }
      } catch (error) {
        console.error('Failed to load users:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  return (
    <div className="p-6 bg-neutral-900">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">User Management</h1>
        <Button variant="primary" size="md" className="bg-yellow-500 text-neutral-900 hover:bg-yellow-400 transition-colors">
          Add New User
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
        </div>
      ) : (
        <Card className="bg-neutral-800 border-neutral-600 shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-600">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-200">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-200">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-200">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-200">Bookings</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-200">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-200">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-neutral-600 hover:bg-neutral-700 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-neutral-100">{user.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-neutral-400">{user.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full border ${
                        user.role === 'admin'
                          ? 'bg-purple-800 text-purple-200 border-purple-600'
                          : 'bg-neutral-700 text-neutral-200 border-neutral-600'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-neutral-400">{user.bookings.length} bookings</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-green-800 text-green-200 border border-green-600 text-xs rounded-full">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="border-neutral-600 text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="border-neutral-600 text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors">
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};

export default UserManagementPage;
