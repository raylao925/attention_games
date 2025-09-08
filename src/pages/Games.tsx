import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

type GameId = 'focus-target' | 'memory-master' | 'quick-reaction' | 'switch-challenge' | 'target-tracking';

const gamesData: Record<GameId, any> = {
  'focus-target': {
    title: '专注目标挑战', category: 'attention', difficulty: '中等', duration: '7分钟', rewards: '+5 星星',
    description: '在多个移动的目标中找出特定的图案，训练注意力的集中能力和视觉追踪能力。',
    instructions: ['观察屏幕中移动的多个目标','当目标图案与指定图案匹配时点击','随着关卡提升，目标移动速度会加快','连续正确可获得额外分数'],
    benefits: ['提升视觉注意力','增强目标识别能力','改善冲动控制','提高反应准确性'],
    color: 'from-cyan-400 to-blue-500'
  },
  'memory-master': {
    title: '记忆大师', category: 'memory', difficulty: '初级', duration: '5分钟', rewards: '+2 星星',
    description: '记住屏幕上出现的图案序列，然后按顺序重现。训练工作记忆能力。',
    instructions: ['观察屏幕上出现的图案序列','按相同顺序点击图案','序列长度会逐渐增加','连续正确可获得额外分数'],
    benefits: ['增强短期记忆能力','提高信息处理速度','改善序列记忆','提升注意力持久性'],
    color: 'from-purple-400 to-indigo-500'
  },
  'quick-reaction': {
    title: '快速反应', category: 'reaction', difficulty: '初级', duration: '3分钟', rewards: '+2 星星',
    description: '在正确的时间点击目标，训练反应速度和抑制控制能力。',
    instructions: ['当目标出现时快速点击','避免点击干扰物','目标出现时间会越来越短','连续正确可获得额外分数'],
    benefits: ['提高反应速度','增强冲动控制','改善手眼协调','提升注意力分配'],
    color: 'from-green-400 to-teal-500'
  },
  'switch-challenge': {
    title: '转换挑战', category: 'flexibility', difficulty: '高级', duration: '8分钟', rewards: '+4 星星',
    description: '根据规则在任务间快速切换，训练认知灵活性和任务转换能力。',
    instructions: ['根据屏幕提示执行不同任务','当规则改变时快速调整策略','任务类型包括颜色、形状、方向识别','连续正确可获得额外分数'],
    benefits: ['提升认知灵活性','增强任务转换能力','改善规则理解','提高多任务处理'],
    color: 'from-amber-400 to-orange-500'
  },
  'target-tracking': {
    title: '目标追踪', category: 'attention', difficulty: '中级', duration: '6分钟', rewards: '+3 星星',
    description: '在多个移动对象中持续跟踪特定目标，训练持续注意力和视觉追踪能力。',
    instructions: ['选择一个目标进行跟踪','在目标移动过程中持续关注','当目标停止时选择正确位置','随着关卡提升，干扰物会增多'],
    benefits: ['延长注意力持续时间','增强视觉追踪能力','改善选择性注意力','提高目标维持能力'],
    color: 'from-cyan-400 to-blue-500'
  }
};

