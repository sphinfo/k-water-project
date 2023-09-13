import { HeightReference, VerticalOrigin } from "cesium";

const StyleConfig = {
	water: {
        image: '../../../resources/images/water.png',
        width: 35,
        height: 35,
        heightReference: HeightReference.RELATIVE_TO_GROUND,
        verticalOrigin: VerticalOrigin.BOTTOM
    }
};


export default StyleConfig;