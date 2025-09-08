import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Parent: React.FC = () => {
  const [tab, setTab] = useState<'overview'|'progress'|'notifications'>('overview');
  const [child, setChild] = useState<'小明'|'小美'>('小明');
  const [toggles, setToggles] = useState({ daily:true, weekly:true, achievement:true });

  return (
    <div className="bg-background min-h-screen pb-24">
      <header className="header-gradient text-white p-5 pt-6 pb-6">
        <div className="flex items-center justify-between mb-4">
          <Link to="/" className="p-2 rounded-full bg-white bg-opacity-20"><i className="fas fa-arrow-left" /></Link>
          <h1 className="text-xl font-bold">家长监控</h1>
          <div className="flex items-center">
            <button className="p-2 rounded-full bg-white bg-opacity-20 mr-2"><i className="fas fa-sync-alt" /></button>
            <button className="p-2 rounded-full bg-white bg-opacity-20"><i className="fas fa-cog" /></button>
          </div>
        </div>
        <div className="flex overflow-x-auto pb-2 space-x-3 -mx-1 px-1">
          {['小明','小美'].map(c => (
            <div key={c} className={`child-selector ${child===c?'active':''}`} onClick={()=>setChild(c as any)}>
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 mr-3" />
              <div>
                <h3 className="font-bold">{c}</h3>
                <p className="text-xs opacity-80">{c==='小明'?'7岁 · 男孩':'5岁 · 女孩'}</p>
              </div>
            </div>
          ))}
          <div className="child-selector flex items-center justify-center p-3"><i className="fas fa-plus text-lg" /></div>
        </div>
      </header>

      <main className="px-5 py-4">
        <div className="flex justify-around bg-gray-100 rounded-xl p-1 mb-6">
          {['overview','progress','notifications'].map(t => (
            <button key={t} className={`tab-button w-1/3 text-center ${tab===t?'active':''}`} onClick={()=>setTab(t as any)}>
              {t==='overview'?'数据概览': t==='progress'?'能力进展':'消息通知'}
            </button>
          ))}
        </div>

        {tab==='overview' && (
          <div id="overviewTab" className="tab-content active">
            <div className="grid grid-cols-2 gap-4 mb-6">
              {[{icon:'fas fa-clock',label:'总训练时长',val:'12.5小时',color:'bg-blue-500'},
                {icon:'fas fa-gamepad',label:'完成游戏数',val:'87',color:'bg-purple-500'},
                {icon:'fas fa-star',label:'获得星星数',val:'256',color:'bg-amber-500'},
                {icon:'fas fa-fire',label:'连续训练',val:'7天',color:'bg-green-500'}].map((it,idx)=>(
                <div key={idx} className="card bg-white p-4">
                  <div className="flex items-center">
                    <div className={`${it.color.replace('500','100')} p-3 rounded-full mr-3`}><i className={`${it.icon} ${it.color.replace('100','600')}`} /></div>
                    <div><h3 className="text-gray-500 text-sm">{it.label}</h3><p className="text-xl font-bold">{it.val}</p></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab==='progress' && (
          <div id="progressTab" className="tab-content active">
            <div className="card bg-white p-5 mb-6">
              <h2 className="font-bold text-gray-800 mb-4">能力发展评估</h2>
              <div className="text-sm text-gray-700">过去30天，{child}的持续注意力提升23%，工作记忆提升18%。</div>
            </div>
          </div>
        )}

        {tab==='notifications' && (
          <div id="notificationsTab" className="tab-content active">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg text-gray-800">通知消息</h2>
              <button className="text-primary text-sm font-medium">全部已读</button>
            </div>
            <div className="space-y-3">
              {[{icon:'fas fa-trophy', color:'text-blue-600 bg-blue-100', title:'新成就解锁!', time:'2小时前'},
                {icon:'fas fa-chart-line', color:'text-green-600 bg-green-100', title:'周报告已生成', time:'昨天'}].map((n,idx)=>(
                  <div key={idx} className={`notification-item ${idx===0?'unread':''} card bg-white p-4`}>
                    <div className="flex"><div className={`${n.color.split(' ')[1]} p-2 rounded-full mr-3`}><i className={`${n.icon} ${n.color.split(' ')[0]}`} /></div><div><h3 className="font-bold text-gray-800 mb-1">{n.title}</h3><p className="text-xs text-gray-400 mt-2">{n.time}</p></div></div>
                  </div>
              ))}
            </div>

            <div className="mt-8">
              <h2 className="font-bold text-lg text-gray-800 mb-4">设置提醒</h2>
              {[
                {key:'daily', title:'每日训练提醒', sub:'下午 5:00 · 每天'},
                {key:'weekly', title:'周报告通知', sub:'周一上午 9:00'},
                {key:'achievement', title:'成就解锁通知', sub:'即时通知'}
              ].map((s:any) => (
                <div key={s.key} className="card bg-white p-4 mb-3">
                  <div className="flex justify-between items-center">
                    <div><h3 className="font-medium text-gray-800">{s.title}</h3><p className="text-sm text-gray-600">{s.sub}</p></div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only" checked={(toggles as any)[s.key]} onChange={() => setToggles(prev=> ({...prev, [s.key]: !prev[s.key as keyof typeof prev]}))} />
                      <span className={`block w-12 h-6 rounded-full ${ (toggles as any)[s.key] ? 'bg-primary':'bg-gray-200' }`}>
                        <span className={`absolute w-4 h-4 bg-white rounded-full top-1 transition ${ (toggles as any)[s.key] ? 'translate-x-7':'translate-x-1' }`} />
                      </span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Parent;


