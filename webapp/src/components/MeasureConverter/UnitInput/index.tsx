import React, { useCallback, useState } from 'react'
import {
  // ComboBox,
  // ComboBoxInput,
  // ComboBoxList,
  // ComboBoxOption,
  IconChevronDown,
} from 'sancho'
import {
  ComboBox,
  ComboBoxInput,
  ComboBoxList,
  ComboBoxOption,
} from './ComboBox'
import { Unit } from '../units'
import styles from './styles'

export type UnitInputProps = {
  availableUnits: Unit[]

  value: Unit | null
  onChange: (unit: Unit | null) => void

  tabIndex?: number
}

export const UnitInput: React.FC<UnitInputProps> = ({
  availableUnits,

  value,
  onChange,

  tabIndex = 0,
}) => {
  const filterFromQuery = useCallback(
    (query: string) => {
      return availableUnits.filter((unit) => {
        return unit.labels.some((l) =>
          l.toLowerCase().includes(query.toLowerCase())
        )
      })
    },
    [availableUnits]
  )

  const [active, setActive] = useState(false)
  const [isDirty, setIsDirty] = useState(false)
  const [query, setQuery] = useState('')

  // Filter to whatever unit we may be in the progress of typing
  const filteredUnits = filterFromQuery(isDirty ? query : '')

  const getUnitResult = (
    query: string,
    strict: boolean = false,
    single: boolean = false
  ): Unit | null => {
    // Get matched unit
    if (query.length === 0) {
      return null
    } else {
      let possibleUnits = availableUnits

      if (strict) {
        possibleUnits = availableUnits.filter((u) => u.labels[0] === query)
      } else {
        possibleUnits = filterFromQuery(query)
      }

      if (possibleUnits.length > 0) {
        if (!single) {
          return possibleUnits[0]
        } else if (possibleUnits.length === 1) {
          return possibleUnits[0]
        }
      }

      return null
    }
  }

  return (
    <ComboBox
      query={active ? query : value?.labels[0] || ''}
      onQueryChange={(query) => {
        setQuery(query)
        setIsDirty(true)
        onChange(getUnitResult(query, false, true))
      }}
      onSelect={(value) => {
        const query = value || ''
        setQuery(query)
        onChange(getUnitResult(query, true, false))
      }}
    >
      <div
        css={styles.inputContainer}
        onBlur={() => {
          setActive(false)
          const unit = getUnitResult(query, false, false)
          setQuery(unit?.labels[0] || '')
          onChange(unit)
        }}
        onFocus={(event) => {
          setActive(true)
          setIsDirty(false)
          setQuery(value?.labels[0] || '')
          ;(event.target as any).select()
        }}
      >
        <ComboBoxInput
          onClick={(event) => (event.target as any).select()}
          aria-label="Unit input"
          placeholder="Unit"
          css={styles.comboBoxInput}
          tabIndex={tabIndex}
        />
        <div css={styles.inputArrow}>
          <IconChevronDown />
        </div>
      </div>
      <ComboBoxList css={styles.comboBoxList}>
        {filteredUnits.map((unit) => {
          return <ComboBoxOption key={unit.id} value={unit.labels[0]} />
        })}
      </ComboBoxList>
    </ComboBox>
  )
}
