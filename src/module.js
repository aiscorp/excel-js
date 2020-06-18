console.log('module working')


async function f() {
  await Promise.resolve('async working!!!')
}

f().then(console.log)
