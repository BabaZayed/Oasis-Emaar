'use client';

import { create } from 'zustand';

interface PaywallStore {
  isRegistered: boolean;
  showPaywallModal: boolean;
  pendingAction: (() => void) | null;
  setShowPaywallModal: (show: boolean, pendingAction?: () => void) => void;
  register: () => void;
  checkRegistration: () => void;
}

export const usePaywallStore = create<PaywallStore>((set) => ({
  isRegistered: false,
  showPaywallModal: false,
  pendingAction: null,
  setShowPaywallModal: (show, pendingAction) => set({ showPaywallModal: show, pendingAction: pendingAction || null }),
  register: () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('oasis-registered', 'true');
    }
    set({ isRegistered: true, showPaywallModal: false });
  },
  checkRegistration: () => {
    if (typeof window !== 'undefined') {
      const registered = localStorage.getItem('oasis-registered') === 'true';
      set({ isRegistered: registered });
    }
  },
}));
