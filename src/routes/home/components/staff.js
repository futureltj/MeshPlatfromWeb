import React, { Component } from 'react'
import staffIMG from './staff.png'
import * as ol from 'openlayers';


export default class Staff extends Component {
    constructor(props) {
        super(props)
        this.instance = null
    }
    componentDidMount() { 
        if (this.props.position) {
            const staff_feature = new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat([this.props.position.x, this.props.position.y])));
            this.instance = new ol.layer.Vector({
                    source: new ol.source.Vector({
                        wrapX: false,
                        features: [staff_feature] //features必须是数组
                    }),
                    style: new ol.style.Style({
                        image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
                            anchor: [0, 0],
                            anchorXUnits: 'fraction',
                            anchorYUnits: 'pixels',
                            opacity: 0.95,
                            src: staffIMG
                        })),
                        text: new ol.style.Text(({
                            text: `${this.props.name}\n${this.props.CID}`,//卡号信息或名字
                            scale: 1,
                            offsetX: 13,
                            offsetY: 45,
                            fill: new ol.style.Fill(({
                                //color:'#56abe4'
                                color: 'black'
                            }))
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
        }
        this.instance && this.props.map.addLayer(this.instance)
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.position !== nextProps.position) { 
            const staff_new = new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat([nextProps.position.x, nextProps.position.y])));
            this.instance.setSource(new ol.source.Vector({
                wrapX: false,
                features: [staff_new] //features必须是数组
            }))
        }
    }
    componentWillUnmount() {
        this.props.map.removeLayer(this.instance)
    }
    render() {
        return (
            <div className="staff"/>
        )
    }
}