const Games: React.FC = () => {
  const [category, setCategory] = useState<string>('all');
  const [detailId, setDetailId] = useState<GameId | null>(null);
  const navigate = useNavigate();

  const detail = detailId ? gamesData[detailId] : null;
  const filtered = useMemo(() => Object.entries(gamesData).filter(([_, g]) => category==='all' || g.category===category), [category]);

  return (
    <div className="bg-background min-h-screen pb-24">
      <header className="header-gradient text-white p-5 pt-6 pb-6">
        <div className="flex items-center justify-between mb-4">
          <Link to="/" className="p-2 rounded-full bg-white bg-opacity-20"><i className="fas fa-arrow-left" /></Link>
          <h1 className="text-xl font-bold">游戏中心</h1>
          <div className="p-2 rounded-full bg-white bg-opacity-20"><i className="fas fa-search" /></div>
        </div>
        <div className="flex overflow-x-auto pb-2 space-x-3 -mx-1 px-1">
          {[
            {id:'all',label:'全部游戏'},
            {id:'attention',label:'注意力',cls:'bg-blue-100 text-blue-800',icon:'fas fa-bullseye'},
            {id:'memory',label:'记忆力',cls:'bg-purple-100 text-purple-800',icon:'fas fa-brain'},
            {id:'reaction',label:'反应力',cls:'bg-green-100 text-green-800',icon:'fas fa-bolt'},
            {id:'flexibility',label:'灵活性',cls:'bg-amber-100 text-amber-800',icon:'fas fa-random'},
          ].map(btn => (
            <button key={btn.id}
              onClick={() => setCategory(btn.id)}
              className={`category-btn px-3 py-2 rounded-lg ${category===btn.id ? 'active' : ''} ${btn.cls||''}`}>
              {btn.icon && <i className={`${btn.icon} mr-1`} />} {btn.label}
            </button>
          ))}
        </div>
      </header>

      <main className="px-5 py-4">
        <div className="mb-6">
          <h2 className="font-bold text-lg text-gray-800 mb-3">推荐游戏</h2>
          <div className="bg-white rounded-2xl overflow-hidden shadow-md">
            <div className="relative">
              <div className="h-48 bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center">
                <div className="text-center">
                  <i className="fas fa-bullseye text-white text-5xl mb-2" />
                  <h3 className="text-white font-bold text-xl">专注目标挑战</h3>
                  <p className="text-blue-100 mt-1">高级注意力训练</p>
                </div>
              </div>
              <div className="absolute top-3 right-3 bg-white text-blue-600 rounded-full px-3 py-1 text-xs font-bold">热门</div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <span className="difficulty-badge bg-blue-100 text-blue-800">中等难度</span>
                  <span className="difficulty-badge bg-yellow-100 text-yellow-800 ml-2"><i className="fas fa-star mr-1" />+5</span>
                </div>
                <div className="text-gray-500 text-sm"><i className="fas fa-users mr-1" /> 2.5k 参与</div>
              </div>
              <p className="text-gray-600 text-sm mb-4">在移动的目标中找出特定图案，提升注意力集中能力和视觉追踪能力。</p>
              <button className="game-start-btn w-full bg-blue-500 text-white py-3 rounded-xl font-bold shadow-md hover:bg-blue-600 transition"
                onClick={() => navigate('/play/focus-target')}>开始游戏</button>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg text-gray-800">所有训练游戏</h2>
            <div className="flex">
              <button className="bg-gray-100 p-2 rounded-lg mr-2"><i className="fas fa-sort-amount-down" /></button>
              <button className="bg-gray-100 p-2 rounded-lg"><i className="fas fa-filter" /></button>
            </div>
          </div>

          <div className="space-y-4">
            {filtered.map(([id, g]) => (
              <div key={id} className="game-card bg-white">
                <div className="flex p-4">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${g.color} flex items-center justify-center mr-4`}>
                    <i className={`text-white text-2xl ${g.category==='memory'?'fas fa-brain': g.category==='reaction'? 'fas fa-bolt': g.category==='flexibility'? 'fas fa-random': 'fas fa-crosshairs'}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-bold text-gray-800">{g.title}</h3>
                      <span className="difficulty-badge bg-gray-100 text-gray-800">{g.difficulty}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{g.description}</p>
                    <div className="flex items-center mt-2">
                      <i className="fas fa-star text-yellow-400 text-xs mr-1" />
                      <span className="text-xs text-gray-500 mr-3">{g.rewards}</span>
                      <i className="fas fa-clock text-gray-400 text-xs mr-1" />
                      <span className="text-xs text-gray-500">{g.duration}</span>
                    </div>
                  </div>
                </div>
                <div className="px-4 pb-4 grid grid-cols-2 gap-2">
                  <button className="w-full bg-gray-100 py-2 rounded-lg text-gray-700 font-medium" onClick={() => setDetailId(id as GameId)}>查看详情</button>
                  <button className="w-full bg-primary text-white py-2 rounded-lg font-medium" onClick={() => navigate(`/play/${id}`)}>开始</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {detail && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4" onClick={() => setDetailId(null)}>
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="relative">
              <div className={`h-40 bg-gradient-to-r ${detail.color} flex items-center justify-center`}>
                <div className="text-center">
                  <h3 className="text-white font-bold text-2xl">{detail.title}</h3>
                  <p className="text-blue-100 mt-2">{detail.difficulty} | {detail.duration} | {detail.rewards}</p>
                </div>
              </div>
              <button className="absolute top-3 right-3 bg-white rounded-full w-8 h-8 flex items-center justify-center" onClick={() => setDetailId(null)}>
                <i className="fas fa-times text-gray-600" />
              </button>
            </div>
            <div className="p-5">
              <h4 className="font-bold text-lg text-gray-800 mb-3">游戏介绍</h4>
              <p className="text-gray-600 mb-5">{detail.description}</p>
              <h4 className="font-bold text-lg text-gray-800 mb-3">游戏规则</h4>
              <ul className="list-disc pl-5 text-gray-600 mb-5 space-y-2">
                {detail.instructions.map((it:string,idx:number)=>(<li key={idx}>{it}</li>))}
              </ul>
              <h4 className="font-bold text-lg text-gray-800 mb-3">训练益处</h4>
              <div className="flex flex-wrap gap-2 mb-6">
                {detail.benefits.map((b:string,idx:number)=>(<span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">{b}</span>))}
              </div>
              <button className="w-full bg-primary text-white py-3 rounded-xl font-bold" onClick={() => navigate(`/play/${detailId}`)}>开始游戏</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Games;


