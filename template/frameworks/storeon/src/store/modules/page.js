export default ({ title = 'Mithril + Storeon' } = {}) => store => {
  store.on('@init', () => ({ title }))
  store.on('page/updateTitle', (model, newTitle) => ({ title: newTitle }))
}
