// export function ORIGINALemailValidator(email) {
//   const re = /\S+@\S+\.\S+/
//   if (!email) return "Email can't be empty."
//   if (!re.test(email)) return 'Ooops! We need a valid email address.'
//   return ''
// }

export function usernameValidator(uname) {
  //const re = /\S+@\S+\.\S+/
  if (!uname) return "Полето е задължително."
  //if (!re.test(email)) return 'Ooops! We need a valid email address.'
  return ''
}