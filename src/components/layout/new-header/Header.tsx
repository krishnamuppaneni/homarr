import { Box, Flex, Group, Header, Text, UnstyledButton, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconAlertTriangle } from '@tabler/icons-react';
import Link from 'next/link';
import { useScreenLargerThan } from '~/hooks/useScreenLargerThan';

import { Logo } from '../Logo';
import { AvatarMenu } from './AvatarMenu';
import { Search } from './search';

type MainHeaderProps = {
  logoHref?: string;
  showExperimental?: boolean;
  headerActions?: React.ReactNode;
};

export const MainHeader = ({
  showExperimental = false,
  logoHref = '/',
  headerActions,
}: MainHeaderProps) => {
  const { breakpoints } = useMantineTheme();
  const isSmallerThanMd = useMediaQuery(`(max-width: ${breakpoints.sm})`);
  const experimentalHeaderNoteHeight = isSmallerThanMd ? 50 : 30;
  const headerHeight = showExperimental ? 60 + experimentalHeaderNoteHeight : 60;

  return (
    <Header height={headerHeight} pb="sm" pt={0}>
      <ExperimentalHeaderNote visible={showExperimental} height={experimentalHeaderNoteHeight} />
      <Group spacing="xl" mt="xs" px="md" position="apart" noWrap>
        <UnstyledButton component={Link} href={logoHref} style={{ flex: 1 }}>
          <Logo />
        </UnstyledButton>

        <Search />

        <Group noWrap style={{ flex: 1 }} position="right">
          <Group noWrap spacing={8}>
            {headerActions}
          </Group>
          <AvatarMenu />
        </Group>
      </Group>
    </Header>
  );
};

type ExperimentalHeaderNoteProps = {
  height?: 30 | 50;
  visible?: boolean;
};
const ExperimentalHeaderNote = ({ visible = false, height = 30 }: ExperimentalHeaderNoteProps) => {
  if (!visible) return null;

  return (
    <Box bg="red" h={height} p={3} px={6}>
      <Flex h="100%" align="center" columnGap={7}>
        <IconAlertTriangle color="white" size="1rem" style={{ minWidth: '1rem' }} />
        <Text color="white" lineClamp={height === 30 ? 1 : 2}>
          This is an experimental feature of Homarr. Please report any issues to the official Homarr
          team.
        </Text>
      </Flex>
    </Box>
  );
};