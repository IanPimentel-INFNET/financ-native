import { SafeAreaView } from 'react-native';

const Container = ({ children }: { children: React.ReactNode }) => {
  return <SafeAreaView className={containerClasses.container}>{children}</SafeAreaView>;
};

const containerClasses = {
  container: 'flex flex-1',
};

export default Container;