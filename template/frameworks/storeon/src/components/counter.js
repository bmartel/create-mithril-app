import m from 'mithril'
import { connect } from '@/store/store'

const Counter = {
  view(vnode) {
    const { $dispatch, count } = vnode.attrs

    return m('.flex.w-full.justify-center.mt-4', [
      m('.w-1/3.flex.flex-col.items-center', [
        m('h1', `${count} clicked`),
        m(
          'button.border.py-2.px-3.my-3.hover:bg-grey-light.rounded',
          { onclick: () => $dispatch('counter/add') },
          'click me'
        ),
        m('p', m(m.route.Link , { href: '/' }, ['Home '])),
      ]),
    ])
  },
}

export default connect('count')(Counter)
