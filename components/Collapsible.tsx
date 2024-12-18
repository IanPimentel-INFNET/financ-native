import Ionicons from '@expo/vector-icons/Ionicons';
import { PropsWithChildren, ReactNode, useState } from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme, View } from 'react-native';

export function Collapsible({ children, title }: PropsWithChildren & { title: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? 'light';

  return (
    <View>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}>
        <Ionicons
          name={isOpen ? 'chevron-down' : 'chevron-forward-outline'}
          size={18}
        />
        {title}
      </TouchableOpacity>
      {isOpen && <View>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
});
