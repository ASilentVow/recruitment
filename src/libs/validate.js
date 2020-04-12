export const phoneValidate = (rule, value, callback) => {
  const reg = /^1(3|4|5|6|7|8|9)\d{9}$/
  if (value && !reg.test(value)) {
    callback('电话格式错误');
  } else {
    callback();
  }
}

export const emailValidate = (rule, value, callback) => {
  const reg = /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/
  if (value && !reg.test(value)) {
    callback('邮箱格式错误');
  } else {
    callback();
  }
}
