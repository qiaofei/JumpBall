window.config = {
    urlRoot: 'http://www.ellogame.com/index.php/api/',
}
window.gameAction = {
    start: gameBegin,
    gameStart: gameStart,
    gameEnd: gameEnd,
    gameInit: gameInit
}
var hasTip=false;
var browser = {
    versions: function() {
        {
            var n = navigator.userAgent;
            navigator.appVersion
        }
        return {
            trident: n.indexOf("Trident") > -1,
            presto: n.indexOf("Presto") > -1,
            webKit: n.indexOf("AppleWebKit") > -1,
            gecko: n.indexOf("Gecko") > -1 && -1 == n.indexOf("KHTML"),
            mobile: !!n.match(/AppleWebKit.*Mobile.*/) || !!n.match(/AppleWebKit/),
            ios: !!n.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            android: n.indexOf("Android") > -1 || n.indexOf("Linux") > -1,
            iPhone: n.indexOf("iPhone") > -1 || n.indexOf("Mac") > -1,
            iPad: n.indexOf("iPad") > -1,
            webApp: -1 == n.indexOf("Safari"),
            QQbrw: n.indexOf("MQQBrowser") > -1,
            ucLowEnd: n.indexOf("UCWEB7.") > -1,
            ucSpecial: n.indexOf("rv:1.2.3.4") > -1,
            ucweb: function() {
                try {
                    return parseFloat(n.match(/ucweb\d+\.\d+/gi).toString().match(/\d+\.\d+/).toString()) >= 8.2
                } catch (e) {
                    return n.indexOf("UC") > -1 ? !0 : !1
                }
            }(),
            Symbian: n.indexOf("Symbian") > -1,
            ucSB: n.indexOf("Firefox/1.") > -1
        }
    }()
};

function gameBegin() {
    $('.result').show()
    $('.container,.coin,.logo').hide();
    $(".touchbox,.clickbox").hide();
}

function gameStart() {
    $('.result').show()
    $('.container,.coin,.logo').hide();
    $(".touchbox,.clickbox").hide();
    getGameToken()
}

function gameEnd(score) {
    recordScore(score);
    setGameoverShare(score);
    $('.container,.coin,#loadscene,#rank1,#rank2').show();
    $(".touchbox,.clickbox").show();
    window.gw_globle_action.backContent();
}

function gameInit() {
    $('.container,.coin,#rank1,#rank2').hide();
    $(".touchbox,.clickbox").hide();

}
var canHidePrompt = false;
function initHandle() {
    $('.nav-bar').on('click', function(e) {
        $('.container').addClass('opening');
        var dom = $(this);
        $('.nav-bar').removeClass('active');
        dom.addClass('active');
        $('.panel-item').hide();
        navBarEvent(dom.attr('data-target'))

    })
    $('.nav-back').on('click', function() {
        if ($('.container').hasClass('opening')) {
            $('.container').removeClass('opening')
            $('.nav-bar').removeClass('active');
        } else {
            $('.container').addClass('opening')
        }
    })

    $('.panal-box-button').on('click', function() {
        $('.panel-item').hide();
        $('.panel-qcode').show();
    })

    if(gameInfo.hasCoin){
        $('.coin').css('visibility','visible')
    }else{
        $('.coin').remove()
    }

    $('.game-list').on('click','.game-item',function(){
        var href = $(this).find('.game-url').attr('href');
        location.href=href;
    })
    $('.tip_img_box').click(function () {
        if (canHidePrompt) {
            $('.tip_img_box').hide();
        }
    });
    if (window.innerHeight < window.innerWidth) {
        if (window.isPrompt) {
            $('.tip_img_box,.show_hengping').show();
        } else {
            $('.tip_img_box,.show_shuping').show();
        }
        canHidePrompt = false;
    }

    $('.container,.game-ui').show();

    // music btn
    var volume = localStorage.getItem("volume");
    if(volume!=null){
        var n = app.root.findByName("player");
        if (!n) {
            n = app.systems;
        }
        n.sound.volume = volume;
        if(volume==1){
            $('.music-setting .setting-switch').addClass("active")
        }else{
            $('.music-setting .setting-switch').removeClass("active")
        }
    }

    //检测点击返回按钮
    function pushHistory() {
        var state = {
            title: "title",
            url: "#"
        };
        window.history.pushState(state, "title", "#");
    }
    function doClickLeaveBtn() {
        $(".still_leave").on("click", function (e) {
            e.stopPropagation();
            wx.closeWindow();
        })
    }
    function doClickCancle() {
        $(".sure_back_container").on('click',function () {
            $(".sure_back_container").hide();
            pushHistory();
        })
    }
    $(".check").on("click", function (e) {
        e.stopPropagation();
        if($('.check')[0].checked){
            // set session
            var exp = new Date();
            var today =exp.getDate();
            exp.setDate(+today+1);
            document.cookie = "leavestatus=1;expires=" + exp.toGMTString();
        }else{
            // del session
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            document.cookie="leavestatus=1;expires="+exp.toGMTString();
        }
    })
    //弹出确认离开提示页
  /*  if(!getCookie('leavestatus')){
        if(!hasTip){
            doClickLeaveBtn();
            doClickCancle();
            pushHistory();
            window.addEventListener("popstate", function (e) {
                $(".sure_back_container").fadeIn();
                   hasTip=true;
            }, false);
		}
    }*/

    toggleRanks();
    settingEvent();
    shouquan();
    payEvent();
    wxShare();
}

