$(function () {
    /*删除商品时*/
    $(".product-del>img").click(function () {
        // console.info("进入方法体")
        $(this).parent().parent().parent().remove(); //找父亲删除整行 product-box
        /*取得数量*/
        const n = Number($($(this).parent().prev().children().children()[1]).val());
        /*更新结算数量*/
        $(".product-all-sl").text(Number($(".product-all-sl").text()) - n);
        /*获取价格*/
        const sn = Number($($(this).parent().prev().prev().children("span")).html());
        $(".all-price").html(Number($(".all-price").html() - (sn * n)));
        const p = $(".product-box");
        if (p.length == 0) {
            $(".body").css("display", "none");
            $(".kon-cat").removeClass("kon-cat");
        }

    })

    /*计算价格*/
    function allPrice() {
        let num = 0;
        $(".product-em").each(function () {
            if ($(this).hasClass("product-xz")) {
                if (Number($($($(this).parent().next().children()[2]).children().children()[1]).val()) == 1) {
                    num += Number($($(this).parent().next().children()[1]).children("span").html());
                    console.log(num);
                } else {
                    var a = $($($(this).parent().next().children()[2]).children().children()[3]).html();
                    num += Number(a);
                }
            }
        });
        $(".all-price").html(num);
    }

    const tr = $("<div class='th2' style='display:none'> </div>");
    $(".product-add").after(tr);

    $(".product-jian").on("click", function () {
        //得到商品数量
        const num = $(this).next().val();
        if (num > 1) {
            //得到购买数量
            $(this).next().val(Number(num) - 1);
            const buynum = $(this).next().val();
            //获取商品单价
            const price = $(this).parent().parent().prev().children().html();
            const sum = buynum * Number(price);
            $(this).next().next().next().html(sum);
        } else {
            alert("再点就没了");
        }
        allPrice();
        checkNum();
    });
    $(".product-add").on("click", function () {
        var num = $(this).prev().val();
        $(this).prev().val(Number(num) + 1);
        var buynum = $(this).prev().val();
        var price = $(this).parent().parent().prev().children().html();
        var sum = buynum * Number(price);
        $(this).next().html(sum);
        allPrice();
        checkNum();
    });

    function checkNum() {
        var num = 0;
        $(".product-em").each(function () {
            if ($(this).hasClass("product-xz")) {

                // console.log($($($(this).parent().next().children()[2]).children().children()[1]).val());

                var a = $($($(this).parent().next().children()[2]).children().children()[1]).val();
                num += Number(a);
                // console.log(num);


            }
            if ($(this).hasClass("product-xz") == false) {
                $(".hj").removeClass("product-all-on");
            }
            if (num >= 1) {
                $(".product-all-qx").text("已选");
                $(".all-sl").show();
                $(".product-sett").removeClass("product-sett-a");
            } else {
                $(".product-sett").addClass("product-sett-a");
                $(".product-all-qx").text("全选");
                $(".all-sl").hide();
            }

        });

        $(".product-all-sl").html(num);
    }

    $(".product-em").click(function () {
        $(this).toggleClass("product-xz");
        var v = $(".product-xz").length;
        var t = $(".product-box").length;
        if (v == t) {
            $(".hj").toggleClass("product-all-on");
        }
        allPrice();
        checkNum();
    });
    $(".hj").click(function () {
        $(this).toggleClass("product-all-on");
        $(".product-em").toggleClass("product-xz");
        var check = $(".product-em").length;
        allPrice();
        checkNum();
    })

})