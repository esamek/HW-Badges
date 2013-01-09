
var HwBadges = function(){};



(function(){

	// var intro = ["M43.428,22.503 C43.428,
	// 34.058 34.057,43.428 22.5,
	// 43.428 C10.943,43.428 1.572,
	// 34.058 1.572,22.503 C1.572,
	// 10.941 10.943,1.572 22.5,
	// 1.572 C34.057,1.572 43.428,
	// 10.941 43.428,22.503"];




})();


function getBadge(badgeName, callback){
	$.ajax({
		type:"GET",
		url: "svgs/"+badgeName+".svg",
		dataType: "xml",
		success: function(xml){
			callback(xml);
		}
	});
}


function processOriginalStyles(b){
	var origs = b.attr();
	b.origAttrs = origs;
}




var badge,p;

$(function(){

	p = Raphael('badges');
	badge = getBadge('intro', function(xml){
		badge = p.importSVG(xml);
		badge.attr('transform',"T100,100");

		badge.forEach(function(e){
			processOriginalStyles(e);
			// console.log(e);
			e.attr('fill','#fff');
			e.attr('stroke','#ccc');
			e.attr('stroke-width',1);
			e.attr('stroke-opacity',1);
		});

	});

	badge2 = getBadge('review', function(xml){
		badge2 = p.importSVG(xml);
		badge2.attr('transform',"T200,100");

		badge2.forEach(function(e){
			
			processOriginalStyles(e);
			
			// console.log(e);
			e.attr('fill','#fff');
			e.attr('stroke','#ccc');
			e.attr('stroke-width',1);
			e.attr('stroke-opacity',1);
		});

	});

	$('#grow').click(function(){
		badge.forEach(function(b){
			var c = b.origAttrs;
			
			b.animate({
				'fill': c,
				'stroke-opacity':0,
				'transform': c.transform + 'S2'
			},600,">");
		});
		badge2.forEach(function(b){
			var c = b.origFill.hex;
			console.log(this);
			b.animate({
				'fill': c,
				'stroke-opacity':0,
				'transform': b.attr('transform') + 'S2'
			},600,">");
		});
	});

});


















