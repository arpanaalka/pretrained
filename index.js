function getCookie(c_name)
{
    if (document.cookie.length > 0)
    {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1)
        {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start,c_end));
        }
    }
    return "";
 }




$(document).ready(function()
{
  console.log("Application has been loaded");

  $('#pdf1').click(function()
  {
    var question = $('#question_box').val();
    // var url = 'http://www.r-5.org/files/books/computers/languages/escss/react/Alex_Banks_and_Eve_Porcello-Learning_React-EN.pdf';
    var page_number = 0;
    $.ajax({
      url:'http://localhost:8000/get_answer',
      type:"POST",
      // headers:{"X-CSRFToken": $crf_token},
      headers: { "X-CSRFToken": getCookie("csrftoken") },
      data:{
        question: question
      },
      success: function(data)
      {
        page_number = JSON.parse(data);
        console.log(data);
        alert(data);
      },
      error: function(e)
      {
      console.log(e);
      // console.log("Error Occured : " + e);
      }

    });
    // var url = '/static/original_files/sap.pdf';
    var url = '/static/'+page_number[1];

    // Loaded via <script> tag, create shortcut to access PDF.js exports.
    var pdfjsLib = window['pdfjs-dist/build/pdf'];

    // The workerSrc property shall be specified.
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'http://mozilla.github.io/pdf.js/build/pdf.worker.js';

    // Asynchronous download of PDF
    var loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then(function(pdf) {
      console.log('PDF loaded');

      // Fetch the first page
      // var pageNumber = page_number[2];
      var pageNumber = 2;

      pdf.getPage(pageNumber).then(function(page) {
        console.log('Page loaded');

        var scale = 1.5;
        var viewport = page.getViewport(scale);

        // Prepare canvas using PDF page dimensions
        var canvas = document.getElementById('the-canvas');
        var context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Render PDF page into canvas context
        var renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        var renderTask = page.render(renderContext);
        renderTask.then(function () {
          console.log('Page rendered');
        });
      });
    }, function (reason) {
      // PDF loading error
      console.error(reason);
    });

  });
$('#pdfanswer1').click(function()
  {

    var question = $('#question_box').val();
    // var url = 'http://www.r-5.org/files/books/computers/languages/escss/react/Alex_Banks_and_Eve_Porcello-Learning_React-EN.pdf';
    var page_number = 0;
    $.ajax({
      url:'http://localhost:8000/get_answer',
      type:"POST",
      // headers:{"X-CSRFToken": $crf_token},
      headers: { "X-CSRFToken": getCookie("csrftoken") },
      data:{
        question: question
      },
      success: function(data)
      {
        data = data.split('@@@@')[0];
        page_number = data.split('@@@');
        console.log(page_number);
        var url =  '/static/'+page_number[1];
        console.log(url);

        var PDFJS = window['pdfjs-dist/build/pdf'];

        // The workerSrc property shall be specified.
        PDFJS.GlobalWorkerOptions.workerSrc = 'http://mozilla.github.io/pdf.js/build/pdf.worker.js';

        var thePdf = null;
        var scale = 1.5;

        var pageNumber = parseInt(page_number[2]);

        PDFJS.getDocument(url).promise.then(function(pdf) {
            thePdf = pdf;
            viewer = document.getElementById('container');

            for(page = pageNumber; page <=  pageNumber+1; page++) {
              canvas = document.createElement("canvas");
              canvas.className = 'pdf-page-canvas';
              viewer.appendChild(canvas);
              renderPage(page, canvas);
            }
        });

        function renderPage(pageNumber, canvas) {
            thePdf.getPage(pageNumber).then(function(page) {
              viewport = page.getViewport(scale);
              canvas.height = viewport.height;
              canvas.width = viewport.width;
              page.render({canvasContext: canvas.getContext('2d'), viewport: viewport});
        });
        }

      },
      error: function(e)
      {
      console.log(e);
      // console.log("Error Occured : " + e);
      }

    });

    // var url = '/static/js/synopsis.pdf';

  });
$('#pdfanswer2').click(function()
  {

    var question = $('#question_box').val();
    // var url = 'http://www.r-5.org/files/books/computers/languages/escss/react/Alex_Banks_and_Eve_Porcello-Learning_React-EN.pdf';
    var page_number = 0;
    $.ajax({
      url:'http://localhost:8000/get_answer',
      type:"POST",
      // headers:{"X-CSRFToken": $crf_token},
      headers: { "X-CSRFToken": getCookie("csrftoken") },
      data:{
        question: question
      },
      success: function(data)
      {
        data = data.split('@@@@')[0];
        page_number = data.split('@@@');
        console.log(page_number);
        var url =  '/static/'+page_number[1];
        console.log(url);

        var PDFJS = window['pdfjs-dist/build/pdf'];

        // The workerSrc property shall be specified.
        PDFJS.GlobalWorkerOptions.workerSrc = 'http://mozilla.github.io/pdf.js/build/pdf.worker.js';

        var thePdf = null;
        var scale = 1.5;

        var pageNumber = parseInt(page_number[2]);

        PDFJS.getDocument(url).promise.then(function(pdf) {
            thePdf = pdf;
            viewer = document.getElementById('container');

            for(page = pageNumber; page <=  pageNumber+1; page++) {
              canvas = document.createElement("canvas");
              canvas.className = 'pdf-page-canvas';
              viewer.appendChild(canvas);
              renderPage(page, canvas);
            }
        });

        function renderPage(pageNumber, canvas) {
            thePdf.getPage(pageNumber).then(function(page) {
              viewport = page.getViewport(scale);
              canvas.height = viewport.height;
              canvas.width = viewport.width;
              page.render({canvasContext: canvas.getContext('2d'), viewport: viewport});
        });
        }

      },
      error: function(e)
      {
      console.log(e);
      // console.log("Error Occured : " + e);
      }

    });

    // var url = '/static/js/synopsis.pdf';

  });
$('#pdfanswer3').click(function()
  {

    var question = $('#question_box').val();
    // var url = 'http://www.r-5.org/files/books/computers/languages/escss/react/Alex_Banks_and_Eve_Porcello-Learning_React-EN.pdf';
    var page_number = 0;
    $.ajax({
      url:'http://localhost:8000/get_answer',
      type:"POST",
      // headers:{"X-CSRFToken": $crf_token},
      headers: { "X-CSRFToken": getCookie("csrftoken") },
      data:{
        question: question
      },
      success: function(data)
      {
        data = data.split('@@@@')[0];
        page_number = data.split('@@@');
        console.log(page_number);
        var url =  '/static/'+page_number[1];
        console.log(url);

        var PDFJS = window['pdfjs-dist/build/pdf'];

        // The workerSrc property shall be specified.
        PDFJS.GlobalWorkerOptions.workerSrc = 'http://mozilla.github.io/pdf.js/build/pdf.worker.js';

        var thePdf = null;
        var scale = 1.5;

        var pageNumber = parseInt(page_number[2]);

        PDFJS.getDocument(url).promise.then(function(pdf) {
            thePdf = pdf;
            viewer = document.getElementById('container');

            for(page = pageNumber; page <=  pageNumber+1; page++) {
              canvas = document.createElement("canvas");
              canvas.className = 'pdf-page-canvas';
              viewer.appendChild(canvas);
              renderPage(page, canvas);
            }
        });

        function renderPage(pageNumber, canvas) {
            thePdf.getPage(pageNumber).then(function(page) {
              viewport = page.getViewport(scale);
              canvas.height = viewport.height;
              canvas.width = viewport.width;
              page.render({canvasContext: canvas.getContext('2d'), viewport: viewport});
        });
        }

      },
      error: function(e)
      {
      console.log(e);
      // console.log("Error Occured : " + e);
      }

    });

    // var url = '/static/js/synopsis.pdf';

  });
$('#pdf2').click(function()
  {

    var question = $('#question_box').val();
    // var url = 'http://www.r-5.org/files/books/computers/languages/escss/react/Alex_Banks_and_Eve_Porcello-Learning_React-EN.pdf';
    var page_number = 0;
    $.ajax({
      url:'http://localhost:8000/get_answer',
      type:"POST",
      // headers:{"X-CSRFToken": $crf_token},
      headers: { "X-CSRFToken": getCookie("csrftoken") },
      data:{
        question: question
      },
      success: function(data)
      {
        data = data.split('@@@@')[0];
        page_number = data.split('@@@');
        console.log(page_number);
        var url =  '/static/'+page_number[1];
        console.log(url);

        var PDFJS = window['pdfjs-dist/build/pdf'];

        // The workerSrc property shall be specified.
        PDFJS.GlobalWorkerOptions.workerSrc = 'http://mozilla.github.io/pdf.js/build/pdf.worker.js';

        var thePdf = null;
        var scale = 1.5;

        var pageNumber = parseInt(page_number[2]);

        PDFJS.getDocument(url).promise.then(function(pdf) {
            thePdf = pdf;
            viewer = document.getElementById('container');

            for(page = pageNumber; page <=  pageNumber+1; page++) {
              canvas = document.createElement("canvas");
              canvas.className = 'pdf-page-canvas';
              viewer.appendChild(canvas);
              renderPage(page, canvas);
            }
        });

        function renderPage(pageNumber, canvas) {
            thePdf.getPage(pageNumber).then(function(page) {
              viewport = page.getViewport(scale);
              canvas.height = viewport.height;
              canvas.width = viewport.width;
              page.render({canvasContext: canvas.getContext('2d'), viewport: viewport});
        });
        }

      },
      error: function(e)
      {
      console.log(e);
      // console.log("Error Occured : " + e);
      }

    });

    // var url = '/static/js/synopsis.pdf';

  });

// $('#pdfanswer1').click(function()
//   {

//     var question = $('#question_box').val();
//     // var url = 'http://www.r-5.org/files/books/computers/languages/escss/react/Alex_Banks_and_Eve_Porcello-Learning_React-EN.pdf';
//     var page_number = 0;
//     $.ajax({
//       url:'http://localhost:8000/get_answer',
//       type:"POST",
//       // headers:{"X-CSRFToken": $crf_token},
//       headers: { "X-CSRFToken": getCookie("csrftoken") },
//       data:{
//         question: question
//       },
//       success: function(data)
//       {
//         data = data.split('@@@@')[0];
//         page_number = data.split('@@@');
//         console.log(page_number);
//         var url =  '/static/'+page_number[1];
//         console.log(url);

//         var PDFJS = window['pdfjs-dist/build/pdf'];

//         // The workerSrc property shall be specified.
//         PDFJS.GlobalWorkerOptions.workerSrc = 'http://mozilla.github.io/pdf.js/build/pdf.worker.js';

//         var thePdf = null;
//         var scale = 1.5;

//         var pageNumber = parseInt(page_number[2]);

//         PDFJS.getDocument(url).promise.then(function(pdf) {
//             thePdf = pdf;
//             viewer = document.getElementById('container');

//             for(page = pageNumber; page <=  pageNumber+1; page++) {
//               canvas = document.createElement("canvas");
//               canvas.className = 'pdf-page-canvas';
//               viewer.appendChild(canvas);
//               renderPage(page, canvas);
//             }
//         });

//         function renderPage(pageNumber, canvas) {
//             thePdf.getPage(pageNumber).then(function(page) {
//               viewport = page.getViewport(scale);
//               canvas.height = viewport.height;
//               canvas.width = viewport.width;
//               page.render({canvasContext: canvas.getContext('2d'), viewport: viewport});
//         });
//         }

//       },
//       error: function(e)
//       {
//       console.log(e);
//       // console.log("Error Occured : " + e);
//       }

//     });

//     // var url = '/static/js/synopsis.pdf';

//   });
// $('#pdfanswer2').click(function()
//   {

//     var question = $('#question_box').val();
//     // var url = 'http://www.r-5.org/files/books/computers/languages/escss/react/Alex_Banks_and_Eve_Porcello-Learning_React-EN.pdf';
//     var page_number = 0;
//     $.ajax({
//       url:'http://localhost:8000/get_answer',
//       type:"POST",
//       // headers:{"X-CSRFToken": $crf_token},
//       headers: { "X-CSRFToken": getCookie("csrftoken") },
//       data:{
//         question: question
//       },
//       success: function(data)
//       {
//         data = data.split('@@@@')[1];
//         page_number = data.split('@@@');
//         console.log(page_number);
//         var url =  '/static/'+page_number[1];
//         console.log(url);

//         var PDFJS = window['pdfjs-dist/build/pdf'];

//         // The workerSrc property shall be specified.
//         PDFJS.GlobalWorkerOptions.workerSrc = 'http://mozilla.github.io/pdf.js/build/pdf.worker.js';

//         var thePdf = null;
//         var scale = 1.5;

//         var pageNumber = parseInt(page_number[2]);

//         PDFJS.getDocument(url).promise.then(function(pdf) {
//             thePdf = pdf;
//             viewer = document.getElementById('container');

//             for(page = pageNumber; page <=  pageNumber+1; page++) {
//               canvas = document.createElement("canvas");
//               canvas.className = 'pdf-page-canvas';
//               viewer.appendChild(canvas);
//               renderPage(page, canvas);
//             }
//         });

//         function renderPage(pageNumber, canvas) {
//             thePdf.getPage(pageNumber).then(function(page) {
//               viewport = page.getViewport(scale);
//               canvas.height = viewport.height;
//               canvas.width = viewport.width;
//               page.render({canvasContext: canvas.getContext('2d'), viewport: viewport});
//         });
//         }

//       },
//       error: function(e)
//       {
//       console.log(e);
//       // console.log("Error Occured : " + e);
//       }

//     });

//     // var url = '/static/js/synopsis.pdf';

//   });
// $('#pdfanswer3').click(function()
//   {

//     var question = $('#question_box').val();
//     // var url = 'http://www.r-5.org/files/books/computers/languages/escss/react/Alex_Banks_and_Eve_Porcello-Learning_React-EN.pdf';
//     var page_number = 0;
//     $.ajax({
//       url:'http://localhost:8000/get_answer',
//       type:"POST",
//       // headers:{"X-CSRFToken": $crf_token},
//       headers: { "X-CSRFToken": getCookie("csrftoken") },
//       data:{
//         question: question
//       },
//       success: function(data)
//       {
//         data = data.split('@@@@')[2];
//         page_number = data.split('@@@');
//         console.log(page_number);
//         var url =  '/static/'+page_number[1];
//         console.log(url);

//         var PDFJS = window['pdfjs-dist/build/pdf'];

//         // The workerSrc property shall be specified.
//         PDFJS.GlobalWorkerOptions.workerSrc = 'http://mozilla.github.io/pdf.js/build/pdf.worker.js';

//         var thePdf = null;
//         var scale = 1.5;

//         var pageNumber = parseInt(page_number[2]);

//         PDFJS.getDocument(url).promise.then(function(pdf) {
//             thePdf = pdf;
//             viewer = document.getElementById('container');

//             for(page = pageNumber; page <=  pageNumber+1; page++) {
//               canvas = document.createElement("canvas");
//               canvas.className = 'pdf-page-canvas';
//               viewer.appendChild(canvas);
//               renderPage(page, canvas);
//             }
//         });

//         function renderPage(pageNumber, canvas) {
//             thePdf.getPage(pageNumber).then(function(page) {
//               viewport = page.getViewport(scale);
//               canvas.height = viewport.height;
//               canvas.width = viewport.width;
//               page.render({canvasContext: canvas.getContext('2d'), viewport: viewport});
//         });
//         }

//       },
//       error: function(e)
//       {
//       console.log(e);
//       // console.log("Error Occured : " + e);
//       }

//     });

//     // var url = '/static/js/synopsis.pdf';

//   });


$('#full_document').click(function()
  {

    var question = $('#question_box').val();
    // var url = 'http://www.r-5.org/files/books/computers/languages/escss/react/Alex_Banks_and_Eve_Porcello-Learning_React-EN.pdf';
    var page_number = 0;
    $.ajax({
      url:'http://localhost:8000/get_answer',
      type:"POST",
      // headers:{"X-CSRFToken": $crf_token},
      headers: { "X-CSRFToken": getCookie("csrftoken") },
      data:{
        question: question
      },
      success: function(data)
      {
        data = data.split('@@@@');
        page_number = data.split('@@@');
        console.log(page_number);
        var url =  '/static/'+page_number[1];
        console.log(url);

        var PDFJS = window['pdfjs-dist/build/pdf'];

        // The workerSrc property shall be specified.
        PDFJS.GlobalWorkerOptions.workerSrc = 'http://mozilla.github.io/pdf.js/build/pdf.worker.js';

        var thePdf = null;
        var scale = 1.5;

        var pageNumber = parseInt(page_number[2]);

        PDFJS.getDocument(url).promise.then(function(pdf) {
            thePdf = pdf;
            viewer = document.getElementById('container');

            for(page = 0; page <=  100; page++) {
              canvas = document.createElement("canvas");
              canvas.className = 'pdf-page-canvas';
              viewer.appendChild(canvas);
              renderPage(page, canvas);
            }
        });

        function renderPage(pageNumber, canvas) {
            thePdf.getPage(pageNumber).then(function(page) {
              viewport = page.getViewport(scale);
              canvas.height = viewport.height;
              canvas.width = viewport.width;
              page.render({canvasContext: canvas.getContext('2d'), viewport: viewport});
        });
        }

      },
      error: function(e)
      {
      console.log(e);
      // console.log("Error Occured : " + e);
      }

    });

    // var url = '/static/js/synopsis.pdf';

  });
});
