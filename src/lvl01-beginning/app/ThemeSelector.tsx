import React, { FunctionComponent, useCallback, useState, useMemo } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { setCurrentTheme, AppState } from '../redux'

import { MenuItem, Classes, Icon, Button } from '@blueprintjs/core'
import { Select } from '@blueprintjs/select'

import { Theme } from '../services/rebrickable/types'

export const ThemeSelector: FunctionComponent = () => {
  const dispatch = useDispatch()

  const { themes, isLoadingThemes, currentThemeId } = useSelector(
    (state: AppState) => ({
      isLoadingThemes: state.rebrickable.themes.loading,
      themes: state.rebrickable.themes.data,
      currentThemeId: state.ui.currentThemeId
    })
  )

  const themesArray = useMemo(
    () =>
      Object.values(themes || {}).sort((a, b) => (a.name < b.name ? -1 : 1)),
    [themes]
  )

  const renderItem = useCallback(
    (option: Theme, { modifiers, handleClick }) => {
      const currentlySelected = currentThemeId === option.id
      return (
        <MenuItem
          className={`${Classes.TEXT_SMALL} theme_menu_item`}
          key={option.id}
          icon={
            <Icon icon={currentlySelected ? 'tick' : 'blank'} iconSize={10} />
          }
          active={modifiers.active}
          text={option.name}
          shouldDismissPopover={false}
          onClick={handleClick}
        />
      )
    },
    [currentThemeId]
  )

  const [query, setQuery] = useState('')

  return (
    <Select
      items={themesArray.filter(t => t.name.match(query))}
      itemRenderer={renderItem}
      onItemSelect={theme => dispatch(setCurrentTheme(theme.id))}
      popoverProps={{ minimal: true }}
      onQueryChange={setQuery}
    >
      <Button
        disabled={isLoadingThemes || !themes}
        text={
          isLoadingThemes || !themes
            ? '...loading themes...'
            : currentThemeId
            ? themes[currentThemeId].name
            : 'Select a theme'
        }
        rightIcon="double-caret-vertical"
        className="themeSelector"
      />
    </Select>
  )
}
