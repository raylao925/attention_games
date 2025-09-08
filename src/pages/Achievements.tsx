import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

type AchId = 'focus-master'|'memory-champion'|'quick-reflex'|'flexibility-expert'|'streak-master'|'star-collector';
const achievements: Record<AchId, any> = {
  'focus-master': { title:'专注大师', description:'完成30次专注力训练，证明你拥有超强的注意力持久性！', category:'attention', icon:'fas fa-bullseye', color:'bg-blue-100 text-blue-600', status:'已获得', date:'2023年10月28日', progress:100, rewards:[{icon:'fas fa-star',text:'+50 星星'},{icon:'fas fa-medal',text:'专属成就徽章'},{icon:'fas fa-trophy',text:'专注大师称号'}], tips:'继续挑战更高难度的专注力游戏，提升你的注意力控制能力！' },
  'memory-champion': { title:'记忆冠军', description:'在记忆游戏中连续10次获得满分，展现你惊人的记忆力！', category:'memory', icon:'fas fa-brain', color:'bg-purple-100 text-purple-600', status:'已获得', date:'2023年11月2日', progress:100, rewards:[{icon:'fas fa-star',text:'+30 星星'},{icon:'fas fa-tshirt',text:'记忆大师服装'}], tips:'尝试挑战更长的记忆序列，继续锻炼你的工作记忆能力！' },
  'quick-reflex': { title:'快速反应', description:'平均反应时间低于0.5秒，证明你拥有闪电般的反应速度！', category:'reaction', icon:'fas fa-bolt', color:'bg-green-100 text-green-600', status:'已获得', date:'2023年11月5日', progress:100, rewards:[{icon:'fas fa-star',text:'+40 星星'},{icon:'fas fa-bolt',text:'闪电反应特效'}], tips:'保持练习，挑战更复杂的反应游戏，提升你的反应抑制能力！' },
  'flexibility-expert': { title:'转换专家', description:'完成20次认知灵活性训练，展现你优秀的任务转换能力！', category:'flexibility', icon:'fas fa-random', color:'bg-amber-100 text-amber-600', status:'进行中', date:'', progress:70, rewards:[{icon:'fas fa-star',text:'+60 星星'},{icon:'fas fa-hat-wizard',text:'转换专家帽子'}], tips:'每天完成灵活性训练，你离成为转换专家只差6次训练了！' },
  'streak-master': { title:'坚持之星', description:'连续30天完成训练计划，证明你拥有惊人的毅力和坚持！', category:'special', icon:'fas fa-fire', color:'bg-red-100 text-red-600', status:'进行中', date:'', progress:20, rewards:[{icon:'fas fa-star',text:'+100 星星'},{icon:'fas fa-gem',text:'专属宝石特效'},{icon:'fas fa-crown',text:'坚持之星称号'}], tips:'保持每日训练习惯，你已经在连续训练的道路上坚持了7天！' },
  'star-collector': { title:'星星收藏家', description:'收集超过200颗星星，你是一位真正的星星收藏大师！', category:'special', icon:'fas fa-star', color:'bg-yellow-100 text-yellow-600', status:'已获得', date:'2023年11月6日', progress:100, rewards:[{icon:'fas fa-medal',text:'星星收藏家徽章'},{icon:'fas fa-coins',text:'双倍星星奖励特权'}], tips:'继续收集星星，解锁更多角色和装扮！' }
};

const Achievements: React.FC = () => {
  const [category, setCategory] = useState<string>('all');
  const [detailId, setDetailId] = useState<AchId| null>(null);
  const filtered = useMemo(() => Object.entries(achievements).filter(([_, a]) => category==='all' || a.category===category), [category]);
  const detail = detailId ? achievements[detailId] : null;

  return (
    <div className="bg-background min-h-screen pb-24">
      <header className="header-gradient text-white p-5 pt-6 pb-6">
        <div className="flex items-center justify-between mb-4">
          <Link to="/profile" className="p-2 rounded-full bg-white bg-opacity-20"><i className="fas fa-arrow-left" /></Link>
          <h1 className="text-xl font-bold">成就系统</h1>
          <div className="p-2 rounded-full bg-white bg-opacity-20"><i className="fas fa-search" /></div>
        </div>
        <div className="flex items-center justify-center bg-white bg-opacity-20 p-4 rounded-xl mb-4">
          <div className="flex items-center mr-6"><i className="fas fa-star text-yellow-400 text-2xl mr-2" /><div><p className="text-xs opacity-80">我的星星</p><p className="font-bold text-lg">256</p></div></div>
          <div className="h-10 w-px bg-white bg-opacity-30" />
          <div className="flex items-center ml-6"><i className="fas fa-medal text-amber-400 text-2xl mr-2" /><div><p className="text-xs opacity-80">成就点数</p><p className="font-bold text-lg">780</p></div></div>
        </div>
      </header>

      <main className="px-5 py-4">
        <div className="flex overflow-x-auto pb-4 space-x-3 mb-6">
          {['all','attention','memory','reaction','flexibility','special'].map(cat => (
            <button key={cat} onClick={() => setCategory(cat)} className={`category-btn ${category===cat? 'active':''}`}>{cat==='all'? '全部成就' : cat}</button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {filtered.map(([id, a]) => (
            <div key={id} className={`achievement-card bg-white`} onClick={() => setDetailId(id as AchId)}>
              <div className="p-4">
                <div className={`badge-icon ${a.color} mb-3`}><i className={a.icon} /></div>
                <h3 className="font-bold text-gray-800 text-center mb-1">{a.title}</h3>
                <p className="text-xs text-gray-500 text-center">{a.description.slice(0, 10)}...</p>
              </div>
              <div className="bg-gray-50 p-2 text-center text-xs text-gray-700 font-medium">{a.status}</div>
            </div>
          ))}
        </div>
      </main>

      {detail && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4" onClick={() => setDetailId(null)}>
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden" onClick={e=>e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className={`badge-icon ${detail.color} mb-4`}><i className={detail.icon} /></div>
                  <h2 className="font-bold text-2xl text-gray-800">{detail.title}</h2>
                  <p className="text-gray-600 mt-2">{detail.description}</p>
                  {detail.date && <p className="text-sm text-gray-500 mt-1"><i className="fas fa-calendar-alt mr-2" />获得时间: {detail.date}</p>}
                </div>
                <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center" onClick={() => setDetailId(null)}><i className="fas fa-times text-gray-600" /></button>
              </div>
              <div className="bg-gray-100 p-4 rounded-xl mt-4">
                <h3 className="font-bold text-gray-800 mb-3">成就奖励</h3>
                {detail.rewards.map((r:any, idx:number) => (
                  <div className="flex items-center mb-2" key={idx}>
                    <div className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-3"><i className={r.icon} /></div>
                    <span className="font-medium">{r.text}</span>
                  </div>
                ))}
              </div>
              {detail.progress < 100 && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1"><span>完成进度</span><span>{detail.progress}%</span></div>
                  <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-gradient-to-r from-amber-400 to-amber-500 h-2 rounded-full" style={{ width: `${detail.progress}%` }} /></div>
                </div>
              )}
              <div className="mt-6 bg-blue-50 p-4 rounded-xl">
                <h3 className="font-bold text-gray-800 mb-2"><i className="fas fa-lightbulb text-blue-500 mr-2" />训练建议</h3>
                <p className="text-gray-700">{detail.tips}</p>
              </div>
              <div className="mt-6 text-center">
                {detail.status === '已获得'
                  ? <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"><i className="fas fa-check-circle mr-1" />已获得</span>
                  : <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium"><i className="fas fa-spinner mr-1" />进行中</span>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Achievements;


