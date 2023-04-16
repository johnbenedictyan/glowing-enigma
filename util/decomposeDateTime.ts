export const decomposeDateTime = (input: string) => {
  let parsedInput: Date = new Date(input)
  let day = ''
  switch (parsedInput.getDay()) {
    case 0:
      day = 'Sun'
      break
    case 1:
      day = 'Mon'
      break
    case 2:
      day = 'Tues'
      break
    case 3:
      day = 'Weds'
      break
    case 4:
      day = 'Thurs'
      break
    case 5:
      day = 'Fri'
      break
    case 6:
      day = 'Sat'
      break
    default:
      throw Error('Invalid Day')
  }

  return {
    day,
    time: parsedInput.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }),
  }
}
