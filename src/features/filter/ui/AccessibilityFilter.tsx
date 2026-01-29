import React from 'react';
import { Checkbox, Col, Row, Space, Typography } from 'antd';
import { Accessibility } from '../../../entities/accessibility/model/types';
import { ACCESSIBILITY_TEXT } from '../../../entities/accessibility/constants';

const { Text } = Typography;

interface Props {
  selectedAccessibilities: Accessibility[];
  onChange: (accessibilities: Accessibility[]) => void;
  compact?: boolean;
}

export const AccessibilityFilter: React.FC<Props> = ({
  selectedAccessibilities,
  onChange,
  compact = false,
}) => {
  const allAccessibilities = Object.values(Accessibility);

  const handleToggle = (type: Accessibility) => {
    if (selectedAccessibilities.includes(type)) {
      onChange(selectedAccessibilities.filter((t) => t !== type));
    } else {
      onChange([...selectedAccessibilities, type]);
    }
  };

  const getAccessibilityIcon = (type: Accessibility): string => {
    const icons: Record<Accessibility, string> = {
      [Accessibility.VISUAL]: '👁️',
      [Accessibility.HEARING]: '👂',
      [Accessibility.MOTOR]: '♿',
      [Accessibility.COGNITIVE]: '🧠',
      [Accessibility.SPEECH]: '🗣️',
      [Accessibility.SENSORY]: '🌈',
      [Accessibility.TEMPORARY]: '⏱️',
      [Accessibility.SITUATIONAL]: '🔄',
      [Accessibility.MULTIPLE]: '👥',
    };
    return icons[type] || '♿';
  };

  const getAccessibilityColor = (type: Accessibility): string => {
    const colors: Record<Accessibility, string> = {
      [Accessibility.VISUAL]: '#1890ff',
      [Accessibility.HEARING]: '#52c41a',
      [Accessibility.MOTOR]: '#fa8c16',
      [Accessibility.COGNITIVE]: '#722ed1',
      [Accessibility.SPEECH]: '#eb2f96',
      [Accessibility.SENSORY]: '#13c2c2',
      [Accessibility.TEMPORARY]: '#fadb14',
      [Accessibility.SITUATIONAL]: '#a0d911',
      [Accessibility.MULTIPLE]: '#fa541c',
    };
    return colors[type] || '#d9d9d9';
  };

  return (
    <div>
      {compact ? (
        <Space direction="vertical" size={8} style={{ width: '100%' }}>
          {allAccessibilities.map((type) => {
            const isSelected = selectedAccessibilities.includes(type);
            return (
              <div
                key={type}
                onClick={() => handleToggle(type)}
                style={{
                  padding: '8px 12px',
                  border: `2px solid ${isSelected ? getAccessibilityColor(type) : '#f0f0f0'}`,
                  borderRadius: 8,
                  backgroundColor: isSelected ? `${getAccessibilityColor(type)}15` : '#fff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s',
                }}
                role={'button'}
                aria-label={`Фильтрация для ${type}`}
              >
                <Space>
                  <span style={{ fontSize: 20 }}>{getAccessibilityIcon(type)}</span>
                  <div>
                    <Text aria-hidden={true} strong style={{ fontSize: 12 }}>
                      {ACCESSIBILITY_TEXT[type]}
                    </Text>
                  </div>
                </Space>

                <Checkbox checked={isSelected} style={{ pointerEvents: 'none' }} />
              </div>
            );
          })}
        </Space>
      ) : (
        <Row gutter={[8, 16]}>
          {allAccessibilities.map((type) => {
            const isSelected = selectedAccessibilities.includes(type);
            const accessibilityText = ACCESSIBILITY_TEXT[type];

            return (
              <Col xs={12} sm={8} md={6} key={type} style={{ minHeight: '100px' }}>
                <div
                  onClick={() => handleToggle(type)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleToggle(type);
                    }
                  }}
                  style={{
                    padding: 12,
                    border: `2px solid ${isSelected ? getAccessibilityColor(type) : '#f0f0f0'}`,
                    borderRadius: 8,
                    backgroundColor: isSelected ? `${getAccessibilityColor(type)}15` : '#fff',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.2s',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxSizing: 'border-box',
                  }}
                  tabIndex={1}
                  role="button"
                  aria-label={`${accessibilityText}. ${isSelected ? 'Выбрано' : 'Не выбрано'}`}
                  title={accessibilityText}
                >
                  <div
                    style={{
                      fontSize: 24,
                      marginBottom: 8,
                      height: '30px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {getAccessibilityIcon(type)}
                  </div>
                  <Text
                    aria-hidden={true}
                    strong
                    style={{
                      fontSize: 11,
                      color: isSelected ? getAccessibilityColor(type) : '#333',
                      lineHeight: 1.2,
                      textAlign: 'center',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      width: '100%',
                      minHeight: '28px',
                    }}
                  >
                    {accessibilityText.split(' ')[0]}
                  </Text>

                  {accessibilityText.split(' ').length > 1 && (
                    <Text
                      aria-hidden={true}
                      style={{
                        fontSize: 10,
                        color: isSelected ? getAccessibilityColor(type) : '#666',
                        lineHeight: 1.2,
                        marginTop: 2,
                        textAlign: 'center',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        width: '100%',
                        minHeight: '22px',
                      }}
                    >
                      {accessibilityText.split(' ').slice(1).join(' ')}
                    </Text>
                  )}
                </div>
              </Col>
            );
          })}
        </Row>
      )}
    </div>
  );
};