function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
    return unescape(arr[2]);
    else
    return null;
}

function navBarEvent(type) {
    switch (type) {
        case 'panel-rank':
            getFriendsRanks();
            break;
        case 'panel-gamelist':
            getGamelist();
            break;
        case 'panel-dashang':
            getDashang();
            break;
        case 'panel-chat':
            // chatInit();
            break;
    }
    $('.' + type).show();
}

function toggleRanks() {
    $('.rank-btn').on('click', function(event) {
        event.preventDefault();
        /* Act on the event */
        $('.rank-btn').removeClass('active')
        if ($(this).attr('data-type') == 'friend') {
            getFriendsRanks();
        } else {
            getRank();
        }
        $(this).addClass('active')
    });
}

function settingEvent() {
	//默认优化打开（20170518赵）
	browser.versions.ios ? !1 :(app.graphicsDevice.maxPixelRatio = 1,$('.android-setting .setting-switch').toggleClass("active"));
	
    $('.android-setting .setting-switch').on('click', function() {
        browser.versions.ios ? !1 : ($(this).toggleClass("active"), $(this).hasClass("active") ? (app.graphicsDevice.maxPixelRatio = 1) : (app.graphicsDevice.maxPixelRatio = window.devicePixelRatio), void 0)
    })
    $('.music-setting .setting-switch').on('click', function() {
        var n = app.root.findByName("player");
        if (!n) {
            n = app.systems;
        }
        $(this).toggleClass("active");
        $(this).hasClass("active") ? (n.sound.volume = 1,localStorage.setItem("volume",1)) : (n.sound.volume = 0, localStorage.setItem("volume",0));
    })
}

function shouquan() {
    $.ajax({
            url: config.urlRoot + 'gameinfo/' + gameInfo.gameName,
            type: 'POST',
            dataType: 'json',
        })
        .done(function(data) {
            if (data.sta == 1) {
                userInfo = {
                    id: data.data.id,
                    headimgurl: data.data.headimgurl,
                    nickname: data.data.nickname,
                    topscore: data.data.topscore,
                };
                gameInfo.id = data.data.gameid
                gameInfo.coin = data.data.coin
                $('.head-img,.my-rank .rank-userhead img').attr('src', userInfo.headimgurl);
                $('.user-nickname,.my-rank .rank-username').text(userInfo.nickname)
                $('#coinCount').text(gameInfo.coin)
                shareobj.link = shareobj.link+'&inviteId='+userInfo.id;
                // gameInfo.chatSrc = 'http://106.15.37.22/chat/index.html?uid='+userInfo.id+'&nick='+encodeURIComponent(userInfo.nickname)+'&head='+encodeURIComponent(userInfo.headimgurl)
                setsharemsg();
            } else {
                
                var ua = navigator.userAgent.toLowerCase();
                if(ua.match(/MicroMessenger/i)=="micromessenger") {
                    // 微信
////                    location.href = data.oauthlink;
                }else if(ua.match(/WeiBo/i) == "weibo"){
                    // 微博
                    var wburl = "https://api.weibo.com/oauth2/authorize?client_id=3790212520&redirect_uri=http%3a%2f%2fwww.ellogame.com%2fWxCall%2fUserRegisterSinaEllo.aspx&state="+gameInfo.gameName;
////                    location.href = wburl;
                }else {
                    // qq
                    var qqurl = "http://www.ellogame.com/WxCall/UserRegisterQqEllo.aspx?gamename="+gameInfo.gameName;
                    qqurl = encodeURIComponent(qqurl)
                    qqurl = "https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101371103&redirect_uri=" + qqurl + "&scope=get_user_info";
////                    location.href=qqurl;
                } 
            }
        });
}

