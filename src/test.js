import { getTweet } from './tweet'

const test = async id => {
  try {
    let res = await getTweet(id)
    console.log(res)
  } catch (e) {
    console.log(e)
  }
}

test(770241796844691500)
