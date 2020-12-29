$(document).ready(function () {
    $("#hel").on("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        console.log($("#comment").val());
        // $.ajax({
        //     url: "/blogs/" + $("#commentForm").data("blog") + "/comments/new",
        //     type: "POST",
        //     data: { text: "Ankit" },
        //     success: function (result) {
        //         console.log(result);
        //         console.log("Success!");
        //         changeComments(result);
        //         removeTextFromInput("comment");
        //     },
        //     error: function (jqXHR, textStatus, err) {
        //         console.log("text status " + textStatus + ", err " + err);
        //     },
        // });
        $.ajax({
            url: "/blogs/" + $("#commentForm").data("blog") + "/comments/new",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ comment: "Ankit" }),
            // data: { text: $("#comment").val() },
        });
        // .done(function (result) {
        //     changeComments(result);
        //     removeTextFromInput("comment");
        // })
        // .fail(function (err) {
        //     console.log("Ajax Error");
        //     console.log(err);
        // });
    });

    var changeComments = function (comments) {
        var div = document.getElementById("commentsDiv");
        div.innerHTML = comments;
    };

    var removeTextFromInput = function (id) {
        var removeThis = document.getElementById(id);
        removeThis.innerHTML = "";
    };
});
