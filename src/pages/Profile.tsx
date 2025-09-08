import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Profile: React.FC = () => {
  const [selected, setSelected] = useState<number>(0);

  return (
    <div className="bg-background min-h-screen pb-24">
      <div className="profile-bg" />
      <main className="px-5 -mt-20 pb-24">
        <div className="avatar-container text-center mb-6">
          <div className="bg-gray-200 border-2 border-dashed rounded-full avatar mx-auto" />
          <div className="badge-icon rounded-full text-white"><i className="fas fa-medal bounce" /></div>
          <h1 className="text-2xl font-bold mt-4">小明</h1>
          <p className="text-gray-600">7岁 · 小星训练师</p>
          <div className="flex justify-center mt-4">
            <div className="star-badge px-4 py-2 rounded-full flex items-center mx-2"><i className="fas fa-star text-yellow-600 mr-2" /><span className="font-bold">256</span></div>
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full flex items-center mx-2"><i className="fas fa-fire text-orange-500 mr-2" /><span className="font-bold">7天</span></div>
          </div>
        </div>

        <div className="card bg-white mb-6">
          <div className="p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-xl text-gray-800">我的成就</h2>
              <Link to="/achievements" className="text-primary text-sm font-medium">查看全部</Link>
            </div>
            <div className="badge-grid">
              {[
                {cls:'bg-amber-50', icon:'fas fa-medal', title:'专注小达人', sub:'完成30次专注力训练'},
                {cls:'bg-purple-50', icon:'fas fa-brain', title:'记忆大师', sub:'记忆游戏通关'},
                {cls:'bg-blue-50', icon:'fas fa-infinity', title:'无限潜力', sub:'连续训练14天'},
                {cls:'bg-gray-100 opacity-50', icon:'fas fa-crown', title:'超级星星', sub:'获得500颗星'}
              ].map((b, idx) => (
                <div key={idx} className={`badge-card ${b.cls}`}>
                  <div className="badge-icon-lg bg-white text-gray-700"><i className={b.icon} /></div>
                  <h3 className="font-bold text-sm">{b.title}</h3>
                  <p className="text-xs text-gray-500">{b.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card bg-white mb-6">
          <div className="p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-xl text-gray-800">角色装扮</h2>
              <Link to="/store" className="text-primary text-sm font-medium">商城</Link>
            </div>
            <div className="flex overflow-x-auto pb-4 space-x-4 -mx-1 px-1">
              {[
                {name:'基础角色', cls:'from-blue-400 to-indigo-500', own:true},
                {name:'太空冒险家', cls:'from-purple-400 to-indigo-500'},
                {name:'森林守护者', cls:'from-green-400 to-teal-500'},
                {name:'火焰勇者', cls:'from-amber-400 to-orange-500'}
              ].map((c, idx) => (
                <div key={idx} className={`character-card ${selected===idx?'selected':''} bg-gray-100 rounded-2xl p-4 flex flex-col items-center min-w-max`}
                     onClick={() => setSelected(idx)}>
                  <div className={`w-20 h-20 bg-gradient-to-r ${c.cls} rounded-full mb-3`} />
                  <h3 className="font-bold text-gray-800 text-sm">{c.name}</h3>
                  <p className="text-xs text-gray-500">{c.own?'已拥有':'100-200 星星'}</p>
                </div>
              ))}
            </div>
            <button className="w-full bg-gray-100 py-3 rounded-xl font-medium mt-2">更换角色</button>
          </div>
        </div>

        <div className="card bg-white mb-6">
          <div className="p-5">
            <h2 className="font-bold text-xl text-gray-800 mb-4">训练统计</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-xl"><div className="text-3xl font-bold text-blue-600 text-center">87</div><p className="text-center text-sm text-gray-600">完成游戏</p></div>
              <div className="bg-purple-50 p-4 rounded-xl"><div className="text-3xl font-bold text-purple-600 text-center">12.5</div><p className="text-center text-sm text-gray-600">训练小时</p></div>
              <div className="bg-green-50 p-4 rounded-xl"><div className="text-3xl font-bold text-green-600 text-center">23%</div><p className="text-center text-sm text-gray-600">注意力提升</p></div>
              <div className="bg-amber-50 p-4 rounded-xl"><div className="text-3xl font-bold text-amber-600 text-center">7</div><p className="text-center text-sm text-gray-600">连续天数</p></div>
            </div>
          </div>
        </div>

        <div className="card bg-white">
          <div className="p-1">
            {[{icon:'fas fa-bell', label:'通知设置', color:'text-blue-600 bg-blue-100'},
              {icon:'fas fa-shield-alt', label:'隐私设置', color:'text-purple-600 bg-purple-100'},
              {icon:'fas fa-question-circle', label:'帮助与反馈', color:'text-amber-600 bg-amber-100'},
              {icon:'fas fa-info-circle', label:'关于小星专注力', color:'text-green-600 bg-green-100'},
              {icon:'fas fa-sign-out-alt', label:'退出登录', color:'text-red-600 bg-red-100'}].map((m,idx)=>(
                <div key={idx} className="menu-item flex items-center">
                  <div className={`w-10 h-10 ${m.color.split(' ')[1]} rounded-full flex items-center justify-center mr-3`}><i className={`${m.icon} ${m.color.split(' ')[0]}`} /></div>
                  <div className="flex-1"><h3 className="font-medium text-gray-800">{m.label}</h3></div>
                  <i className="fas fa-chevron-right text-gray-400" />
                </div>
            ))}
          </div>
        </div>
      </main>
      <Link to="/store" className="fixed bottom-24 right-5 w-14 h-14 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 flex items-center justify-center text-white floating-action"><i className="fas fa-star text-xl" /></Link>
    </div>
  );
};

export default Profile;


