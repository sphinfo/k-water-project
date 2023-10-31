import {Cartesian3, CustomDataSource, Entity, HeightReference, VerticalOrigin} from "cesium";
//import water from '../layers/water.png'


class TestOverlayEntityCollection extends CustomDataSource {

	constructor(props) {

		super(props.name)
		this.id = props.name
		this.type = 'datasource'
	}


	_html(){
		const svgNamespace = "http://www.w3.org/2000/svg";
		const foreignObjectNamespace = "http://www.w3.org/1999/xhtml";

		// Create the root SVG element
		const svg = document.createElementNS(svgNamespace, "svg");
		svg.setAttribute("xmlns", svgNamespace);
		svg.setAttribute("width", "300");
		svg.setAttribute("height", "200");

		// Create the foreignObject element
		const foreignObject = document.createElementNS(svgNamespace, "foreignObject");
		foreignObject.setAttribute("width", "100%");
		foreignObject.setAttribute("height", "100%");

		// Create the HTML content
		const div = document.createElementNS(foreignObjectNamespace, "div");
		const button = document.createElementNS(foreignObjectNamespace, "button");
		button.textContent = "Click Me";
		button.id = "myButton";
		div.appendChild(button);

		// Append the HTML content to the foreignObject
		foreignObject.appendChild(div);

		// Append the foreignObject to the SVG
		svg.appendChild(foreignObject);

		return svg;
	}

	async _addFeature(longitude, latitude, properties) {

		let me = this

		var canvas = document.createElement('canvas');
		canvas.width = 200;
		canvas.height = 300;


		var svgString = '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800">' +
							` <style> .box { background-color: white } </style>` + 
							'<foreignObject width="100%" height="100%">' +
								'<div class="box" xmlns="http://www.w3.org/1999/xhtml" style="font-size:90px; color: BLACK">' +
								`<button type="button" style="width:100%; height:100%;" onclick="alert('Button clicked')">Juhuhuhu!</button>` +
									`${longitude}: ${latitude}` + 
								'</div>' +
							'</foreignObject>' +
						'</svg>';

		var image = new Image();
		image.src = 'data:image/svg+xml;base64,' + window.btoa(svgString);
		image.onload = function() {
			canvas.getContext('2d').drawImage(image, 0, 0);

			const pointEntity = new Entity({
				position: Cartesian3.fromDegrees(longitude, latitude),
				billboard: {
					image: canvas,
					width: 35,
					height: 35,
					clampToGround: true,
					heightReference: HeightReference.RELATIVE_TO_GROUND,
					verticalOrigin: VerticalOrigin.BOTTOM,
					scale: 1.0,
					disableDepthTestDistance: Number.POSITIVE_INFINITY
				},
				properties: properties,
				name: me.id
			});
	
			me.entities.add(pointEntity);

		}
		
	}
	
}

export default TestOverlayEntityCollection;