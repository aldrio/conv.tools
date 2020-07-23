import React, { useState, useMemo, useCallback } from 'react'
import { Input, InputGroup } from 'sancho'
import { UnitInput } from './UnitInput'
import Units, { Unit } from './units'
import styles from './styles'

export type MeasureConverterProps = {}

export const MeasureConverter: React.FC<MeasureConverterProps> = ({}) => {
  // From state
  const [fromAmount, setFromAmount] = useState('')
  const [fromUnit, setFromUnit] = useState<Unit | null>(null)

  // To state
  const [toAmount, setToAmount] = useState('')
  const [toUnit, setToUnit] = useState<Unit | null>(null)

  const toAvailableUnits = useMemo(
    () =>
      Array.from(Units.values()).filter((u) =>
        fromUnit === null ? true : u.kind === fromUnit.kind
      ),
    [fromUnit]
  )

  const triggerAutoFill = (
    fromAmount: string,
    setFromAmount: (value: string) => void,
    fromUnit: Unit | null,
    setFromUnit: (value: Unit | null) => void,

    toAmount: string,
    setToAmount: (value: string) => void,
    toUnit: Unit | null,
    setToUnit: (value: Unit | null) => void
  ) => {
    if (!fromUnit || !toUnit) {
      return
    }

    if (fromUnit.kind !== toUnit.kind) {
      setFromUnit(null)
      setFromAmount('')
      return
    }

    const fromAmountVal = parseFloat(fromAmount.trim())
    if (Number.isNaN(fromAmountVal)) {
      setToAmount('')
      return
    }

    let siVal
    if (typeof fromUnit.toSI === 'object') {
      siVal = fromUnit.toSI.to(fromAmountVal)
    } else {
      siVal = fromAmountVal * fromUnit.toSI
    }

    let val
    if (typeof toUnit.toSI === 'object') {
      val = toUnit.toSI.from(siVal)
    } else {
      val = siVal / toUnit.toSI
    }

    setToAmount(val.toString())
  }

  return (
    <div css={styles.measureConverter}>
      <InputGroup label="From" css={styles.measureColumn}>
        <Input
          autoFocus
          tabIndex={1}
          value={fromAmount}
          onChange={(e) => {
            setFromAmount(e.target.value)
            triggerAutoFill(
              e.target.value,
              setFromAmount,
              fromUnit,
              setFromUnit,
              toAmount,
              setToAmount,
              toUnit,
              setToUnit
            )
          }}
          css={styles.measureInput}
          inputSize="lg"
          size={1}
          placeholder="Amount"
        />
        <UnitInput
          availableUnits={Array.from(Units.values())}
          value={fromUnit}
          onChange={(unit) => {
            setFromUnit(unit)
            triggerAutoFill(
              toAmount,
              setToAmount,
              toUnit,
              setToUnit,
              fromAmount,
              setFromAmount,
              unit,
              setFromUnit
            )
          }}
          tabIndex={2}
        />
      </InputGroup>
      <InputGroup label="To" css={styles.measureColumn}>
        <Input
          tabIndex={toUnit === null ? 4 : 3}
          value={toAmount}
          onChange={(e) => {
            setToAmount(e.target.value)
            triggerAutoFill(
              e.target.value,
              setToAmount,
              toUnit,
              setToUnit,
              fromAmount,
              setFromAmount,
              fromUnit,
              setFromUnit
            )
          }}
          css={styles.measureInput}
          inputSize="lg"
          size={1}
          placeholder="Amount"
        />
        <UnitInput
          availableUnits={toAvailableUnits}
          value={toUnit}
          onChange={(unit) => {
            setToUnit(unit)
            triggerAutoFill(
              fromAmount,
              setFromAmount,
              fromUnit,
              setFromUnit,
              toAmount,
              setToAmount,
              unit,
              setToUnit
            )
          }}
          tabIndex={toUnit === null ? 3 : 4}
        />
      </InputGroup>
    </div>
  )
}

BigInt
