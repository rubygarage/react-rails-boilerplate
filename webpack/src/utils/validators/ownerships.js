import { MIN_COOWNER_PART, MAX_COOWNER_PART, MAX_COOWNERS } from 'constants/validations'

export const validateOwnerships = (cardOwnerships, errors, formatMessage) => {
  errors.card_ownerships = []

  if (cardOwnerships) {
    const totalPart = cardOwnerships.reduce((acc, ownership) => acc + parseFloat(ownership.part), 0).toFixed(2)
    const negativeParts = cardOwnerships.find((ownership) => ownership.part < 0)

    if (negativeParts) {
      errors.card_ownerships.push({ message: formatMessage({ id: 'validation.negative_parts' }) })
    }

    if (totalPart > MAX_COOWNER_PART || totalPart < MIN_COOWNER_PART) {
      errors.card_ownerships.push({ message: formatMessage({ id: 'validation.percentage_part' }) })
    }

    if (cardOwnerships.length > MAX_COOWNERS) {
      errors.card_ownerships.push({
        message: formatMessage({ id: 'validation.coowners_count' }, { number: MAX_COOWNERS })
      })
    }

    if (cardOwnerships.some(ownership => isNaN(ownership.part))) {
      errors.card_ownerships.push({ message: formatMessage({ id: 'validation.invalid' }) })
    }
  }
}
