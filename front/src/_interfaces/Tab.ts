import { Component } from 'vue';

export interface Tab {
  title: string;
  icon: string;
  active: boolean;
  content: Component;
}
