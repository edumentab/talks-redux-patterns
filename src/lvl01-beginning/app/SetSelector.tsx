import React, { FunctionComponent, useCallback, useState, useMemo } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { setCurrentSet, AppState } from '../redux'

import { MenuItem, Classes, Icon, Button } from '@blueprintjs/core'
import { Select } from '@blueprintjs/select'

import { Set } from '../services/rebrickable/types'

export const SetSelector: FunctionComponent = () => {
  const dispatch = useDispatch()

  const { currentSetId, setsState, currentThemeId } = useSelector(
    (state: AppState) => ({
      currentSetId: state.ui.currentSetId,
      currentThemeId: state.ui.currentThemeId,
      setsState: state.rebrickable.setsByTheme[state.ui.currentThemeId!] || {}
    })
  )

  const setsArray = useMemo(
    () =>
      Object.values(setsState.data || {}).sort((a, b) =>
        a.name < b.name ? -1 : 1
      ),
    [setsState]
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
        />
      )
    },
    [currentSetId]
  )

  const [query, setQuery] = useState('')

  return (
    <Select
      items={setsArray.filter(t => t.name.match(query))}
      itemRenderer={renderItem}
      onItemSelect={set => dispatch(setCurrentSet(set.set_num))}
      popoverProps={{ minimal: true }}
      onQueryChange={setQuery}
    >
      <Button
        disabled={setsState.loading || !setsState.data}
        text={
          !currentThemeId
            ? 'Select theme first'
            : setsState.loading || !setsState.data
            ? '...loading sets for theme...'
            : currentSetId
            ? setsState.data[currentSetId].name
            : 'Select a set'
        }
        rightIcon="double-caret-vertical"
        className="setSelector"
      />
    </Select>
  )
}
