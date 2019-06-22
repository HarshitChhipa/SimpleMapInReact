import React, {Component} from "react"
import {
    ComposableMap,
    ZoomableGroup,
    Geographies,
    Geography,
} from "react-simple-maps"
import ReactTooltip from "react-tooltip"

const wrapperStyles = {
    width: "100%",
    maxWidth: 980,
    margin: "0 auto",
};

class BasicMap extends Component {
    componentDidMount() {
        fetch("https://restcountries.eu/rest/v2/name/united")
            .then(res => {
                return res.json()
            })
            .then(
                result => {
                    console.log(result, 'This is the result part of the application');
                },
                (error) => {
                    console.log(error, 'This is error')
                }
            );
        setTimeout(() => {
            ReactTooltip.rebuild()
        }, 100)
    }

    render() {
        return (
            <div style={wrapperStyles}>
                <ComposableMap
                    projectionConfig={{
                        scale: 205,
                    }}
                    width={980}
                    height={551}
                    style={{
                        width: "100%",
                        height: "auto",
                    }}
                >
                    <ZoomableGroup center={[0, 20]} disablePanning>
                        <Geographies geography="/static/world-50m.json">
                            {(geographies, projection) => geographies.map((geography, i) => geography.id !== "ATA" && (
                                <Geography
                                    key={i}
                                    data-tip={geography.properties.name + ' Population:- ' + geography.properties.population + ' Area:- ' + geography.properties.area}
                                    geography={geography}
                                    projection={projection}
                                    style={{
                                        default: {
                                            fill: "#ECEFF1",
                                            stroke: "#607D8B",
                                            strokeWidth: 0.75,
                                            outline: "none",
                                        },
                                        hover: {
                                            fill: "#607D8B",
                                            stroke: "#607D8B",
                                            strokeWidth: 0.75,
                                            outline: "none",
                                        },
                                        pressed: {
                                            fill: "#FF5722",
                                            stroke: "#607D8B",
                                            strokeWidth: 0.75,
                                            outline: "none",
                                        },
                                    }}
                                />
                            ))}
                        </Geographies>
                    </ZoomableGroup>
                </ComposableMap>
                <ReactTooltip/>
            </div>
        )
    }
}

export default BasicMap
