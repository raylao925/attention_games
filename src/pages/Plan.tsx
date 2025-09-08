import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Plan: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'daily'|'weekly'>('daily');
  const [activeDay, setActiveDay] = useState<number>(8);
  const navigate = useNavigate();

  return (
    <div className="bg-background min-h-screen pb-24">
      <header className="header-gradient text-white p-5 pt-6 pb-6">
        <div className="flex items-center justify-between mb-4">
          <Link to="/" className="p-2 rounded-full bg-white bg-opacity-20"><i className="fas fa-arrow-left" /></Link>
          <h1 className="text-xl font-bold">训练计划</h1>
          <div className="p-2 rounded-full bg-white bg-opacity-20"><i className="fas fa-chart-line" /></div>
        </div>
        <div className="bg-white bg-opacity-20 rounded-xl p-3 mb-2">
          <div className="grid grid-cols-7 text-center text-sm mb-2">
            {['日','一','二','三','四','五','六'].map(d => <div key={d}>{d}</div>)}
          </div>
          <div className="grid grid-cols-7 text-center">
            {[29,30,31,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,1].map((d, idx) => {
              const disabled = idx<3 || idx>30;
              const isActive = d===activeDay && !disabled;
              const completed = [2,3,4,5,6,7].includes(d as number);
              return (
                <div key={idx} className={`calendar-day ${disabled? 'opacity-40':''} ${isActive?'active':''} ${completed?'completed':''}`} onClick={() => !disabled && setActiveDay(d as number)}>{d}</div>
              );
            })}
          </div>
        </div>
      </header>

      <main className="px-5 py-4">
        <div className="flex justify-around bg-gray-100 rounded-xl p-1 mb-6">
          <button className={`tab-button w-1/2 text-center ${activeTab==='daily'?'active':''}`} onClick={()=>setActiveTab('daily')}>每日计划</button>
          <button className={`tab-button w-1/2 text-center ${activeTab==='weekly'?'active':''}`} onClick={()=>setActiveTab('weekly')}>每周计划</button>
        </div>

        {activeTab==='daily' && (
          <div id="dailyTab" className="tab-content active">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg text-gray-800">11月{activeDay}日训练计划</h2>
              <div className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full"><i className="fas fa-check-circle mr-1" />进行中</div>
            </div>
            <div className="space-y-4 mb-8">
              <div className="task-card task-completed bg-white">
                <div className="flex items-center p-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center mr-4"><i className="fas fa-bullseye text-white text-xl" /></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-gray-800">专注目标挑战</h3>
                      <div className="text-green-500"><i className="fas fa-check-circle" /></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">注意力训练 - 中等难度</p>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span><i className="fas fa-clock mr-1" /> 7分钟</span>
                    <span><i className="fas fa-star text-yellow-400 mr-1" /> +5</span>
                    <span><i className="fas fa-check-circle mr-1" /> 已完成</span>
                  </div>
                </div>
              </div>

              <div className="task-card bg-white cursor-pointer" onClick={() => navigate('/play/memory-master')}>
                <div className="flex items-center p-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-400 to-indigo-500 flex items-center justify-center mr-4"><i className="fas fa-brain text-white text-xl" /></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-gray-800">记忆大师</h3>
                      <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center"><div className="w-3 h-3 rounded-full bg-gray-300" /></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">记忆力训练 - 初级难度</p>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span><i className="fas fa-clock mr-1" /> 5分钟</span>
                    <span><i className="fas fa-star text-yellow-400 mr-1" /> +2</span>
                    <span className="text-blue-500"><i className="fas fa-play-circle mr-1" /> 开始训练</span>
                  </div>
                </div>
              </div>

              <div className="task-card bg-white cursor-pointer" onClick={() => navigate('/play/quick-reaction')}>
                <div className="flex items-center p-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-400 to-teal-500 flex items-center justify-center mr-4"><i className="fas fa-bolt text-white text-xl" /></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-gray-800">快速反应</h3>
                      <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center"><div className="w-3 h-3 rounded-full bg-gray-300" /></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">反应力训练 - 初级难度</p>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span><i className="fas fa-clock mr-1" /> 3分钟</span>
                    <span><i className="fas fa-star text-yellow-400 mr-1" /> +2</span>
                    <span className="text-blue-500"><i className="fas fa-play-circle mr-1" /> 开始训练</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab==='weekly' && (
          <div id="weeklyTab" className="tab-content active">
            <h2 className="font-bold text-lg text-gray-800 mb-4">本周训练计划</h2>
            <div className="bg-white rounded-2xl p-4 mb-6">
              <div className="flex justify-between items-center mb-3"><h3 className="font-medium text-gray-700">周进度</h3><span className="font-bold text-gray-800">3/7 天</span></div>
              <div className="progress-bar h-2 bg-gray-200 rounded"><div className="progress-fill h-2 bg-amber-500 rounded" style={{ width:'43%' }} /></div>
            </div>
            <div className="bg-white rounded-2xl p-4 mb-6">
              <h3 className="font-medium text-gray-700 mb-3">每日训练目标</h3>
              <div className="grid grid-cols-4 gap-3">
                {[
                  {icon:'fas fa-bullseye',label:'注意力',cls:'text-blue-600 bg-blue-100'},
                  {icon:'fas fa-brain',label:'记忆力',cls:'text-purple-600 bg-purple-100'},
                  {icon:'fas fa-bolt',label:'反应力',cls:'text-green-600 bg-green-100'},
                  {icon:'fas fa-random',label:'灵活性',cls:'text-amber-600 bg-amber-100'},
                ].map((it,idx)=>(
                  <div key={idx} className="p-3 rounded-xl text-center bg-gray-50">
                    <div className={`w-10 h-10 rounded-full ${it.cls} flex items-center justify-center mx-auto mb-2`}><i className={it.icon} /></div>
                    <span className="text-xs font-medium">{it.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Plan;


