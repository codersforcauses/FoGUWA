import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import Footer from '@/components/other/Footer.vue'

const localVue = createLocalVue()

describe('Footer.vue', () => {
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })
  test('mount component', () => {
    const wrapper = mount(Footer, {
      localVue,
      vuetify
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
