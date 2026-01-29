import React from 'react';
import { Avatar, Card, Space, Tag, Typography } from 'antd';
import { CalendarOutlined, UserOutlined } from '@ant-design/icons';
import { Comment } from '../model/types';

const { Text, Paragraph } = Typography;

interface CommentCardProps {
  comment: Comment;
  showPlaceInfo?: boolean;
  placeName?: string;
  compact?: boolean;
}

export const CommentCard: React.FC<CommentCardProps> = ({
  comment,
  showPlaceInfo = false,
  placeName,
  compact = false,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (compact) {
    return (
      <Card
        size="small"
        style={{
          marginBottom: 8,
          borderRadius: 8,
          border: '1px solid #f0f0f0',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
        }}
        bodyStyle={{ padding: '12px' }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <Avatar
            aria-hidden={true}
            size="small"
            style={{
              backgroundColor: '#1890ff',
              flexShrink: 0,
              fontSize: '12px',
            }}
          >
            {getInitials(comment.author)}
          </Avatar>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
              <Text strong style={{ fontSize: '13px', marginRight: 8 }}>
                {comment.author}
              </Text>
              <Text type="secondary" style={{ fontSize: '11px' }}>
                <CalendarOutlined aria-hidden={true} style={{ marginRight: 4, fontSize: '10px' }} />
                {formatDate(comment.date)}
              </Text>
            </div>

            <Paragraph
              style={{
                margin: 0,
                fontSize: '13px',
                lineHeight: 1.4,
              }}
              ellipsis={{ rows: 2 }}
            >
              {comment.body}
            </Paragraph>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card
      style={{
        marginBottom: 16,
        borderRadius: 12,
        border: '1px solid #f0f0f0',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
        overflow: 'hidden',
      }}
      bodyStyle={{ padding: 0 }}
    >
      <div style={{ padding: '20px 24px', borderBottom: '1px solid #f0f0f0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Space size={12} align="start">
            <Avatar
              size="large"
              style={{
                backgroundColor: '#1890ff',
                boxShadow: '0 2px 4px rgba(24, 144, 255, 0.2)',
              }}
              icon={<UserOutlined />}
            >
              {getInitials(comment.author)}
            </Avatar>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                <Text strong style={{ fontSize: '16px', marginRight: 8 }}>
                  {comment.author}
                </Text>
                <Text type="secondary" style={{ fontSize: '14px' }}>
                  <CalendarOutlined style={{ marginRight: 6, fontSize: '12px' }} />
                  {formatDate(comment.date)}
                </Text>
              </div>

              {showPlaceInfo && placeName && (
                <div style={{ marginBottom: 8 }}>
                  <Tag color="blue" style={{ fontSize: '12px' }}>
                    Место: {placeName}
                  </Tag>
                </div>
              )}
            </div>
          </Space>
        </div>
      </div>

      <div style={{ padding: '20px 24px' }}>
        <Paragraph
          style={{
            margin: 0,
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#333',
          }}
        >
          {comment.body}
        </Paragraph>
      </div>
    </Card>
  );
};
