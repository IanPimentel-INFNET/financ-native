import { forwardRef } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

type ButtonProps = {
  title: string;
} & TouchableOpacityProps;

export const Button = forwardRef<View, ButtonProps>(({ title, ...touchableProps }, ref) => {
  return (
    <TouchableOpacity
      ref={ref}
      {...touchableProps}
      className={`${buttonClasses.button} ${touchableProps.className}`}>
      <Text className={buttonClasses.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
});

const buttonClasses = {
  button: 'items-center bg-indigo-500 rounded-md shadow-md p-2',
  buttonText: 'text-white text-lg font-semibold text-center',
};
