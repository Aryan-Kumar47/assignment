import React, { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';

interface SafeAreaLayoutProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  edges?: Edge[];
}

const SafeAreaLayout = ({
  children,
  style,
  edges = ['top', 'bottom'],
}: SafeAreaLayoutProps) => {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={[{ backgroundColor: colors.background, flex:1 }, style]}
      edges={edges}
    >
      {children}
    </SafeAreaView>
  );
};

export default SafeAreaLayout;
