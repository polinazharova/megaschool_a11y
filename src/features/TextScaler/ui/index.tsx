import React, { useEffect, useState } from 'react';
import { Button, Space } from 'antd';
import { FontSizeOutlined } from '@ant-design/icons';

export const TextScaler: React.FC = () => {
  const [fontSize, setFontSize] = useState(100);

  useEffect(() => {
    const saved = localStorage.getItem('page-scale');
    if (saved) {
      const value = parseInt(saved, 10);
      if (!isNaN(value) && value >= 80 && value <= 150) {
        setFontSize(value);
      }
    }
  }, []);

  useEffect(() => {
    const scale = fontSize / 100;

    const root = document.documentElement;

    root.style.setProperty('--page-scale', scale.toString());

    document.body.style.zoom = `${scale}`;

    localStorage.setItem('page-scale', fontSize.toString());

    return () => {
      root.style.removeProperty('--page-scale');
    };
  }, [fontSize]);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 1000,
        background: '#fff',
        padding: '8px 12px',
        borderRadius: 6,
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <FontSizeOutlined aria-hidden={true} />
      <Space>
        <Button
          aria-label="Уменьшить размер текста"
          size="small"
          onClick={() => setFontSize((prev) => Math.max(80, prev - 10))}
          disabled={fontSize <= 80}
        >
          -
        </Button>
        <span style={{ minWidth: 40, textAlign: 'center' }}>{fontSize}%</span>
        <Button
          size="small"
          aria-label="Увеличить размер текста"
          onClick={() => setFontSize((prev) => Math.min(150, prev + 10))}
          disabled={fontSize >= 150}
        >
          +
        </Button>
        <Button
          size="small"
          aria-label="Сбросить увеличение текста"
          onClick={() => setFontSize(100)}
          disabled={fontSize === 100}
        >
          Сброс
        </Button>
      </Space>
    </div>
  );
};
