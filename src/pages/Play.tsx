import React, { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import Phaser from 'phaser';

const Play: React.FC = () => {
  const { gameId } = useParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const phaserRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    class BaseScene extends Phaser.Scene {
      private title!: string;
      constructor(key: string, title: string) { super(key); this.title = title; }
      create() {
        const { width, height } = this.scale;
        this.add.rectangle(width/2, height/2, width-40, height-200, 0xffffff, 1).setStrokeStyle(2, 0xdddddd);
        this.add.text(width/2, height/2 - 40, this.title, { fontFamily: 'Arial', fontSize: '28px', color: '#111' }).setOrigin(0.5);
        this.add.text(width/2, height/2 + 10, '示例场景占位，稍后可替换为完整玩法', { fontFamily: 'Arial', fontSize: '14px', color: '#555' }).setOrigin(0.5);
        const btn = this.add.rectangle(width/2, height/2 + 70, 140, 44, 0x4F46E5).setInteractive({ useHandCursor: true });
        this.add.text(width/2, height/2 + 70, '开始训练', { fontFamily: 'Arial', fontSize: '16px', color: '#fff' }).setOrigin(0.5);
        btn.on('pointerdown', () => {
          const score = Math.floor(Math.random()*100);
          alert(`训练完成！得分 ${score}`);
        });
      }
    }

    const scenes: Record<string, Phaser.Scene> = {
      'focus-target': new BaseScene('FocusTarget', '专注目标挑战'),
      'memory-master': new BaseScene('MemoryMaster', '记忆大师'),
      'quick-reaction': new BaseScene('QuickReaction', '快速反应'),
      'switch-challenge': new BaseScene('SwitchChallenge', '转换挑战'),
      'target-tracking': new BaseScene('TargetTracking', '目标追踪'),
    };

    const scene = scenes[gameId || 'focus-target'] || scenes['focus-target'];

    phaserRef.current = new Phaser.Game({
      type: Phaser.AUTO,
      width: 400,
      height: 700,
      parent: containerRef.current,
      backgroundColor: '#F9FAFB',
      scene: [scene],
    });

    return () => { phaserRef.current?.destroy(true); phaserRef.current = null; };
  }, [gameId]);

  return (
    <div className="bg-background min-h-screen">
      <div className="p-3 flex items-center">
        <Link to={-1 as any} className="p-2 rounded-full bg-white"><i className="fas fa-arrow-left" /></Link>
        <h1 className="ml-3 font-bold">游戏体验</h1>
      </div>
      <div className="w-full flex justify-center">
        <div ref={containerRef} className="w-[400px] h-[700px]" />
      </div>
    </div>
  );
};

export default Play;


