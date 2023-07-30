import { Button, Card, Flex, Group, PasswordInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { IconArrowLeft, IconArrowRight, IconPassword } from '@tabler/icons-react';
import { z } from 'zod';

interface CreateAccountSecurityStepProps {
  nextStep: ({ password }: { password: string }) => void;
  prevStep: () => void;
}

export const CreateAccountSecurityStep = ({
  nextStep,
  prevStep,
}: CreateAccountSecurityStepProps) => {
  const form = useForm({
    initialValues: {
      password: '',
    },
    validateInputOnBlur: true,
    validateInputOnChange: true,
    validate: zodResolver(createAccountSecurityStepValidationSchema),
  });

  return (
    <Card mih={400}>
      <Flex columnGap={10}>
        <PasswordInput
          icon={<IconPassword size="0.8rem" />}
          label="Password"
          variant="filled"
          mb="md"
          withAsterisk
          style={{
            flexGrow: 1,
          }}
          {...form.getInputProps('password')}
        />
        <Button
          onClick={() => {
            form.setFieldValue('password', randomString());
          }}
        >
          Generate random
        </Button>
      </Flex>

      <Group position="apart" noWrap>
        <Button leftIcon={<IconArrowLeft size="1rem" />} onClick={prevStep} variant="light" px="xl">
          Previous
        </Button>
        <Button
          rightIcon={<IconArrowRight size="1rem" />}
          onClick={() => {
            nextStep({
              password: form.values.password,
            });
          }}
          variant="light"
          px="xl"
          disabled={!form.isValid()}
        >
          Next
        </Button>
      </Group>
    </Card>
  );
};

const randomString = () => {
  return window.crypto.getRandomValues(new BigUint64Array(1))[0].toString(36);
};

export const createAccountSecurityStepValidationSchema = z.object({
  password: z.string().min(10).max(50),
});