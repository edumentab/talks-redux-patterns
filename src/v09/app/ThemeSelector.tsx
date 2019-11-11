/* REFAC|EDITCOMMENT
The <span data-file-link="../redux/lib/types/action">basic <code>Action</code> shape</span> now contains a `.sender` property, so we switch to using the new <span data-file-link="./useDispatchWithSender"><code>useDispatchWithSender</code> hook</span> which will populate `.sender` correctly (this also means having to do a slight tweak to our <span data-file-link="./ThemeSelector.test">tests</span>).

The same change was made in <span data-file-link="./Guess"><code>Guess</code></span>, <span data-file-link="./Main"><code>Main</code></span> and <span data-file-link="./SetSelector"><code>SetSelector</code></span>.
*/

import React, { FunctionComponent, useCallback, useState, useMemo } from 'react'

import { useSelector } from 'react-redux'
import { setCurrentTheme, AppState } from '../redux'

import { MenuItem, Classes, Icon, Button } from '@blueprintjs/core'
import { Select } from '@blueprintjs/select'

import { Theme } from '../services/rebrickable/types'
import { useDispatchWithSender } from './useDispatchWithSender'

export const ThemeSelector: FunctionComponent = () => {
  const dispatch = useDispatchWithSender('ThemeSelector')

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
          data-testid={`themeselector-option-${option.id}`}
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
        rightIcon={
          isLoadingThemes || !themes ? 'blank' : 'double-caret-vertical'
        }
        className="themeSelector"
        data-testid={`themeselectortrigger`}
      />
    </Select>
  )
}
