import { Text, Title } from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import { useCallback } from 'react';
import { Trans } from 'react-i18next';
import { api } from '~/utils/api';

type MoveAndResizeItem = {
  itemId: string;
  x: number;
  y: number;
  width: number;
  height: number;
};
type MoveItemToSection = {
  itemId: string;
  sectionId: string;
  x: number;
  y: number;
  width: number;
  height: number;
};
type RemoveItem = {
  itemId: string;
};

export const useItemActions = ({ boardName }: { boardName: string }) => {
  const utils = api.useContext();
  const moveAndResizeItem = useCallback(
    ({ itemId, ...positionProps }: MoveAndResizeItem) => {
      console.log(itemId, positionProps);
      utils.boards.byName.setData({ boardName }, (prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          sections: prev.sections.map((section) => {
            // Return same section if item is not in it
            if (!section.items.some((item) => item.id === itemId)) return section;
            return {
              ...section,
              items: section.items.map((item) => {
                // Return same item if item is not the one we're moving
                if (item.id !== itemId) return item;
                return {
                  ...item,
                  ...positionProps,
                };
              }),
            };
          }),
        };
      });
    },
    [boardName, utils]
  );

  const moveItemToSection = useCallback(
    ({ itemId, sectionId, ...positionProps }: MoveItemToSection) => {
      console.log('moveItemToSection', itemId, sectionId, positionProps);
      utils.boards.byName.setData({ boardName }, (prev) => {
        if (!prev) return prev;

        const currentSection = prev.sections.find((section) =>
          section.items.some((item) => item.id === itemId)
        );

        // If item is in the same section (on initial loading) don't do anything
        if (!currentSection || currentSection.id === sectionId) {
          console.log('Current section is undefined or same as target section');
          return prev;
        }

        let currentItem = currentSection?.items.find((item) => item.id === itemId);
        if (!currentItem) {
          console.log('Current item is undefined');
          return prev;
        }

        return {
          ...prev,
          sections: prev.sections.map((section) => {
            // Return sections without item if not section where it is moved to
            if (section.id !== sectionId)
              return {
                ...section,
                items: section.items.filter((item) => item.id !== itemId),
              };

            // Return section and add item to it
            return {
              ...section,
              items: section.items.concat({
                ...currentItem!,
                ...positionProps,
              }),
            };
          }),
        };
      });
    },
    [boardName, utils]
  );

  const removeItem = useCallback(
    ({ itemId }: RemoveItem) => {
      utils.boards.byName.setData({ boardName }, (prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          // Filter removed item out of items array
          sections: prev.sections.map((section) => ({
            ...section,
            items: section.items.filter((item) => item.id !== itemId),
          })),
        };
      });
    },
    [boardName, utils]
  );

  return {
    moveAndResizeItem,
    moveItemToSection,
    removeItem,
  };
};

type OpenRemoveItemModalProps = {
  name: string;
  onConfirm: () => void;
};

export const openRemoveItemModal = ({ name, onConfirm }: OpenRemoveItemModalProps) => {
  openConfirmModal({
    title: (
      <Title order={4}>
        <Trans i18nKey="common:remove" />
      </Title>
    ),
    children: (
      <Trans
        i18nKey="common:removeConfirm"
        components={[<Text weight={500} />]}
        values={{ item: name }}
      />
    ),
    labels: {
      cancel: <Trans i18nKey="common:cancel" />,
      confirm: <Trans i18nKey="common:ok" />,
    },
    cancelProps: {
      variant: 'light',
    },
    onConfirm,
  });
};

/*
- Add category (on top, below, above)
- Rename category
- Move category (down & up)
- Remove category
- Add widget
- Edit widget
- Remove widget
- Add app
- Edit app
- Remove app
*/
