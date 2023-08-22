import { Button, Divider, Stack, Text, Title } from '@mantine/core';
import { IconArrowRight, IconExternalLink } from '@tabler/icons-react';

import { OnboardingStepWrapper } from './common-wrapper';

export const StepDocumentation = ({ next }: { next: () => void }) => {
  return (
    <OnboardingStepWrapper>
      <Title order={2} align="center" mb="lg">
        Documentation
      </Title>

      <Stack align="center">
        <Text>We highly encourage you to read the documentation, before you continue.</Text>
        <Button
          component="a"
          href="https://homarr.dev/docs/introduction/after-the-installation"
          target="_blank"
          rightIcon={<IconExternalLink size="1rem" />}
          variant="default"
        >
          Open documentation
        </Button>
        <Divider h={30} />
        <Button onClick={next} rightIcon={<IconArrowRight size="1rem" />} fullWidth>
          Finish
        </Button>
      </Stack>
    </OnboardingStepWrapper>
  );
};