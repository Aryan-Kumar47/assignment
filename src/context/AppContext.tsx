import React, { createContext, useContext, useState, ReactNode } from 'react';
export interface User {
  email: string;
  username: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  image: string;
}

interface AppContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  employees: Employee[];
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
}

const defaultUser: User = {
  email: 'john@gmail.com',
  username: 'John',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(defaultUser);
  const [employees, setEmployees] = useState<Employee[]>([]);

  return (
    <AppContext.Provider value={{ user, setUser, employees, setEmployees }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
