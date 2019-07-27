import m from 'mithril'
import stream from 'mithril/stream'
import Mitts from 'mitts'
import Loading from '@/components/loading'
import { store } from '@/store'
import { text } from '@/segments'

const LoadableLogo = Mitts({
  loader: () => import('@/components/logo'),
  loading: Loading,
  delay: 300, // 0.3 seconds
  m,
  stream,
})

const title = { id: 'title', value: 'Mithril + Mirtx' }

store.reactive(text, title)

const updateTitle = newTitle => (title.value = newTitle)

const Home = {
  view() {
    return m('.flex.w-full.justify-center.mt-4', [
      m('.mx-4.w-full.sm:w-1/2.md:w-1/3.flex.flex-col.items-center', [
        m(LoadableLogo),
        m('h1', title.value),
        m('input.w-full.border.py-2.px-3.my-3', {
          oninput: e => updateTitle(e.target.value),
          value: title.value,
        }),
        m('p.w-full.flex.justify-end', m(m.route.Link, { href: '/counter' }, ['Counter '])),
      ]),
    ])
  },
}

export default Home
