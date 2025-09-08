import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const onStart = () => navigate('/plan');

  return (
    <main className="px-5 -mt-0 pb-24">
      <header className="header-gradient text-white p-5 pt-8 pb-16 rounded-b-3xl">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <i className="fas fa-star text-accent text-2xl mr-2 bounce" />
            <h1 className="text-2xl font-bold">小星专注力</h1>
          </div>
          <div className="flex space-x-4">
            <button className="bg-white bg-opacity-20 p-2 rounded-full">
              <i className="fas fa-bell" />
            </button>
            <Link to="/profile" className="bg-white bg-opacity-20 p-2 rounded-full">
              <i className="fas fa-user" />
            </Link>
          </div>
        </div>
        <div className="bg-white bg-opacity-20 p-4 rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">今日训练进度</span>
            <span className="font-bold">60%</span>
          </div>
          <div className="progress-bar h-2.5 rounded bg-gray-200">
            <div className="progress-fill h-2.5 rounded bg-gradient-to-r from-amber-400 to-amber-500" style={{ width: '60%' }} />
          </div>
          <p className="text-sm mt-2 opacity-80">完成今日任务获得小星星奖励!</p>
        </div>
      </header>

      <div className="px-0 -mt-10">
        <div className="bg-white p-5 rounded-2xl shadow-md mb-6">
          <div className="flex items-center">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mr-4" />
            <div>
              <h2 className="font-bold text-lg">小明, 你好!</h2>
              <p className="text-gray-600 text-sm">你已经有<span className="font-bold text-accent">12</span>颗小星星了</p>
            </div>
          </div>
          <div className="mt-4 bg-blue-50 p-3 rounded-lg border border-blue-100">
            <p className="text-sm text-blue-800"><i className="fas fa-info-circle mr-2" />今日任务: 完成3个专注力训练游戏</p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-xl text-gray-800">训练游戏</h2>
          <Link to="/games" className="text-primary text-sm font-medium">查看全部 <i className="fas fa-chevron-right ml-1" /></Link>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <Link to="/games#focus" className="game-card">
            <div className="bg-white rounded-2xl overflow-hidden">
              <div className="h-28 bg-gradient-to-r from-cyan-400 to-blue-500 relative">
                <div className="absolute top-3 left-3 bg-white bg-opacity-30 rounded-full w-10 h-10 flex items-center justify-center">
                  <i className="fas fa-bullseye text-white text-xl" />
                </div>
                <div className="absolute bottom-3 right-3 bg-white text-primary rounded-full px-2 py-1 text-xs font-bold">注意力</div>
              </div>
              <div className="p-3">
                <h3 className="font-bold text-gray-800 mb-1">专注目标</h3>
                <p className="text-xs text-gray-500">找出移动的目标物</p>
                <div className="flex items-center mt-2">
                  <i className="fas fa-star text-yellow-400 text-xs mr-1" />
                  <span className="text-xs text-gray-500">+3 星星</span>
                </div>
              </div>
            </div>
          </Link>

          <Link to="/games#memory" className="game-card">
            <div className="bg-white rounded-2xl overflow-hidden">
              <div className="h-28 bg-gradient-to-r from-purple-400 to-indigo-500 relative">
                <div className="absolute top-3 left-3 bg-white bg-opacity-30 rounded-full w-10 h-10 flex items-center justify-center">
                  <i className="fas fa-brain text-white text-xl" />
                </div>
                <div className="absolute bottom-3 right-3 bg-white text-purple-600 rounded-full px-2 py-1 text-xs font-bold">记忆力</div>
              </div>
              <div className="p-3">
                <h3 className="font-bold text-gray-800 mb-1">记忆大师</h3>
                <p className="text-xs text-gray-500">记住出现的图案顺序</p>
                <div className="flex items-center mt-2">
                  <i className="fas fa-star text-yellow-400 text-xs mr-1" />
                  <span className="text-xs text-gray-500">+2 星星</span>
                </div>
              </div>
            </div>
          </Link>

          <Link to="/games#reaction" className="game-card">
            <div className="bg-white rounded-2xl overflow-hidden">
              <div className="h-28 bg-gradient-to-r from-green-400 to-teal-500 relative">
                <div className="absolute top-3 left-3 bg-white bg-opacity-30 rounded-full w-10 h-10 flex items-center justify-center">
                  <i className="fas fa-bolt text-white text-xl" />
                </div>
                <div className="absolute bottom-3 right-3 bg-white text-green-600 rounded-full px-2 py-1 text-xs font-bold">反应力</div>
              </div>
              <div className="p-3">
                <h3 className="font-bold text-gray-800 mb-1">快速反应</h3>
                <p className="text-xs text-gray-500">在正确时间点击目标</p>
                <div className="flex items-center mt-2">
                  <i className="fas fa-star text-yellow-400 text-xs mr-1" />
                  <span className="text-xs text-gray-500">+2 星星</span>
                </div>
              </div>
            </div>
          </Link>

          <Link to="/games#flexibility" className="game-card">
            <div className="bg-white rounded-2xl overflow-hidden">
              <div className="h-28 bg-gradient-to-r from-amber-400 to-orange-500 relative">
                <div className="absolute top-3 left-3 bg-white bg-opacity-30 rounded-full w-10 h-10 flex items-center justify-center">
                  <i className="fas fa-random text-white text-xl" />
                </div>
                <div className="absolute bottom-3 right-3 bg-white text-amber-600 rounded-full px-2 py-1 text-xs font-bold">灵活性</div>
              </div>
              <div className="p-3">
                <h3 className="font-bold text-gray-800 mb-1">转换挑战</h3>
                <p className="text-xs text-gray-500">根据规则快速切换任务</p>
                <div className="flex items-center mt-2">
                  <i className="fas fa-star text-yellow-400 text-xs mr-1" />
                  <span className="text-xs text-gray-500">+4 星星</span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="bg-gradient-to-r from-primary to-secondary text-white p-5 rounded-2xl mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="font-bold text-xl mb-1">每日训练计划</h2>
              <p className="opacity-80 text-sm">个性化训练，科学提升专注力</p>
            </div>
            <div className="bg-white text-primary rounded-full px-3 py-1 text-sm font-bold">进行中</div>
          </div>
          <div className="bg-white bg-opacity-20 p-4 rounded-xl">
            <div className="flex justify-between mb-3">
              <div>
                <h3 className="font-bold">今日任务</h3>
                <p className="text-sm opacity-90">完成3个训练游戏</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">1<span className="text-lg">/3</span></p>
                <p className="text-xs opacity-80">已完成</p>
              </div>
            </div>
            <div className="flex justify-between text-xs">
              <div><i className="fas fa-check-circle text-success mr-1" /><span>专注目标</span></div>
              <div className="opacity-50"><i className="far fa-circle mr-1" /><span>记忆大师</span></div>
              <div className="opacity-50"><i className="far fa-circle mr-1" /><span>快速反应</span></div>
            </div>
          </div>
          <button onClick={onStart} className="w-full bg-white text-primary py-3 rounded-xl font-bold mt-4 shadow-md">继续训练</button>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-md mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-xl text-gray-800">我的成就</h2>
            <Link to="/achievements" className="text-primary text-sm font-medium">查看全部</Link>
          </div>
          <div className="flex overflow-x-auto pb-4 space-x-4 -mx-1 px-1">
            <div className="flex flex-col items-center min-w-max">
              <div className="w-16 h-16 rounded-full bg-amber-50 border-2 border-amber-300 flex items-center justify-center">
                <i className="fas fa-medal text-amber-400 text-2xl" />
              </div>
              <p className="text-xs font-medium mt-2">专注小达人</p>
            </div>
            <div className="flex flex-col items-center min-w-max">
              <div className="w-16 h-16 rounded-full bg-blue-50 border-2 border-blue-300 flex items-center justify-center">
                <i className="fas fa-fire text-blue-400 text-2xl" />
              </div>
              <p className="text-xs font-medium mt-2">7天连胜</p>
            </div>
            <div className="flex flex-col items-center min-w-max">
              <div className="w-16 h-16 rounded-full bg-purple-50 border-2 border-purple-300 flex items-center justify-center">
                <i className="fas fa-infinity text-purple-400 text-2xl" />
              </div>
              <p className="text-xs font-medium mt-2">记忆大师</p>
            </div>
            <div className="flex flex-col items-center min-w-max">
              <div className="w-16 h-16 rounded-full bg-gray-100 border-2 border-gray-300 flex items-center justify-center opacity-40">
                <i className="fas fa-crown text-gray-300 text-2xl" />
              </div>
              <p className="text-xs font-medium mt-2 text-gray-400">超级星星</p>
            </div>
          </div>
        </div>
      </div>

      <button onClick={() => navigate('/games')} className="fixed bottom-20 right-5 w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white floating-btn">
        <i className="fas fa-play text-xl" />
      </button>
    </main>
  );
};

export default Home;


