import { parse } from 'qs'
import { } from 'services/home'

import app from '../index'
const staffLocation =
  [{ "CID": "AA887723", "x": -110.52269734987887, "y": 36.97615385621954, "z": 0 },
    { "CID": "AA887723", "x": 28.580344548969464, "y": -43.59274506888002, "z": 0 },
    { "CID": "AA887723", "x": 114.56118193247119, "y": 75.44650727883771, "z": 0 },
    { "CID": "AA887723", "x": -13.859036898958834, "y": -50.24646174345118, "z": 0 },
    { "CID": "AA887723", "x": 7.731402264450111, "y": -72.21144800022527, "z": 0 },
    { "CID": "AA887723", "x": 42.48817380427971, "y": -72.81099687003388, "z": 0 },
    { "CID": "AA887723", "x": 136.85352259698863, "y": 45.47056269702918, "z": 0 },
    { "CID": "AA887723", "x": 84.12579762094288, "y": -78.30826671293163, "z": 0 },
    { "CID": "AA887723", "x": -52.806136742878195, "y": -58.62715111666151, "z": 0 },
    { "CID": "AA887723", "x": -25.927206199381146, "y": 67.78613491306172, "z": 0 },
    { "CID": "AA887723", "x": -92.83944775455909, "y": 12.762912434918235, "z": 0 },
    { "CID": "AA887723", "x": 155.72458728264695, "y": 21.235314125403235, "z": 0 },
    { "CID": "AA887723", "x": 116.24405607445243, "y": -54.12262600717291, "z": 0 },
    { "CID": "AA887723", "x": 87.45491266806323, "y": -64.22670533698046, "z": 0 },
    { "CID": "AA887723", "x": 155.7632949967665, "y": 29.031579404767342, "z": 0 },
    { "CID": "AA887723", "x": -89.0380570739658, "y": 52.72324325198113, "z": 0 },
    { "CID": "AA887723", "x": 35.88998530602311, "y": 30.659638561256358, "z": 0 },
    { "CID": "AA887723", "x": 164.42761886650226, "y": -48.51935077833321, "z": 0 },
    { "CID": "AA887723", "x": -49.74791480349151, "y": -71.78933590414675, "z": 0 },
    { "CID": "AA887723", "x": 85.28708490370116, "y": 72.12068373947298, "z": 0 },
    { "CID": "AA887723", "x": -54.83941390741629, "y": 18.34120675437515, "z": 0 },
    { "CID": "AA887723", "x": 161.3777416056144, "y": -16.052810601293217, "z": 0 },
    { "CID": "AA887723", "x": 16.487784630426177, "y": 61.732138286927125, "z": 0 },
    { "CID": "AA887723", "x": -169.0481696544996, "y": 14.383486248258507, "z": 0 },
    { "CID": "AA887723", "x": 170.7296822099869, "y": 50.16389901455699, "z": 0 },
    { "CID": "AA887723", "x": -109.4604721848986, "y": -10.068154964415328, "z": 0 },
    { "CID": "AA887723", "x": -161.95977332196992, "y": -23.191238779501823, "z": 0 },
    { "CID": "AA887723", "x": 95.86837985236372, "y": 6.61817988098808, "z": 0 },
    { "CID": "AA887723", "x": 139.029883944198, "y": -1.5100679795649796, "z": 0 },
    { "CID": "AA887723", "x": -76.28578538211639, "y": 20.905242017408938, "z": 0 },
    { "CID": "AA887723", "x": 151.0558856114651, "y": -16.013986955306407, "z": 0 },
    { "CID": "AA887723", "x": 86.7719928825756, "y": 11.76641979973408, "z": 0 }];

const devLocation = [[-7.5, 6], [-24, 6], [-25.6, 6], [-20.5, -4], [100, 18], [100, 9], [100, 0], [88, 18], [88, 9], [88, 0], [73.3, 6], [74.7, 6], [46.3, 6], [47.7, 6], [30.5, 6], [8.7, 6]];

const colProps = {
  lg: 12,
  md: 24,
}
export default {
  namespace: 'home',
  state: {
    streamdata : [],
    staffLocation,
    devLocation,
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {

      })
    },
  },
  effects: {

  },
  reducers: {
  },
}
