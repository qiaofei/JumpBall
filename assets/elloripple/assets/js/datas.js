/**
 * Created by du on 2017/3/31.
 */
window.onload = function () {
    var datas = [
        {
            "imgSrc": "http://www.ellogame.com/assets/gameassets/babylontower/share.png",
               //"Url": "http://localhost:63342/ellogame/games/babylontower.html",
               "Url": "http://www.ellogame.com/games/babylontower.html",

               "Txt": "巴比伦塔",
        },
        {
            "imgSrc": "http://www.ellogame.com/assets/gameassets/ripples/share.png",
               //"Url": "http://localhost:63342/ellogame/games/elloripple.html",
               "Url": "http://www.ellogame.com/games/elloripple.html",
               "Txt": "涟漪",
        },
        {
            "imgSrc": "http://www.ellogame.com/assets/gameassets/rainbowstep/share.png",
               //"Url": "http://localhost:63342/ellogame/games/rainbowstep.html",
               "Url": "http://www.ellogame.com/games/rainbowstep.html",
               "Txt": "彩虹阶梯",

        },
        {
            "imgSrc": "http://www.ellogame.com/assets/gameassets/ElloLooper/share.png",
               //"Url": "http://localhost:63342/ellogame/games/ellolooper.html",
               "Url": "http://www.ellogame.com/games/ElloLooper.html",
               "Txt": "环形宇宙",
        },
        {
            "imgSrc": "http://www.ellogame.com/assets/gameassets/Ellorun/share.png",
               //"Url": "http://localhost:63342/ellogame/games/Ellorun.html",
               "Url": "http://www.ellogame.com/games/Ellorun.html",
               "Txt": "ELLORUN",
        },
        {
            "imgSrc": "http://www.ellogame.com/assets/gameassets/Ellota/share.png",
               //"Url": "http://localhost:63342/ellogame/games/ellota.html",
               "Url": "http://www.ellogame.com/games/Ellota.html",
               "Txt": "ELLOTA",
        },

        {
            "imgSrc": "http://www.ellogame.com/assets/gameassets/Elloroll/share.png",
               //"Url": "http://localhost:63342/ellogame/games/elloroll.html",
               "Url": "http://www.ellogame.com/games/Elloroll.html",
               "Txt": "ELLOROLL",
        },
        {
            "imgSrc": "http://www.ellogame.com/assets/gameassets/Ellofruit/share.png",
               //"Url": "http://localhost:63342/ellogame/games/ellofruit.html",
               "Url": "http://www.ellogame.com/games/ellofruit.html",
               "Txt": "ELLOFRUIT",
        },
        {
            "imgSrc": "http://www.ellogame.com/assets/gameassets/Elloello/share.png",
               //"Url": "http://localhost:63342/ellogame/games/elloello.html",
               "Url": "http://www.ellogame.com/games/Elloello.html",
               "Txt": "ELLOELLO",
        },
        {
            "imgSrc": "http://newello.ileou.com/ecms/Tpl/Game/Index/images/images/game10.png",
               //"Url": "http://demo.ileou.com/newello/index.php/play/Ellocar",
               "Url": "http://demo.ileou.com/newello/index.php/play/Ellocar",
               "Txt": "ELLOCAR",
        },
        {
            "imgSrc": "http://www.ellogame.com/assets/gameassets/Ellojump2/share.png",
               //"Url": "http://localhost:63342/ellogame/games/ellojump2.html",
               "Url": "http://www.ellogame.com/games/Ellojump2.html",
               "Txt": "ELLOJUMP2.0",
        },
        {
            "imgSrc": "http://www.ellogame.com/assets/gameassets/Ellojump/share.png",
               //"Url": "http://localhost:63342/ellogame/games/ellojump.html",
               "Url": "http://www.ellogame.com/games/Ellojump.html",
               "Txt": "ELLOJUMP",
        },
        {
            "imgSrc": "http://www.ellogame.com/assets/gameassets/Elloswing/share.png",
               //"Url": "http://localhost:63342/ellogame/games/elloswing.html",
               "Url": "http://www.ellogame.com/games/Elloswing.html",
               "Txt": "ELLOSWING",
        },
        {
            "imgSrc": "http://www.ellogame.com/assets/gameassets/Ellofall/share.png",
               //"Url": "http://localhost:63342/ellogame/games/ellofall.html",
               "Url": "http://www.ellogame.com/games/Ellofall.html",
               "Txt": "ELLOFALL",
        },
        {
            "imgSrc": "http://www.ellogame.com/assets/gameassets/elloturn/share.png",
            //"Url": "http://localhost:63342/ellogame/games/elloturn.html",
            "Url": "http://www.ellogame.com/games/elloturn.html",
            "Txt": "ELLOTURN",
        },
        {
            "imgSrc": "http://www.ellogame.com/assets/gameassets/Ellostep/share.png",
               //"Url": "http://localhost:63342/ellogame/games/ellostep.html",
               "Url": "http://www.ellogame.com/games/Ellostep.html",
               "Txt": "ELLOSTEP",
        },
        {
            "imgSrc": "http://www.ellogame.com/assets/gameassets/Ellogo/share.png",
               //"Url": "http://localhost:63342/ellogame/games/ellogo.html",
               "Url": "http://www.ellogame.com/games/Ellogo.html",
               "Txt": "ELLOGO",
        },

    ]

    var newarr = [];
    for (var i = 0; i < 3; i++) {
        var a = parseInt(Math.random() * datas.length)

        newarr.push(datas[a]);

        datas.splice(a, 1);
    }


//   动态创建ul
    var ul = document.getElementById("back_gameList")

    for (var i = 0; i < newarr.length; i++) {

        var li = document.createElement("li");
        var img = document.createElement("img");
        var a = document.createElement("a");
        var p = document.createElement("p");
        img.src = newarr[i].imgSrc;
        a.href = newarr[i].Url;
        a.target = "_self";
        p.innerText=newarr[i].Txt;
        ul.appendChild(li);
        li.appendChild(a);
        a.appendChild(img);
        li.appendChild(p);
    }

}