function chatInit(){
    if(gameInfo.chatSrc && $('.chatFrame').attr('src')==''){
        $('.chatFrame').attr('src',gameInfo.chatSrc)
    }
}

function recordScore(scoreinfo) {
    $.ajax({
            url: config.urlRoot + 'recordscore/',
            type: 'POST',
            dataType: 'json',
            data: {
                gameid: gameInfo.id,
                wxuser_id: userInfo.id,
                score: scoreinfo.scores,
                token: window.token
            }
        })
        .done(function(data) {
            gameInfo.coin += scoreinfo.coin?scoreinfo.coin:0;
            $('#coinCount').text(gameInfo.coin)
        });
}

// game token
function getGameToken() {
    $.ajax({
            url: config.urlRoot + 'gametoken/',
            type: 'POST',
            dataType: 'json',
        })
        .done(function(data) {
            if(data.sta==1){
                window.token = data.token;
            }else{
                window.token = 'fbd7939d674997cdb4692d34de8633c4';
            }
        });
}

// 3 获取游戏列表
function getGamelist() {
    $.ajax({
            url: config.urlRoot + 'gamelist/',
            type: 'POST',
            dataType: 'json',
        })
        .done(function(data) {
            if (data.sta == 1) {
                var html = "";
                data.data.forEach(function(ele) {                	

                    html += 
                        '<li class="game-item">'+
                                '<img class="game-icon" src='+ele.thumb+'>'+
                                '<div class="game-info">'+
                                    '<div class="game-name">'+ele.gametitle+'</div>'+
                                    '<div class="game-intros">'+ele.description+'</div>'+
                                '</div>'+
                                '<a class="game-url" href='+ele.url+'>进入</a>'+
                        '</li>';
                    ;
                })

                /*html += `
                        <li class="game-item">
                                <img class="game-icon" src="${ele.thumb}">
                                <div class="game-info">
                                    <div class="game-name">${ele.gametitle}</div>
                                    <div class="game-intros">
                                        ${ele.description}
                                    </div>
                                </div>
                                <a class="game-url" href="${ele.url}">进入</a>
                        </li>
                    `;*/

                $('.game-list').html(html)
            }
        });
}

var ranksData = {
    friendRank: '',
    allRank: '',
    friIndex: 0,
    allIndex: 0,
    myscore: 0
}

// 5 获取排行
function getFriendsRanks() {
    $('.add-friend-box').removeClass('all-country-ranks');
    if (ranksData.friendRank) {
        $('.rank-list').html(ranksData.friendRank);
        $('.my-rank .rank-index').text(ranksData.friIndex);
        return;
    }
    $.ajax({
            url: config.urlRoot + 'getFriendsRanks/',
            type: 'POST',
            dataType: 'json',
            data: {
                gameid: gameInfo.id,
                wxuser_id: userInfo.id,
            }
        })
        .done(function(data) {
            if (data.sta == 1) {
                var obj = renderRankHtml(data.ranks)
                ranksData.friIndex = obj.index,
                    ranksData.friendRank = obj.html,
                    ranksData.myscore = obj.score;
                $('.my-rank .rank-index').text(ranksData.friIndex)
                $('.my-rank .rank-score').text(ranksData.myscore)
                $('#friendNumber').text(data.ranks.length - 1)
            }
        });
}
// getFriendsRanks();
// 6 获取全国排行
function getRank() {
    $('.add-friend-box').addClass('all-country-ranks');
    if (ranksData.allRank) {
        $('.rank-list').html(ranksData.allRank);
        $('.my-rank .rank-index').text(ranksData.allIndex);
        return;
    }
    $.ajax({
            url: config.urlRoot + 'getRank/',
            type: 'POST',
            dataType: 'json',
            data: {
                gameid: gameInfo.id,
                wxuser_id: userInfo.id,
            }
        })
        .done(function(data) {
            if (data.sta == 1) {
                var obj = renderRankHtml(data.ranks);
                ranksData.allRank = obj.html;
                ranksData.allIndex = +data.myindex + 1;
                $('.my-rank .rank-index').text(ranksData.allIndex)
                $('#allNumber').text(data.allCount)
            }
        });
}

