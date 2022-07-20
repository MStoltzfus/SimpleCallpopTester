import { TextField, Stack } from '@fluentui/react/';

export const TextFieldStyledExample: React.FunctionComponent = () => {
  return (
    <Stack tokens={{ childrenGap: 15 }}>
      <TextField label="Custom styled TextField" />
    </Stack>
  );
};

export { }