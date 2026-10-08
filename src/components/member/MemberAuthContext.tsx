import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MemberAccount, MemberSkier, demoAccounts, createDynamicAccount } from '@/lib/memberData';

interface MemberAuthContextType {
  currentUser: MemberAccount | null;
  activeSkier: MemberSkier | null;
  isLoggedIn: boolean;
  login: (email: string) => boolean;
  logout: () => void;
  switchActiveSkier: (skierId: string) => void;
  demoAccounts: MemberAccount[];
}

const MemberAuthContext = createContext<MemberAuthContextType | undefined>(undefined);

const STORAGE_KEY = 'freeskiers_member_user_v1';
const ACTIVE_SKIER_KEY = 'freeskiers_active_skier_id_v1';

export const MemberAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<MemberAccount | null>(null);

  const [activeSkierId, setActiveSkierId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setCurrentUser(JSON.parse(saved));
      setActiveSkierId(localStorage.getItem(ACTIVE_SKIER_KEY));
    } catch {
      /* ignore */
    }
  }, []);

  // Calculate active skier based on currentUser and activeSkierId
  const activeSkier: MemberSkier | null = React.useMemo(() => {
    if (!currentUser || currentUser.skiers.length === 0) return null;
    if (activeSkierId) {
      const found = currentUser.skiers.find(s => s.id === activeSkierId);
      if (found) return found;
    }
    return currentUser.skiers[0] ?? null;
  }, [currentUser, activeSkierId]);

  const login = (email: string): boolean => {
    const cleanEmail = email.toLowerCase().trim();
    if (!cleanEmail) return false;

    // Check if it's one of the demo accounts
    let account = demoAccounts.find(a => a.email.toLowerCase() === cleanEmail);

    // If not, generate a dynamic valid account
    if (!account) {
      account = createDynamicAccount(cleanEmail);
    }

    setCurrentUser(account);
    if (account.skiers.length > 0) {
      setActiveSkierId(account.skiers[0]!.id);
      localStorage.setItem(ACTIVE_SKIER_KEY, account.skiers[0]!.id);
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(account));
    } catch (err) {
      console.error('Failed to save to localStorage', err);
    }

    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    setActiveSkierId(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(ACTIVE_SKIER_KEY);
    } catch (err) {
      console.error('Failed to clear localStorage', err);
    }
  };

  const switchActiveSkier = (skierId: string) => {
    if (!currentUser) return;
    const found = currentUser.skiers.find(s => s.id === skierId);
    if (found) {
      setActiveSkierId(skierId);
      try {
        localStorage.setItem(ACTIVE_SKIER_KEY, skierId);
      } catch (err) {
        console.error('Failed to save active skier', err);
      }
    }
  };

  return (
    <MemberAuthContext.Provider
      value={{
        currentUser,
        activeSkier,
        isLoggedIn: !!currentUser,
        login,
        logout,
        switchActiveSkier,
        demoAccounts
      }}
    >
      {children}
    </MemberAuthContext.Provider>
  );
};

export const useMemberAuth = (): MemberAuthContextType => {
  const context = useContext(MemberAuthContext);
  if (!context) {
    throw new Error('useMemberAuth must be used within a MemberAuthProvider');
  }
  return context;
};
