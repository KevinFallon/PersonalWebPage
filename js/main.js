// $(document).ready(function() {
//     $(function() {
//       $('a[href*=#]:not([href=#])').click(function() {
//         if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
//           var target = $(this.hash);
//           target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
//           if (target.length) {
//             $('html,body').animate({
//               scrollTop: target.offset().top
//             }, 1000);
//             return false;
//           }
//         }
//       });
//     });

//   var scrollTop     = $(window).scrollTop(),
//       navbarHeight  = $('#navbar').height();
//       aboutmeOffset = $('#about-me').offset().top,
//       projectsOffset = $('#projects').offset().top,
//       resumeOffset = $('#resume').offset().top,
//       contactOffset = $('#contact').offset().top,
//       aboutmeDistance      = (Offset - scrollTop),
//       projectsDistance      = (Offset - scrollTop),
//       resumeDistance      = (Offset - scrollTop),
//       contactDistance      = (Offset - scrollTop);

//     $(document).on('scroll', function() {

//     });

//     $('#home').waypoint(function(direction) {
//         $('#navbar').children().find('.active').removeClass('active');
//         $('a[href="#home"]').parent().addClass('active');
//     });

//     $('#about-me').waypoint(function(direction) {
//       if (direction === 'down') {
//         $('#navbar').children().find('.active').removeClass('active');
//         $('a[href="#about-me"]').parent().addClass('active');
//       } else {
//         $('#navbar').children().find('.active').removeClass('active');
//         $('a[href="#home"]').parent().addClass('active');
//       }

//     });


//     $('#projects').waypoint(function(direction) {
//       if (direction === 'down') {
//         $('#navbar').children().find('.active').removeClass('active');
//         $('a[href="#projects"]').parent().addClass('active');
//       } else {
//         $('#navbar').children().find('.active').removeClass('active');
//         $('a[href="#about-me"]').parent().addClass('active');
//       }

//     });

//     $('#resume').waypoint(function(direction) {
//         if (direction === 'down') {
//           $('#navbar').children().find('.active').removeClass('active');
//           $('a[href="#resume"]').parent().addClass('active');
//         } else {
//           $('#navbar').children().find('.active').removeClass('active');
//           $('a[href="#projects"]').parent().addClass('active');
//         }
//     });

//     $('#contact').waypoint(function(direction) {
//         if (direction == 'down') {
//           $('#navbar').children().find('.active').removeClass('active');
//           $('a[href="#contact"]').parent().addClass('active');
//         } else {
//           $('#navbar').children().find('.active').removeClass('active');
//           $('a[href="#resume"]').parent().addClass('active');
//         }
//     });

//     $(".nav a").on("click", function(){
//        $(".nav").find(".active").removeClass("active");
//        $(this).parent().addClass("active");
//     });

// });

$(document).ready(function () {
    $(document).on("scroll", onScroll);

    //smoothscroll
    $('a[href*=#]:not([href=#])').on('click', function (e) {
        e.preventDefault();
        //$(document).off("scroll");
        
        $('a').each(function () {
            $(this).removeClass('active');
        })
        $(this).addClass('active');
      
        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top+2
        }, 800, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });

    var from,to,subject,text;
    $("#submit").click(function(e){
        e.preventDefault();
        name=$("#inputName").val(); 
        email=$("#inputEmail3").val();
        subject=$("#inputSubject").val();
        text=$("#inputMessage").val();
        var alertArea = document.getElementById("alert-area");
        var alertDiv = document.createElement('div');
        alertDiv.setAttribute("id", "contact-alert-box");
        alertDiv.setAttribute('role', 'alert');
        if (name === "" || email === "" || subject === "" || text === "") {
            //alert("error!");
            alertDiv.setAttribute("class", 'alert alert-danger col-sm-offset-2 col-sm-9');
            alertDiv.innerHTML = "Please fill in all fields!";
            //var alertDiv = '<div class="alert alert-danger" role="alert">Please fill in all the boxes!</div>';
            //alertArea.appendChild(alertDiv);
        } else {
            // $("#inputMessage").text("Sending E-mail...Please wait");
            $.get("http://kevinfallon.me:3000/send",{name:name, email:email, subject:subject, text:text},function(data){
                if(data == "sent")
                {
                    $("#inputMessage").empty().html(" Email is been sent at "+to+" . Please check inbox !");
                }
            });
            alertDiv.setAttribute("class", 'alert alert-success col-sm-offset-2 col-sm-9');
            alertDiv.innerHTML = "Thank you for your email!";
            $("#inputName").val(""); 
            $("#inputEmail3").val("");
            $("#inputSubject").val("");
            $("#inputMessage").val("");
        }
        $("#contact-alert-box").remove();
        alertArea.appendChild(alertDiv);
    });
});




function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('#navbar .nav li').each(function () {
        var activeLink = $(this);
        var currLink = $(this).find('a');
        var refElement = $(currLink.attr("href"));

        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            // console.log(refElement.position().top);
            // console.log(refElement.position().top + refElement.height());
            // console.log('scrollPOS: ' + scrollPos);
            //if top of element is above scrollPos and
            //scrollPos is above bottom of element bottom of element of greater 
            $('#navbar ul li').removeClass("active");
            activeLink.addClass("active");
        }
        else{
            activeLink.removeClass("active");
        }
    });
}


