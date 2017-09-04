import React from 'react';
import PropTypes from 'prop-types'
import * as ol from 'openlayers';
import Staff from './staff'
import {
  interaction, layer, custom, control, source, //name spaces
  Interactions, Overlays, Controls, Feature,   //group
  Map, Layers, Overlay, Util    //objects
} from "react-openlayers";
import styles from './factoryMap.less';
import devIMG from './device_img_sh.png';
import staffIMG from './staff.png';

const XYZurl = '';

/*******Tile设置工厂现场图**** */
const tile = new ol.layer.Tile({
  source: new ol.source.XYZ({
    url: 'http://artadv.cn/files/shanghai/{z}/{x}/{y}.png',//'./src/routes/home/components/shanghai/{z}/{x}/{y}.png',
    crossOrigin: 'null',
    wrapX: false,
    tileSize: 1024
  })
});

const tileExample = [new ol.layer.Tile({
  source: new ol.source.OSM()
}),
new ol.layer.Image({
  source: new ol.source.ImageArcGISRest({
    ratio: 1,
    params: {},
    url: 'https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer',
  })
})];
/********地图矢量********* */
const mapVector = new ol.layer.Vector({
  source: new ol.source.Vector({
    wrapX: false
  })
});
/*****设备矢量****** */

function devVector(devLocation) {
  //设备位置
  // const device_pos = [];
  //调整设备弹窗位置
  // const device_popup = [];

  const device_features = [];
  if (devLocation) {
    devLocation.map((locate) => {
      device_features.push(new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat(locate))));
    })
  };
  const device_source = new ol.source.Vector({
    wrapX: false,
    features: device_features
  });

  return (
    new ol.layer.Vector({
      source: device_source,
      style: new ol.style.Style({
        image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
          anchor: [0, 0],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          opacity: 0.95,
          src: devIMG
        })),
        stroke: new ol.style.Stroke({
          width: 3,
          color: [0, 0, 0, 1]
        }),
        fill: new ol.style.Fill({
          color: [0, 0, 0, 0.6]
        })
      })
    })
  );
}


/****** 设置视图层级 ******** */
const view = new ol.View({
  center: ol.proj.fromLonLat([0, 0]),
  zoom: 2,
  minZoom: 1,
  maxZoom: 5
});


/******* 设置地图缩略图 ********* */
const overviewControl = new ol.control.OverviewMap({
  // see in overviewmap-custom.html to see the custom CSS used
  // className: 'ol-overviewmap ol-custom-overviewmap',
  // layers: [
  //   new ol.layer.Tile({
  //     source: new ol.source.OSM({
  //       // 'url': '../../common/data/{z}/{x}/{y}.png'
  //     })
  //   })
  // ],
  collapseLabel: '\u00BB',
  label: '\u00AB',
  collapsed: true
});

/******* 设置地图全屏 ********* */
const fullscreenControl = new ol.control.FullScreen({
  source: 'fullscreen'
});

const controls = ol.control.defaults().extend([
  overviewControl,
  fullscreenControl
]);

class FactoryMap extends React.Component {
  constructor(props) {
    super(props);
    const staffLocation = this.props.staff;
    this.state = {
      staff: staffLocation[0],
      device: this.props.device,
      test: []
    };
  }

  componentDidMount() {
    const { staff, device } = this.state;
    const devVectors = devVector(device);
    const container = document.getElementById('popup'),
      content = document.getElementById('popup-content'),
      closer = document.getElementById('popup-closer');
    const that = this;
    const overlay = new ol.Overlay(/** @type {olx.OverlayOptions} */({
      element: container,
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    }));

    closer.onclick = () => {
      overlay.setPosition(undefined);
      closer.blur();
      return false;
    };

    this.map = new ol.Map({
      logo: false,
      target: 'map',
      layers: [tile, devVectors],
      overlays: [overlay],
      view,
      controls,
    });
    let i = 0;
    this.locationApp = setInterval(() => {
      if (i < 31) {
        i++;
      } else { i = 0; }
      const staffLocation = that.props.staff;
      this.setState({
        test: [{
          CID: staffLocation[0].CID,
          x: staffLocation[i].x,
          y: staffLocation[i].y
        }]
      })
    }, 1000);
  }

  componentWillUnmount() {
    if (this.locationApp) {
      clearInterval(this.locationApp);
    }
  }
  render() {
    return (
      <div>
        <div id="popup" className="ol-popup">
          <a href="#" id="popup-closer" className="ol-popup-closer"></a>
          <div id="popup-content"></div>
        </div>
        <div id='fullscreen'><div id='map' className='map' ></div></div>
        {this.state.test.map(v =>
          <Staff
            key={v.CID}
            CID={v.CID}
            position={{
              x: v.x,
              y: v.y
            }}
            name={v.name || '张三'}
            map={this.map}
          />
        )}
      </div>
    )
  }
}

FactoryMap.propTypes = {
  staff: PropTypes.array,
  device: PropTypes.array,
}
export default FactoryMap;
