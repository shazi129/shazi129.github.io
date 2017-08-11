;(function() {
	var canvas = document.getElementById('mainCanvas');
		cv = canvas.getContext('2d');
	var img, //图片对象
		bottom, //底层的草地
		bird, //鸟
		column, //柱子
		scoreObj, //顶上的分数对象
		offset, //开始游戏后小鸟移动的位置
		score; //本轮的得分

	var setTimeoutFlag = null;

	//启动游戏
	var util = {
		init : function() {
			//初始化游戏对象
			img = new Image();
			img.onload = function() {
				bird = new Bird(); //左边那只鸟
				bottom = new Bottom(); //底部的草坪
				column = new Column(); //柱子
				scoreObj = new Score(); //分数

				canvas.width = property.visibleWidth;
				canvas.height = property.visibleHeight;
				localStorage['highest_score'] = 0;

				util.reset();

				cv.clearRect(0, 0, property.visibleWidth, property.visibleHeight);
				cv.drawImage(img, 0, 0, 288, 511, 0, 0, property.mainContentWidth, property.mainContentHeight);
				bird.draw();
				bottom.draw();
				scoreObj.draw(0);

				//放那个Get Ready
				var readyTargetWidth = 0.5 * property.mainContentWidth;
				var readyTargetHeight = 0.15 * property.mainContentHeight;
				var readyTargetLeft = 0.5*property.mainContentWidth - 0.5*readyTargetWidth;
				var readyTargetTop = 0.2 * property.mainContentHeight;
				cv.drawImage(img, 590, 118, 184, 50, readyTargetLeft, readyTargetTop, readyTargetWidth, readyTargetHeight);

				//放提示图片
				var tipTargetWidth = 0.4 * property.mainContentWidth;
				var tipTargetHeight = 0.3 * property.mainContentWidth;
				var tipTargetLeft = 0.5*property.mainContentWidth - 0.5*tipTargetWidth;
				var tipTargetTop = 0.5 * property.mainContentHeight;
				cv.drawImage(img, 584, 182, 114, 98, tipTargetLeft, tipTargetTop, tipTargetWidth, tipTargetHeight);

				$(document).one('tap', function() {
					util.begin();
				});
			}
			img.src = "index.png";
		},
		reset : function() {
			offset = 0;
			bird.reset();
			bottom.reset();
			column.reset();
			scoreObj.reset();
		},
		jump : function() {
			bird.v0 = -0.035 * property.mainContentHeight;
			bird.time = 0;
			bird.originalTop = bird.targetTop;
		},
		begin : function() {
			$(document).on('tap', util.jump);
			util.update();
		},
		end : function() {
			$(document).unbind('tap', util.jump);
			clearTimeout(setTimeoutFlag);

			cv.clearRect(0, 0, property.visibleWidth, property.visibleHeight);
			cv.drawImage(img, 0, 0, 288, 511, 0, 0, property.mainContentWidth, property.mainContentHeight);
			bottom.draw();
			
			//放那个game over
			var endTargetWidth = 0.5 * property.mainContentWidth;
			var endTargetHeight = 0.15 * property.mainContentHeight;
			var endTargetLeft = 0.5*property.mainContentWidth - 0.5*endTargetWidth;
			var endTargetTop = 0.2 * property.mainContentHeight;
			cv.drawImage(img, 790, 118, 192, 42, endTargetLeft, endTargetTop, endTargetWidth, endTargetHeight);

			//分数板
			var medalTargetWidth = 0.7 * property.mainContentWidth;
			var medalTargetHeight = 0.3 * property.mainContentHeight;
			var medalTargetLeft = 0.5*property.mainContentWidth - 0.5*medalTargetWidth;
			var medalTargetTop = 0.4 * property.mainContentHeight;
			cv.drawImage(img, 6, 518, 226, 114, medalTargetLeft, medalTargetTop, medalTargetWidth, medalTargetHeight);

			//当前分数
			var opt = {
				targetWidth : 0.05 * medalTargetWidth,
				targetHeight : 0.15 * medalTargetHeight,
				targetTop : medalTargetTop + 0.3 * medalTargetHeight,
				targetLeft : medalTargetLeft + 0.9 * medalTargetWidth,
				align : 'right',
				type : 'small'
			}
			opt.space = 0.03 * opt.targetWidth;
			console.log(opt);
			Number.draw(score, opt);

			//最好分数
			opt.targetTop = medalTargetTop + 0.65 * medalTargetHeight;
			Number.draw(125, opt);

			//重新开始
			var restartTargetWidth = 0.3 * property.mainContentWidth;
			var restartTargetHeight = 0.1 * property.mainContentHeight;
			var restartTargetLeft = 0.5*property.mainContentWidth - 0.5*restartTargetWidth;
			var restartTargetTop = 0.8 * property.mainContentHeight;
			cv.drawImage(img, 708, 236, 104, 58, restartTargetLeft, restartTargetTop, restartTargetWidth, restartTargetHeight);

			var restart = function(e) {
				var x = e.touches[0].clientX;
				var y = e.touches[0].clientY;

				if (x >= restartTargetLeft && x <= restartTargetLeft+restartTargetWidth
					&& y >= restartTargetTop && y <= restartTargetTop+restartTargetHeight) {

					document.ontouchstart = function() {};
					util.reset();
					util.begin();
				}
			}
			document.ontouchstart = restart;
		},
		//每次重绘游戏
		update : function() {
			if (!util.isAlive()) {
				util.end();
				return;
			} else {
				setTimeoutFlag = setTimeout(util.update, 50);
				bird.update();
				column.update();
				bottom.update();
			}

			cv.clearRect(0, 0, property.visibleWidth, property.visibleHeight);
			cv.drawImage(img, 0, 0, 288, 511, 0, 0, property.mainContentWidth, property.mainContentHeight);	

			bird.draw();			

			column.draw();			

			bottom.draw();			

			offset += property.speed;
			score = (offset-property.column1_targetLeft+property.columnSpaceWidth + bird.targetLeft)/(property.columnSpaceWidth+property.columnWidth);
			score = score < 0 ? 0 : Math.floor(score);
			scoreObj.draw(score);			
		},
		isAlive : function() {
			//判断鸟是否还活着，矩形碰撞吧。。。
			var m_isAlive = true;
			if (bird.targetTop < 0 || bird.targetTop+bird.targetHeight > property.mainContentHeight) {
				m_isAlive = false;
			} else if (util.collideWithColumn(column.column1) || util.collideWithColumn(column.column2)) {
				m_isAlive = false;
			}

			return m_isAlive;
		},
		collideWithColumn : function(thisColumn) {
			function isCollided(point) {
				var m_isCollided = false;
				if (point.x >= thisColumn.targetLeft && point.x <= thisColumn.targetLeft+column.targetWidth &&
					point.y >= thisColumn.top-column.targetHeight && point.y <= thisColumn.top ||
					point.x >= thisColumn.targetLeft && point.x <= thisColumn.targetLeft+column.targetWidth &&
					point.y >= thisColumn.bottom && point.y <= thisColumn.bottom+column.targetHeight
					) {
					m_isCollided = true;
				}
				return m_isCollided;
			}
			if (isCollided({x:bird.targetLeft, y:bird.targetTop}) || //左上角
				isCollided({x:bird.targetLeft, y:bird.targetTop+bird.targetHeight}) || //左下角
				isCollided({x:bird.targetLeft+bird.targetWidth, y:bird.targetTop}) || //右上角
				isCollided({x:bird.targetLeft+bird.targetWidth, y:bird.targetTop+bird.targetHeight}) //右下角
			) {
				return true;
			}
		}
	};	

	//获取默认属性
	var property;
	setTimeout(function() {
		var visibleWidth = $(window).width();
		var visibleHeight = $(window).height();
		property = {			
			visibleWidth : visibleWidth, //页面的宽度
			visibleHeight : visibleHeight, //页面的高度
			mainContentWidth : visibleWidth, //主游戏区的宽度
			mainContentHeight : 0.8 * visibleHeight, //主游戏区的高度
			bottomContentWidth : visibleWidth, //底部草坪的宽度
			bottomContentHeight : 0.2 * visibleHeight, //底部草坪的高度
			columnWidth : 0.2 * visibleWidth, //柱子的宽度		
			columnSpaceWidth : 0.4 * visibleWidth, //空白的宽度
			birdWidth : 34 / 288 * visibleWidth, //鸟的宽度，比例是设计图中鸟和背景图的比例
			birdHeight : 24 / 511 * visibleHeight,//鸟的高度，比例是设计图中鸟和背景图的比例
			speed : 0.01 * visibleWidth //屏幕向前推进的速度
		};
		property.column1_targetLeft = 1.4 * property.mainContentWidth; //第一个柱子的初始的位置
		property.column2_targetLeft = property.column1_targetLeft + property.columnSpaceWidth + property.columnWidth; //第二个柱子的初始的位置
		util.init();
	}, 20);	

	function Bottom() {
	}

	Bottom.prototype = {
		reset : function() {
			this.targetLeft = 0;
			this.targetTop = property.mainContentHeight;
			this.targetWidth = property.bottomContentWidth;
			this.targetHeight = property.bottomContentHeight;

			this.speed = property.speed;
		},
		draw : function() {
			cv.drawImage(img, 585, 0, 336, 112, this.targetLeft, this.targetTop, this.targetWidth, this.targetHeight);

			//为了让它连贯，再来一个
			cv.drawImage(img, 585, 0, 336, 112, this.targetLeft+this.targetWidth-5, this.targetTop, this.targetWidth, this.targetHeight)
		},
		update : function(){
			this.targetLeft -= this.speed;
			this.targetLeft = (this.targetLeft + this.targetWidth <= 0) ? 0 : this.targetLeft;
		}
	}

	function Bird() {
		this.width = 34;
		this.height = 24;		
		this.gravity = 0.0035 * property.visibleHeight; //重力加速度
	}

	Bird.prototype = {
		reset : function() {
			this.state = 1;
			this.time = 0;
			this.v0 = 0;  //重力加速度
			this.originalTop = property.mainContentHeight * 0.6;//初始状态

			//当前状态
			this.targetLeft = property.mainContentWidth * 0.2;
			this.targetTop = this.originalTop;
			this.targetWidth = property.birdWidth;
			this.targetHeight = property.birdHeight;
		},
		draw : function() {
			if (this.state == 1) {
				cv.drawImage(img, 230, 762, this.width, this.height, 
					this.targetLeft, this.targetTop, this.targetWidth, this.targetHeight);
			} else if (this.state == 2) {
				cv.drawImage(img, 230, 814, this.width, this.height, 
					this.targetLeft, this.targetTop, this.targetWidth, this.targetHeight);
			} else if (this.state == 3) {
				cv.drawImage(img, 230, 866, this.width, this.height, 
					this.targetLeft, this.targetTop, this.targetWidth, this.targetHeight);
			}
		},
		update : function() {
			this.state++;
			this.state = (this.state > 3) ? 1 : this.state;
			this.time++;
			var rangeHeight = this.v0*this.time + 0.5*this.gravity*this.time*this.time;
			this.targetTop = this.originalTop + rangeHeight;
		}
	}	

	function Column() {
	}

	Column.prototype = {
		reset : function() {
			this.column1 = {};
			this.column2 = {};
			this.targetWidth = property.columnWidth;
			this.targetHeight = property.mainContentHeight;
			this.speed = property.speed;

			this.init(this.column1);
			this.init(this.column2);

			this.column1.targetLeft = property.column1_targetLeft;
			this.column2.targetLeft = property.column2_targetLeft;
		},
		init : function(column) {
			var random = Math.random()*6 / 10 + 0.1;

			column.top = random * property.mainContentHeight;
			column.bottom = (0.3+random) * property.mainContentHeight;
			column.targetLeft = property.mainContentWidth;
		},
		updateColumn : function(column) {
			column.targetLeft -= this.speed;
			if (column.targetLeft+this.targetWidth <= 0) {
				this.init(column);
			}			
		},
		drawColumn : function(column) {
			cv.drawImage(img, 112, 646, 52, 320, column.targetLeft, column.top-this.targetHeight, this.targetWidth, this.targetHeight);
			cv.drawImage(img, 168, 646, 52, 320, column.targetLeft, column.bottom, this.targetWidth, this.targetHeight);
		},
		draw : function() {
			this.drawColumn(this.column1);
			this.drawColumn(this.column2);
		},
		update : function() {
			this.updateColumn(this.column1);
			this.updateColumn(this.column2);
		}
	}

	//显示顶部的分数
	function Score() {		
	}

	Score.prototype = {
		reset : function() {
			var opt = {};
			this.opt = opt;

			opt.targetWidth = 0.05 * property.visibleWidth;
			opt.targetHeight = 0.05 * property.visibleHeight;
			opt.targetTop = 0.1 * property.mainContentHeight;
			opt.targetLeft = 0.5 * property.mainContentWidth;
			opt.space = 0.05 * opt.targetWidth;
			opt.align = 'center';
			opt.type = 'big';
		},
		draw : function(number) {
			Number.draw(number, this.opt);
		}
	}

	//负责所有的数据展示
	var Number = {
		//显示数字	
		draw : function(number, opt) {
			var targetLeft;

			if (opt.align == 'center') {
				//opt.targetLeft是数字的显示中点，计算出它的显示最左点的横坐标
				if (number >= 100) {
					targetLeft = opt.targetLeft - 1.5*opt.targetWidth - opt.space;
				} else if (number >= 10 && number < 100) {
					targetLeft = opt.targetLeft - opt.targetWidth - 0.5*opt.space;
				} else if (number >= 0 && number < 10) {
					targetLeft = opt.targetLeft - 0.5*opt.targetWidth;
				}
			} else if (opt.align == 'right') {
				if (number >= 100) {
					targetLeft = opt.targetLeft - 3*opt.targetWidth - 2*opt.space;
				} else if (number >= 10 && number < 100) {
					targetLeft = opt.targetLeft - 2*opt.targetWidth - 1*opt.space;
				} else if (number >= 0 && number < 10) {
					targetLeft = opt.targetLeft - opt.targetWidth;
				}
			}


			var digits = [];
			while(number > 0) {
				digits.push(number%10);
				number = Math.floor(number/10);
			}
			if (digits.length == 0) {
				digits[0] = 0;
			}

			var pos;
			console.log(opt.space);
			for (var i = digits.length-1; i >= 0; i--) {
				if (opt.type == 'big') {
					pos = Number.getBigNumberPosition(digits[i]);
				} else if (opt.type == 'small') {
					pos = Number.getSmallNumberPosition(digits[i]);
				}
				cv.drawImage(img, pos.left, pos.top, pos.width, pos.height, 
					targetLeft, opt.targetTop, opt.targetWidth, opt.targetHeight);
				targetLeft += opt.targetWidth+opt.space;
			}
		},
		//获取大号数字在图片中的位置
		getBigNumberPosition : function(number) {
			var position = {};
			number = +number;
			switch (number) {
				case 0:
					position = {left : 992, top : 120};
					break;
				case 1:
					position = {left : 272, top : 910};
					break;
				case 2:
					position = {left : 584, top : 320};
					break;
				case 3:
					position = {left : 612, top : 320};
					break;
				case 4:
					position = {left : 640, top : 320};
					break;
				case 5:
					position = {left : 668, top : 320};
					break;
				case 6:
					position = {left : 584, top : 368};
					break;
				case 7:
					position = {left : 612, top : 368};
					break;
				case 8:
					position = {left : 640, top : 368};
					break;
				case 9:
					position = {left : 668, top : 368};
					break;
			}
			position.width = 24;
			position.height = 36;

			return position;
		},
		//获取小号数字在图片中的位置
		getSmallNumberPosition : function(number) {
			var position = {};
			number = +number;
			switch (number) {
				case 0:
					position = {left : 274, top : 612};
					break;
				case 1:
					position = {left : 278, top : 954};
					break;
				case 2:
					position = {left : 274, top : 978};
					break;
				case 3:
					position = {left : 262, top : 1002};
					break;
				case 4:
					position = {left : 1004, top : 0};
					break;
				case 5:
					position = {left : 1004, top : 24};
					break;
				case 6:
					position = {left : 1010, top : 52};
					break;
				case 7:
					position = {left : 1010, top : 84};
					break;
				case 8:
					position = {left : 586, top : 484};
					break;
				case 9:
					position = {left : 622, top : 412};
					break;
			}
			position.width = 14;
			position.height = 20;

			return position;
		}
	}	
})();