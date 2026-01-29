import { Accessibility } from '../model/types';
import React from 'react';

export const ACCESSIBILITY_TEXT: Record<Accessibility, string> = {
  [Accessibility.VISUAL]: 'Нарушение зрения',
  [Accessibility.HEARING]: 'Нарушение слуха',
  [Accessibility.MOTOR]: 'Нарушение двигательных функций',
  [Accessibility.COGNITIVE]: 'Нарушение когнитивных способностей',
  [Accessibility.SPEECH]: 'Нарушение речи',
  [Accessibility.SENSORY]: 'Сенсорные нарушения',
  [Accessibility.TEMPORARY]: 'Временные ограничения',
  [Accessibility.SITUATIONAL]: 'Ситуационные ограничения',
  [Accessibility.MULTIPLE]: 'Множественные нарушения',
};

export const ACCESSIBILITY_DESCRIPTIONS: Record<Accessibility, string> = {
  [Accessibility.VISUAL]: 'Для людей с нарушениями зрения',
  [Accessibility.HEARING]: 'Для людей с нарушениями слуха',
  [Accessibility.MOTOR]: 'Для людей с двигательными нарушениями',
  [Accessibility.COGNITIVE]: 'Для людей с когнитивными нарушениями',
  [Accessibility.SPEECH]: 'Для людей с нарушениями речи',
  [Accessibility.SENSORY]: 'Для людей с сенсорными особенностями',
  [Accessibility.TEMPORARY]: 'Для людей с временными ограничениями',
  [Accessibility.SITUATIONAL]: 'В ситуациях с ограниченными возможностями',
  [Accessibility.MULTIPLE]: 'Для людей с множественными нарушениями',
};

export const ACCESSIBILITY_CONFIG: Record<
  Accessibility,
  {
    icon: React.ReactNode;
    label: string;
    color: string;
  }
> = {
  [Accessibility.VISUAL]: {
    icon: '👁️',
    label: ACCESSIBILITY_DESCRIPTIONS[Accessibility.VISUAL],
    color: '#1890ff',
  },
  [Accessibility.HEARING]: {
    icon: '👂',
    label: ACCESSIBILITY_DESCRIPTIONS[Accessibility.HEARING],
    color: '#52c41a',
  },
  [Accessibility.MOTOR]: {
    icon: '♿',
    label: ACCESSIBILITY_DESCRIPTIONS[Accessibility.MOTOR],
    color: '#fa8c16',
  },
  [Accessibility.COGNITIVE]: {
    icon: '🧠',
    label: ACCESSIBILITY_DESCRIPTIONS[Accessibility.COGNITIVE],
    color: '#722ed1',
  },
  [Accessibility.SPEECH]: {
    icon: '🗣️',
    label: ACCESSIBILITY_DESCRIPTIONS[Accessibility.SPEECH],
    color: '#eb2f96',
  },
  [Accessibility.SENSORY]: {
    icon: '🌈',
    label: ACCESSIBILITY_DESCRIPTIONS[Accessibility.SENSORY],
    color: '#13c2c2',
  },
  [Accessibility.TEMPORARY]: {
    icon: '⏱️',
    label: ACCESSIBILITY_DESCRIPTIONS[Accessibility.TEMPORARY],
    color: '#fadb14',
  },
  [Accessibility.SITUATIONAL]: {
    icon: '🔄',
    label: ACCESSIBILITY_DESCRIPTIONS[Accessibility.SITUATIONAL],
    color: '#a0d911',
  },
  [Accessibility.MULTIPLE]: {
    icon: '👥',
    label: ACCESSIBILITY_DESCRIPTIONS[Accessibility.MULTIPLE],
    color: '#fa541c',
  },
};
