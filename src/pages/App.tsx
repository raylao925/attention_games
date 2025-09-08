import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

const NavBar: React.FC = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `${isActive ? 'text-primary' : 'text-gray-500'} flex flex-col items-center`;
  return (
    <nav className="bg-white border-t border-gray-200 py-3 px-8 flex justify-around fixed bottom-0 w-full max-w-[500px]">
      <NavLink to="/" className={linkClass}>
        <i className="fas fa-home text-lg" />
        <span className="text-xs mt-1">首页</span>
      </NavLink>
      <NavLink to="/plan" className={linkClass}>
        <i className="fas fa-calendar-alt text-lg" />
        <span className="text-xs mt-1">计划</span>
      </NavLink>
      <NavLink to="/games" className={linkClass}>
        <i className="fas fa-gamepad text-lg" />
        <span className="text-xs mt-1">游戏</span>
      </NavLink>
      <NavLink to="/parent" className={linkClass}>
        <i className="fas fa-user-friends text-lg" />
        <span className="text-xs mt-1">家长</span>
      </NavLink>
      <NavLink to="/profile" className={linkClass}>
        <i className="fas fa-user text-lg" />
        <span className="text-xs mt-1">我的</span>
      </NavLink>
    </nav>
  );
};

const App: React.FC = () => {
  return (
    <div className="bg-background min-h-screen pb-20">
      <Outlet />
      <NavBar />
    </div>
  );
};

export default App;


