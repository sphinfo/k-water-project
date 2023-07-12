import { Tile as TileLayer } from "ol/layer";
import { TileWMS } from "ol/source";

class TimeSeriesLayer extends TileLayer {

	constructor(opt) {
		const source = new TileWMS({
			url: 'https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi',
			params: {
				'LAYERS': 'nexrad-n0r-wmst'
			},
			serverType: 'geoserver',
			crossOrigin: 'anonymous'
		})	
		
		const layerOptions = {
			source: source,
			name: 'timeSeriesTest'
		}
		super(layerOptions)

		
	}

	/* Exmaple Time Provider */
	_exampleDateProvider(){

		/* example 날짜 데이터 */
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 1); // 하루 전 날짜로 설정

        const startDate = new Date(currentDate); // 시작 날짜
        startDate.setHours(0, 0, 0, 0); // 시작 시간을 0시 0분 0초로 설정

        const endDate = new Date(); // 현재 시간을 끝 날짜로 설정
        endDate.setMinutes(0, 0, 0); // 끝 시간을 0분 0초로 설정

        const datesArray = [];
        const interval = 0.5; // 시간 간격

        let currentDateTime = new Date(startDate);

        while (currentDateTime <= endDate) {
            datesArray.push(new Date(currentDateTime));
            currentDateTime.setTime(currentDateTime.getTime() + interval * 60 * 60 * 1000);
        }

		return datesArray

	}


    updateParam(v){
        this.getSource().updateParams({'TIME': v.toISOString()})
    }
	
}

export default TimeSeriesLayer;