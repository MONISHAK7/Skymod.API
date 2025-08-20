'use client';

import React, { useEffect, useState } from 'react';
import api from '@/utils/axios';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { Pencil, Trash2, Plus, LogOut } from 'lucide-react';

type Property = {
  id: string;
  address: string;
  purchaseDate: string;
  purchasePrice: number;
  sellingPrice: number;
  status: string;
  imageUrl?: string;
};

type UserInfo = {
  name: string;
  role: string;
};

type JwtPayload = {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
};

const Dashboard = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // ✅ Only run in browser
    if (typeof window === 'undefined') return;

    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const name =
        decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
      const role =
        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      setUser({ name, role });
    } catch (err) {
      console.error('Invalid token', err);
      router.push('/login');
      return;
    }

    api
      .get<Property[]>('/property', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProperties(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [router]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    router.push('/login');
  };

  const handleDelete = async (id: string) => {
    if (typeof window === 'undefined') return;

    const token = localStorage.getItem('token');
    if (!token) return;
    await api.delete(`/property/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProperties((prev) => prev.filter((p) => p.id !== id));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-blue-600 text-xl">
        Loading dashboard...
      </div>
    );
  }

  // Chart Data
  const chartData = properties.map((p) => ({
    address: p.address,
    purchasePrice: p.purchasePrice,
    sellingPrice: p.sellingPrice,
  }));

  const statusCounts = properties.reduce<Record<string, number>>((acc, curr) => {
    acc[curr.status] = (acc[curr.status] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.keys(statusCounts).map((key) => ({
    name: key,
    value: statusCounts[key],
  }));

  const pieColors = ['#60a5fa', '#34d399', '#facc15', '#f87171'];

  return (
    <div className="p-6 min-h-screen bg-gradient-to-tr from-[#f0f4f8] via-[#e8edf4] to-[#f9fbfd] text-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-blue-900">🏠 Dashboard</h1>
          {user && (
            <p className="text-gray-700 mt-1 text-md">
              Welcome back,{' '}
              <span className="font-medium text-blue-800">{user.name}</span>
            </p>
          )}
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500 text-white shadow hover:bg-red-600 transition"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4 text-blue-800">
            📊 Purchase vs Selling Prices
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="address" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="purchasePrice" fill="#60a5fa" />
              <Bar dataKey="sellingPrice" fill="#34d399" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4 text-blue-800">
            📈 Status Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {pieData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={pieColors[index % pieColors.length]}
                  />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Action + Title */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-semibold text-blue-900">🗂️ Properties</h2>
        <button
          onClick={() => router.push('/properties/create')}
          className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition shadow"
        >
          <Plus size={18} /> Add New Property
        </button>
      </div>

      {/* Property Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((prop) => (
          <div
            key={prop.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 border border-blue-100"
          >
            {/* Image */}
            <img
              src={prop.imageUrl || '/realestate.jpg'}
              alt="Property"
              className="w-full h-48 object-cover"
            />
            <h3 className="text-xl font-bold text-blue-800 mb-2">
              {prop.address}
            </h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>
                <strong>📅 Purchase:</strong> {prop.purchaseDate}
              </li>
              <li>
                <strong>💰 Bought:</strong> ${prop.purchasePrice}
              </li>
              <li>
                <strong>🏷️ Sold:</strong> ${prop.sellingPrice}
              </li>
              <li>
                <strong>Status:</strong>{' '}
                <span
                  className={`font-semibold ${prop.status === 'Sold'
                      ? 'text-green-600'
                      : prop.status === 'Ongoing'
                        ? 'text-yellow-600'
                        : 'text-blue-600'
                    }`}
                >
                  {prop.status}
                </span>
              </li>
            </ul>
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => router.push(`/properties/edit/${prop.id}`)}
                className="flex items-center gap-1 text-blue-600 hover:underline"
              >
                <Pencil size={16} /> Edit
              </button>
              <button
                onClick={() => handleDelete(prop.id)}
                className="flex items-center gap-1 text-red-500 hover:underline"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
