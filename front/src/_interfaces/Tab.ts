import { Component } from 'vue';

export interface Tab {
  type: string;
  title: string;
  icon: string;
  active: boolean;
  content: Component;
}