function renderRankHtml(data) {
    var html = "";
    var friIndex = 0;
    var score = 0;
    data.forEach(function(ele, index) {
        if (ele.wxuser_id == userInfo.id) {
            friIndex = index + 1;
            score = ele.topscore;
        }
        html += '<li class="rank-item">'+
                '<span class="rank-index">'+(index+1)+'</span>'+
                '<div class="rank-userhead"><img src='+ele.userinfo.headimgurl+'></div>'+
                '<span class="rank-username">'+ele.userinfo.nickname+'</span>'+
                '<span class="rank-score">'+ele.topscore+'</span>'+
            '</li>';

        /*html += `<li class="rank-item">
                <span class="rank-index">${index+1}</span>
                <div class="rank-userhead">
                    <img src="${ele.userinfo.headimgurl}">
                </div>
                <span class="rank-username">${ele.userinfo.nickname}</span>
                <span class="rank-score">${ele.topscore}</span>
            </li>`;*/
    })
    $('.rank-list').html(html);
    return {
        html: html,
        index: friIndex,
        score: score
    };
}


// 打赏相关
var hasRequestDashang = false;

function getDashang() {
    if (hasRequestDashang) return;
    if (gameInfo.id) {
        $.ajax({
            url: config.urlRoot + 'getTips/',
            type: 'POST',
            dataType: 'json',
            data: {
                gameid: gameInfo.id
            },
            success: function(data) {
                if (data.status == "ok") {
                    createDashang(data.list);
                    $('#dashangNumber').text(data.count)
                } else {
                    console.error('获取打赏记录失败');
                }
                hasRequestDashang = true;
            }
        });

    }
}

function createDashang(list) {
    var html = "";
    list.forEach(function(element, index) {
    	html+='<li class="dashang-item"><img src='+element.headimgurl+'></li>';
            
               
            
        

        /*html+=`
            <li class="dashang-item">
               <img src="${element.headimgurl}">
            </li>
        `;*/
    });
    $('.dashang-list ul').html(html);
}

function payEvent() {

    $("#pay1").on('click', function(event) {
        event.preventDefault();
        /* Act on the event */
        submitOrder(200);
    });
    $("#pay2").on('click', function(event) {
        event.preventDefault();
        /* Act on the event */
        submitOrder(500);
    });
    $("#pay3").on('click', function(event) {
        event.preventDefault();
        /* Act on the event */
        submitOrder(5000);
    });
    $("#pay4").on('click', function(event) {
        event.preventDefault();
        /* Act on the event */
        submitOrder(10000);
    });
}

var payCount = 0;
var isPaying = false;

function submitOrder(money) {
    if (isPaying) {
        console.error('已经提交');
        return;
    }
    isPaying = true;
    setTimeout(function() {
        isPaying = false;
    }, 5000);

    money = parseInt(money);
    if (userInfo.id && gameInfo.id && money) {
        $.ajax({
            url: config.urlRoot + 'pay/',
            type: 'POST',
            dataType: 'json',
            data: {
                gameid: gameInfo.id,
                money: money
            },
            success: function(data) {
                if (data.status == "ok") {
                    payCount = 0;
                    var payData = JSON.parse(data.msg)
                    jsApiCall(payData, data.order_id);
                } else {
                    if (payCount > 5) {
                        return;
                    }
                    console.error('第一次没能获取数据，发起第二次');
                    isPaying = false;
                    payCount++;
                    setTimeout(function() {
                        submitOrder(money)
                    }, 500);

                }
            }
        });

    }
}

