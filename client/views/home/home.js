Template.home.events({
	"click a[href^='#']": function(e, template) {
		var target = $(e.target.hash);
		if (target.length == 0) target = $('a[name="' + e.target.hash.substr(1) + '"]');
		if (target.length == 0) target = $('html');
		$('html, body').animate({ scrollTop: target.offset().top - 50 }, 500);
		return false;
	}
});

Template.menu.rendered = function() {

};

Template.menu.created = function() {
	_sb = new Slatebox();
	var _register = window.setInterval(function() {
		if ($("#slate1").is(":visible")) {
			window.clearInterval(_register);
			_waypoints();
		}
	}, 500);
};

var _sb;

function _rs(id, be, bes, sz) {
	var _slate = new _sb.slate({
		name: "My First Slate"
		, container: id
		, showBirdsEye: be || false
		, sizeOfBirdsEye: bes || 0
		, showZoom: sz || false
		, showMultiSelect: false
	}).init();

	return _slate;
};

function _rn(n, x, y, w, h, am) {
	var _node = _sb.node({ 
		name: n
		, text: n
		, xPos: x
		, yPos: y
		, height: h || 100
		, width: w || 150
		, vectorPath: 'roundedrectangle'
		, backgroundColor: '90-#A61000-#FF1800'
		, lineColor: "#333"
		, lineWidth: 8
		, allowMenu: false || am
	});

	return _node;
}

function _waypoints() {
	$('.slateExample')
	.waypoint(function(direction) {
		if (direction === "down") {
			switch(parseInt($(this).attr("data-example"))) {
				case 1:

					var _slate = _rs("slate1")
						, _node1 = _rn("My First Slate", 5025, 5025);
					_slate.nodes.add(_node1);

					break;

				case 2:

					var _slate = _rs("slate2")
						, _node1 = _rn("My First Slate", 5025, 5025)
						, _node2 = _rn("My Second Node", 5150, 5150);

					_slate.nodes.add(_node1);
					_slate.nodes.add(_node2);
					_node1.relationships.addAssociation(_node2);

					_node2.move({
						x: 5300
						, y: 5190
						, dur: 1000
					});

					break;

				case 3:

					var _slate = _rs("slate3")
						, _node1 = _rn("One", 5025, 5025, 50, 50)
						, _node2 = _rn("Two", 5124, 5116, 50, 50);

					_node1.options.allowMenu = false;
					_node2.options.allowMenu = false;

					_slate.nodes.add(_node1);
					_slate.nodes.add(_node2);
					_node1.relationships.addAssociation(_node2);

					_slate.canvas.zoom({
						zoomPercent: 400
						, dur: 1000
					});

					break;

				case 4:

					var _slate = _rs("slate4")
						, _node1 = _rn("", 5025, 5025);

					_slate.nodes.add(_node1);
					_node1.images.set("images/kitty.jpg", 130, 130);

					_slate.canvas.centerOnNodes({
						nodes: [_node1]
						, cb: function() {
							_slate.canvas.zoom({
								zoomPercent: 150
								, dur: 1000
							});
						}
					});

					break;

				case 5:

					var _slate = _rs("slate5")
						, _node1 = _rn("Shape Shifter", 5025, 5025);

					_slate.nodes.add(_node1);

					_slate.canvas.centerOnNodes({
						nodes: [_node1]
						, cb: function() {
							_node1.shapes.set({ shape: "ellipse" });
							_node1.move({
								x: 5100
								, y: 5100
								, cb: function() {
									_slate.canvas.centerOnNodes({
										nodes: [_node1]
										, cb: function() {
											_node1.resize.set(200, 250, 500, ">", function() {
												_node1.colorpicker.set({color: "90-#369001-#9CEE6C"});
												_slate.canvas.centerOnNodes({
													nodes: [_node1]
												});
											});
										}
									});
								}
							});
							
						}
					});

					break;

				case 6:

					var _slate = _rs("slate6")
						, x = 5015
						, y = 5015
						, _node = _rn("", x, y, 40, 40);

					_slate.nodes.add(_node);

					x = 5035;
					y = 5015;

					_.times(10, function(n) {
						if (n  % 4 === 0) {
							x += 50;
							y = 5015;
						}
						y += 40;
						var n = _rn((n + 1).toString(), x, y, 30, 30);
						_slate.nodes.add(n);
						_node.relationships.addAssociation(n, { lineWidth: 3, lineColor: "#333" });
					});

					_slate.canvas.centerOnNodes({
						nodes: _slate.nodes.allNodes
						, cb: function() {
							_slate.nodes.allNodes[3].move({
								x: 5200
								, y: 5150
								, dur: 1200
								, cb: function() {
									_slate.canvas.centerOnNodes({
										nodes: _slate.nodes.allNodes
									});
								}
							});

							_slate.nodes.allNodes[1].move({
								x: 4997
								, y: 5223
								, dur: 800
							});

							_slate.nodes.allNodes[8].move({
								x: 5200
								, y: 5200
								, dur: 400
							});
						}
					});

					break;

				case 7:

					var _slate = _rs("slate7", true, 100)
						, x = 5015
						, y = 5015
						, _node = _rn("", x, y, 40, 40);

					_slate.nodes.add(_node);

					x = 5035;
					y = 5015;

					_.times(5, function(n) {
						if (n  % 3 === 0) {
							y += 55;
							x = 5035;
						}
						x += 55;
						var n = _rn((n + 1).toString(), x, y, 50, 50);
						_slate.nodes.add(n);
						_node.relationships.addAssociation(n, { lineWidth: 3, lineColor: "#333" });
					});

					function _iterate(num) {

						var xr = _.random(-1500, 1500), yr = _.random(-300, 300), _dur = _.random(300, 800)
							, node = _slate.nodes.allNodes[num];

						node.move({
							x: 5015 + xr
							, y: 5150 + yr
							, dur: 300
							, cb: function() {
								num++;
								_slate.canvas.centerOnNodes({
									nodes: [node]
									, cb: function() {
										node.resize.set(105, 65, 300, ">", function() {
											node.colorpicker.set({color: "90-#369001-#9CEE6C"});
											if (num < _slate.nodes.allNodes.length) {
												_iterate(num);
											} else {
												_slate.canvas.centerOnNodes({
													nodes: _slate.nodes.allNodes
													, cb: function() {
														_slate.canvas.scaleToFitNodes({
															nodes: _slate.nodes.allNodes
														});
													}
												});
											}
										});
									}
								});
							}
						});
					};

					_slate.canvas.centerOnNodes({
						nodes: _slate.nodes.allNodes
						, cb: function() {
							_slate.canvas.scaleToFitNodes({
								nodes: _slate.nodes.allNodes
								, cb: function() {
									_iterate(1);
								}
							});
						}
					});

					break;
			}
		}
	}, { offset: 250 });
};