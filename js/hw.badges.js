

var BACKGROUND = $.parseXML(bg);

var fireworkColors = ["#ea4648","#f5871e","#de1c85","#f9c031","#004b77","#00b2e9"];


function rand(min,max) {
	return Math.floor((Math.random() * max) + min);
}




function makeFireworks(paper){
	var p = paper
		w = p.width,
		h = p.height;

	// OPTIONS \\
	var count = 30;
	var radius = 2;
	var maxAscendTime = 1200;
	var maxExplodeTime = 1400;
	var minExplodeTime = 600;
	var maxExplodeRadius = 75;
	var minAscendHeight = h / 2;

	var fireworks = [];
	for(var i = 0; i < count; i++){
		var zeX = Math.floor(Math.random() * w);
		var begin = {
			'x': zeX,
			'y': h + radius + 10
		};
		var firework = p.circle(begin.x,begin.y, radius)
						.attr({
							'fill':fireworkColors[ Math.floor(Math.random() * fireworkColors.length) ],
							'stroke-opacity':0,
							'opacity':1,
							'transform':"T0,0"
						});

		fireworks.push(firework);

	}

	for(var i = 0; i < fireworks.length; i++){
		var zeY = rand(50,h - (radius + 10));
		var ascendTime = rand(900, maxAscendTime);
		var explodeRadius = Math.round(Math.pow(ascendTime, 1.52) / 1000);//rand(radius + 10, maxExplodeRadius);
			console.log(explodeRadius);
			//explodeRadius *= maxExplodeRadius;
		var explodeTime = rand(300,maxExplodeTime);
		console.log(ascendTime,explodeRadius);
		// ascend
		fireworks[i].animate({
			'transform': "T" + 0 + "," + (zeY * -1)
		}, explodeTime, "linear", function(){

			//explode
			this.animate({
				'transform': "...S"+ explodeRadius,
				'opacity': 0
			},explodeTime,"<>", function(){
				//remove
				this.remove();
				fireworks.splice(i,1);
			});
		});

	}



}






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


function getSpinDegrees(numOfRotations){
	return 360 * numOfRotations;
}


var start = {
	'x':900,
	'y':100
};

var end = {
	'x':-300,
	'y':0
};

var rotations = 4;

var effectStart1 = "T"+ 900 + ", " + 100 + "S1R0";
var effectEnd1   = "...R" + getSpinDegrees(rotations) + "T" + -300 + ", " + 0 + "S2.5";



var effectStart2 = "T" + 600 + "," + 100 + "S0.1R0";
var effectEnd2   = "...R" + getSpinDegrees(rotations) + "S24";





function showBadge(b, paper){

	b.animate({
		'transform': effectEnd2
	},1500,"elastic");

	makeFireworks(paper);

}




var badge,p;

$(function(){
	p = Raphael('badges');

	var pBG = p.importSVG(BACKGROUND);
	var BACKGROUND_SVG = p.set();
	pBG.forEach(function(path){
		BACKGROUND_SVG.push(path);
	});

	BACKGROUND_SVG.attr('transform','T0,10');

	badge = getBadge('intro', function(xml){
		var b = p.importSVG(xml);
		b.attr('transform',effectStart2);
		var wholeBadge = p.set();
		b.forEach(function(e){
			wholeBadge.push(e);
		});

		badge = wholeBadge;
	});


	$('#grow').on('click', function(){
		showBadge(badge, p);
	});



});








$(function(){

	// p = Raphael('badges');
	// badge = getBadge('intro', function(xml){
	// 	badge = p.importSVG(xml);
	// 	badge.attr('transform',"T100,100");

	// 	badge.forEach(function(e){
	// 		processOriginalStyles(e);



	// 	});

	// });

	// badge2 = getBadge('review', function(xml){
	// 	badge2 = p.importSVG(xml);
	// 	badge2.attr('transform',"T200,100");

	// 	badge2.forEach(function(e){

	// 		processOriginalStyles(e);

	// 		// console.log(e);

	// 	});

	// });

	// $('#grow').click(function(){
	// 	badge.forEach(function(b){
	// 		var c = b.origAttrs;

	// 		b.animate({
	// 			'transform': c.transform + 'S2'
	// 		},600,">");
	// 	});
	// 	badge2.forEach(function(b){
	// 		var c = b.origFill.hex;
	// 		console.log(this);
	// 		b.animate({
	// 			'fill': c,
	// 			'stroke-opacity':0,
	// 			'transform': b.attr('transform') + 'S2'
	// 		},600,">");
	// 	});
	// });

});


















