import { apiHelper } from '../../utils/helpers'

export default {
  get() {
    return apiHelper.get('/?StartChapter=1&StartSection=1&Level=1')
  }
}