function jsApiCall(data, orderId) {
    WeixinJSBridge.invoke(
        'getBrandWCPayRequest',
        data,
        function(res) {
            if (res.err_msg == "get_brand_wcpay_request:ok") {
                confirmOrder(orderId);
            } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                alert("订单已取消，但依然感谢您。");
            } else {
                alert(res.err_msg);
            }
        }
    );
}

function confirmOrder(orderId) {
    if (userInfo.id) {
        $.ajax({
            url: config.urlRoot + 'confirmOrder/',
            type: 'POST',
            dataType: 'json',
            data: {
                orderid: orderId
            },
            success: function(data) {
                if (data.status == "ok") {
                    // $('.reward-list-container,.dsbg').hide()
                    // $('.ds_done-show').show()
                } else {
                    console.error(data.msg);
                }
            }
        });

    }
}

function wxShare(){
     $.ajax({
            url: config.urlRoot + 'getWeixinAuthor/',
            type: 'POST',
            dataType: 'json',
            success: function(data) {
                if ("" != data.appid) {
                    var e = data;
                    wx.config({
                        debug: !1,
                        appId: e.appid,
                        timestamp: e.timestamp,
                        nonceStr: e.noncestr,
                        signature: e.signature,
                        jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo"]
                    }), 
                    wx.ready(function() {
                        DS.ready(function () {
                            setsharemsg();
                            DS.sendAuthUserInfo(userInfo, n.appId);                        
                        })
                    })
                }
            }
        });
}
function setsharemsg() {
    wx.onMenuShareTimeline({
        title: shareobj.title,
        desc: shareobj.desc,
        link: shareobj.link + "&invitefrom=2",
        imgUrl: shareobj.imgUrl,
        success: function() { 
            recordShare(2);
            DS.sendRepost("timeline"); 
        },
        cancel: function() {}
    }), wx.onMenuShareAppMessage({
        title: shareobj.title,
        desc: shareobj.desc,
        link: shareobj.link + "&invitefrom=1",
        imgUrl: shareobj.imgUrl,
        success: function() {
            recordShare(1);
            DS.sendRepost("appMessage");
        },
        cancel: function() {}
    }), wx.onMenuShareQQ({
        title: shareobj.title,
        desc: shareobj.desc,
        link: shareobj.link + "&invitefrom=3",
        imgUrl: shareobj.imgUrl,
        success: function() {recordShare(3)},
        cancel: function() {}
    })
}
function recordShare(type){
    $.ajax({
            url: config.urlRoot + 'recordShare/',
            type: 'POST',
            dataType: 'json',
            data: {
                game_id: gameInfo.id,
                user_id: userInfo.id,
                sharetype:type
            }
        })
        .done(function(data) {
        });
}

function encryptscore(str,key){
    var key = CryptoJS.enc.Utf8.parse(key);
    var iv  = CryptoJS.enc.Utf8.parse('1234567812345678');
    var encrypted = CryptoJS.AES.encrypt(str, key, { iv: iv,mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.ZeroPadding});
    return encrypted;
}

window.onresize = function() {
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 10 + 'px';
    if (window.innerHeight < window.innerWidth) {
        if (window.isPrompt) {
            $('.tip_img_box,.show_hengping').show();
        } else {
            $('.tip_img_box,.show_shuping').show();
        }
        canHidePrompt = false;
    } else {
        canHidePrompt = true;
        $('.tip_img_box,.show_shuping').hide();
    }

};//添加模态框
$(".add-friend").click(function () {
    $(".modal").show();

})
$(".modal").click(function(){

    $(".modal").hide();
})


//点击除5个按钮之外得地方滑动
$('.clickbox').on('click', function () {
    if ($('.container').hasClass('opening')) {
        $('.container').removeClass('opening')
        $('.nav-bar').removeClass('active');
    } else {
        $('.container').addClass('opening')
    }
})

$('.touchbox').on('click', function () {
    if ($('.container').hasClass('opening')) {
        $('.container').removeClass('opening')
        $('.nav-bar').removeClass('active');
    } else {
        $('.container').addClass('opening')
    }
})
//阻止默认touchmove事件
/*document.querySelector('body').addEventListener('touchmove', function(e) {
    if (!document.querySelector('#application-canvas').contains(e.target)) {
        e.preventDefault();
    }
})*/
