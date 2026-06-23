import React, { useState } from 'react';
import { FiLogOut, FiMenu, FiX, FiHome, FiFileText, FiPackage, FiBriefcase, FiImage, FiUsers, FiBarChart2 } from 'react-icons/fi';
import ContentManager from './AdminPanelComponents/ContentManager';
import StatsManager from './AdminPanelComponents/StatsManager';
import ProductManager from './AdminPanelComponents/ProductManager';
import CareerManager from './AdminPanelComponents/CareerManager';
import ImageManager from './AdminPanelComponents/ImageManager';
import ApplicationsManager from './AdminPanelComponents/ApplicationsManager';

const AdminDashboard = ({ token, admin, onLogout }) => {
  const [activeTab, setActiveTab] = useState('content');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const tabs = [
    { id: 'content', label: 'Content', icon: FiFileText, component: ContentManager },
    { id: 'stats', label: 'Stats', icon: FiBarChart2, component: StatsManager },
    { id: 'products', label: 'Products', icon: FiPackage, component: ProductManager },
    { id: 'careers', label: 'Careers', icon: FiBriefcase, component: CareerManager },
    { id: 'applications', label: 'Applications', icon: FiUsers, component: ApplicationsManager },
    { id: 'images', label: 'Images', icon: FiImage, component: ImageManager },
  ];

  const ActiveComponent = tabs.find(t => t.id === activeTab)?.component || ContentManager;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-gray-900 text-white transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h1 className={`font-bold text-xl ${sidebarOpen ? 'block' : 'hidden'}`}>Admin Panel</h1>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-800 rounded-lg"
            >
              {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <Icon size={20} />
                <span className={sidebarOpen ? 'block' : 'hidden'}>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
          >
            <FiLogOut size={20} />
            <span className={sidebarOpen ? 'block' : 'hidden'}>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            {tabs.find(t => t.id === activeTab)?.label}
          </h2>
          <div className="text-sm text-gray-600">
            Welcome, {admin?.name || 'Admin'}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            <ActiveComponent token={token} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
