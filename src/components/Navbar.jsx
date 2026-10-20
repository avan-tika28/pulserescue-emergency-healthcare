import React, { useState, useRef, useEffect } from 'react';
import { 
  Activity, 
  Users, 
  AlertOctagon, 
  QrCode, 
  HeartPulse, 
  FileText, 
  LifeBuoy, 
  Stethoscope, 
  Menu, 
  X,
  LogOut,
  User,
  ChevronDown,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  criticalCount = 4, 
  currentUser, 
  onLogout 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [dutyStatus, setDutyStatus] = useState('On Duty');
  const dropdownRef = useRef(null);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'emergency', label: 'Emergency Response', icon: AlertOctagon, isEmergency: true },
    { id: 'passport', label: 'Health Passport', icon: QrCode },
    { id: 'risk-assessment', label: 'Risk Assessment', icon: HeartPulse },
    { id: 'reports', label: 'Medical Reports', icon: FileText },
    { id: 'first-aid', label: 'First-Aid Guidance', icon: LifeBuoy },
    { id: 'clinical', label: 'Clinical Dashboard', icon: Stethoscope, badge: criticalCount }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  const userDisplayName = currentUser?.name || 'Dr. Sarah Mitchell, MD';
  const userRole = currentUser?.role || 'Emergency Medicine Attending';
  const userInitials = userDisplayName
    .split(' ')
    .filter(n => !n.includes('.') && !n.includes(','))
    .map(n => n[0])
    .slice(0, 2)
    .join('') || 'SM';

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Product Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => handleNavClick('overview')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center text-white shadow-xs group-hover:bg-slate-800 transition-colors">
                <HeartPulse className="w-5 h-5 text-teal-400" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="font-bold text-lg text-slate-900 tracking-tight">
                    Pulse<span className="text-teal-600">Rescue</span>
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium tracking-normal mt-0.5">
                  Emergency Healthcare Management Platform
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              if (item.isEmergency) {
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`ml-1 mr-1 px-2.5 py-1.5 rounded-lg font-semibold text-xs flex items-center gap-1.5 transition-colors border ${
                      isActive 
                        ? 'bg-red-700 text-white border-red-700 shadow-xs'
                        : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100 hover:border-red-300'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </button>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-teal-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-500 text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Header Controls: User Profile Menu & Logout */}
          <div className="flex items-center gap-2">
            
            {/* User Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 border border-slate-200/80 transition text-left"
                aria-expanded={profileDropdownOpen}
                aria-haspopup="true"
              >
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                  {userInitials}
                </div>
                <div className="hidden md:block pr-1 leading-tight">
                  <span className="text-xs font-semibold text-slate-800 block truncate max-w-[130px]">
                    {userDisplayName}
                  </span>
                  <span className="text-[10px] text-teal-700 font-medium block">
                    {dutyStatus}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
              </button>

              {/* Dropdown Menu Modal */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50 text-xs animate-fadeIn">
                  <div className="px-3.5 py-2.5 border-b border-slate-100">
                    <span className="font-bold text-slate-900 text-xs block">{userDisplayName}</span>
                    <span className="text-[11px] text-slate-500 block">{userRole}</span>
                    <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">
                      ID: {currentUser?.hospitalId || 'MD-9042'} • {currentUser?.facility || 'Apex Trauma'}
                    </span>
                  </div>

                  {/* Status Toggle */}
                  <div className="px-3.5 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-slate-600 font-medium text-[11px]">Clinical Duty Status:</span>
                    <select
                      value={dutyStatus}
                      onChange={(e) => setDutyStatus(e.target.value)}
                      className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 focus:outline-none"
                    >
                      <option value="On Duty">On Duty</option>
                      <option value="In Resuscitation">In Resuscitation</option>
                      <option value="On Break">On Break</option>
                      <option value="Off Duty">Off Duty</option>
                    </select>
                  </div>

                  <div className="px-1 py-1">
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        handleNavClick('overview');
                      }}
                      className="w-full flex items-center gap-2 px-3 py-1.5 text-slate-700 hover:bg-slate-50 rounded-lg text-left"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                      <span>Console Permissions</span>
                    </button>

                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        if (onLogout) onLogout();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg text-left font-semibold text-xs transition cursor-pointer border-t border-slate-100 mt-1"
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Emergency SOS Shortcut on tablet/mobile */}
            <button
              onClick={() => handleNavClick('emergency')}
              className="xl:hidden flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-700 transition"
            >
              <AlertOctagon className="w-3.5 h-3.5" />
              <span>SOS</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1 shadow-lg">
          <div className="py-2.5 mb-2 border-b border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <div>
              <span className="font-semibold text-slate-900 block">{userDisplayName}</span>
              <span className="text-[11px] text-slate-400">{userRole}</span>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onLogout) onLogout();
              }}
              className="px-3 py-1.5 text-red-600 hover:text-red-700 font-semibold rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 text-xs flex items-center gap-1.5 transition cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition ${
                  isActive
                    ? 'bg-slate-900 text-white'
                    : item.isEmergency
                    ? 'bg-red-50 text-red-700 border border-red-200'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-teal-400' : item.isEmergency ? 'text-red-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white">
                    {item.badge} Critical
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
