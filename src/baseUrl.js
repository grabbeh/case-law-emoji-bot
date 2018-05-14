import _ from 'lodash'

const baseUrl = () => {
  var num = _.random(0, 660).toString()
  if (num.length === 1) num = `000${num}`
  if (num.length === 2) num = `00${num}`
  if (num.length === 3) num = `0${num}`
  return `http://www.bailii.org/indices/all-cases-${num}.html`
}

export default baseUrl
