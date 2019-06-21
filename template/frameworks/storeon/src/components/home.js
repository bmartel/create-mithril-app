import m from 'mithril'
import stream from 'mithril/stream'
import Mitts from 'mitts'
import { connect } from '@/store/store'
import Loading from '@/components/loading'

const LoadableLogo = Mitts({
  loader: () => import('@/components/logo'),
  loading: Loading,
  delay: 300, // 0.3 seconds
  m,
  stream,
})

const Home = {
  view(vnode) {
    const { $dispatch, title } = vnode.attrs

    return m('.flex.w-full.justify-center.mt-4', [
      m('.mx-4.w-full.sm:w-1/2.md:w-1/3.flex.flex-col.items-center', [
        m(LoadableLogo),
        m('h1', title),
        m('input.w-full.border.py-2.px-3.my-3', {
          oninput: e => $dispatch('page/updateTitle', e.target.value),
          value: title,
        }),
        m('p.w-full.flex.justify-end', m('a', { href: '/counter', oncreate: m.route.link }, ['Counter '])),
      ]),
    ])
  },
}

export default connect('title')(Home)
