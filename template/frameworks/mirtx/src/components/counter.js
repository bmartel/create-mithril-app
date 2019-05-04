import m from 'mithril'
import { store } from '@/store'
import { number } from '@/segments'

const count = { id: 'count', value: 0 }

store.reactive(number, count)

const addCount = () => count.value++

const Counter = {
  view() {
    return m('.flex.w-full.justify-center.mt-4', [
      m('.w-1/3.flex.flex-col.items-center', [
        m('h1', `${count.value} clicked`),
        m('button.border.py-2.px-3.my-3.hover:bg-grey-light.rounded', { onclick: addCount }, 'click me'),
        m('p', m('a', { href: '/', oncreate: m.route.link }, ['Home '])),
      ]),
    ])
  },
}

export default Counter
