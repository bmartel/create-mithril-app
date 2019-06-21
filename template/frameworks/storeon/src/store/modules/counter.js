export default ({ count = 0 } = {}) => store => {
  store.on('@init', () => ({ count }))
  store.on('counter/add', model => ({ count: model.count + 1 }))
}
