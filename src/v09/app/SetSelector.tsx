/* REFAC|EDITCOMMENT
The <span data-file-link="../redux/lib/types/action">basic <code>Action</code> shape</span> now contains a `.sender` property, so we switch to using the new <span data-file-link="./useDispatchWithSender"><code>useDispatchWithSender</code> hook</span> which will populate `.sender` correctly (this also means having to do a slight tweak to our <span data-file-link="./SetSelector.test">tests</span>).

The same change was made in <span data-file-link="./Guess"><code>Guess</code></span>, <span data-file-link="./Main"><code>Main</code></span>, <span data-file-link="./Theme"><code>Theme</code></span> and <span data-file-link="./ThemeSelector"><code>ThemeSelector</code></span>.
*/

import React, { FunctionComponent, useCallback, useState, useMemo } from 'react'

import { useSelector } from 'react-redux'
import {
  setCurrentSet,
  AppState,
  selectCurrentThemeSets,
  selectCurrentTheme
} from '../redux'

import { MenuItem, Classes, Icon, Button } from '@blueprintjs/core'
import { Select } from '@blueprintjs/select'

import { Set } from '../services/rebrickable/types'
import { useDispatchWithSender } from './useDispatchWithSender'

export const SetSelector: FunctionComponent = () => {
  const dispatch = useDispatchWithSender('SetSelector')

  const { currentSetId, sets, currentThemeId, themeName } = useSelector(
    (state: AppState) => ({
      ...state.ui,
      sets: selectCurrentThemeSets(state),
      themeName: selectCurrentTheme(state)!.name
    })
  )

  const setsArray = useMemo(
    () =>
      Object.values((sets && sets.data) || {}).sort((a, b) =>
        a.name < b.name ? -1 : 1
      ),
    [sets]
  )

  const renderItem = useCallback(
    (option: Set, { modifiers, handleClick }) => {
      const currentlySelected = currentSetId === option.set_num
      return (
        <MenuItem
          className={`${Classes.TEXT_SMALL} theme_menu_item`}
          key={option.set_num}
          icon={
            <Icon icon={currentlySelected ? 'tick' : 'blank'} iconSize={10} />
          }
          active={modifiers.active}
          text={option.name}
          shouldDismissPopover={false}
          onClick={handleClick}
          data-testid={`setselector-option-${option.set_num}`}
        />
      )
    },
    [currentSetId]
  )

  const [query, setQuery] = useState('')

  return (
    <Select
      items={setsArray.filter(t =>
        t.name.toLowerCase().match(query.toLowerCase())
      )}
      itemRenderer={renderItem}
      onItemSelect={set => dispatch(setCurrentSet(set.set_num))}
      popoverProps={{ minimal: true }}
      onQueryChange={setQuery}
    >
      <Button
        disabled={!setsArray.length}
        text={
          !currentThemeId
            ? 'Select theme first'
            : !sets || sets.loading || !sets.data
            ? `...loading sets for the ${themeName} theme...`
            : currentSetId
            ? sets.data[currentSetId].name
            : setsArray.length === 0
            ? `The ${themeName} theme has no sets!`
            : `Select a ${themeName} set`
        }
        rightIcon={setsArray.length ? 'double-caret-vertical' : 'blank'}
        className="setSelector"
        data-testid="setselectortrigger"
      />
    </Select>
  )
}
