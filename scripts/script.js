$(() => {
  console.log("ready!");

  let previousBookData = null; 
  $("input[name='bookSource']").on("change", function () {
    const selectedValue = $("input[name='bookSource']:checked").val();
    if (selectedValue === "yes") {
      $("#chooseSource").show(); 
    } else {
      $("#chooseSource").hide(); 
      $("#platform").val(""); 
    }
  });


  $("#formSubmit").on("click", function (e) {
    e.preventDefault(); 

  
    const bookData = {
      readerName: $("#name").val(),
      title: $("#title").val(),
      dateRead: $("#dateRead").val(), 
      genre: Array.from($("input[type='checkbox'][id^='genre']:checked")).map((input) => input.value),
      rating: $("input[name='bookRating']:checked").val(),
      onlineSource: $("input[name='bookSource']:checked").val(),
      platform: $("#platform").val(),
      review: $("#usertext").val(),
    };


    if (!bookData.readerName || !bookData.title || !bookData.rating || !bookData.onlineSource || !bookData.dateRead) {
      alert("Please fill in all required fields, including Date Read.");
      return;
    }

    if (bookData.onlineSource === "yes" && !bookData.platform) {
      alert("Please specify the online platform.");
      return;
    }


    previousBookData = { ...bookData }; 

    $("#outputBox").html(`
      <p><strong>Reader Name:</strong> ${bookData.readerName}</p>
      <p><strong>Book Title:</strong> ${bookData.title}</p>
      <p><strong>Date Read:</strong> ${bookData.dateRead}</p>
      <p><strong>Genre:</strong> ${bookData.genre.length > 0 ? bookData.genre.join(", ") : "None"}</p>
      <p><strong>Rating:</strong> ${bookData.rating || "Not Rated"}</p>
      <p><strong>Found Online:</strong> ${bookData.onlineSource || "No Answer"}</p>
      <p><strong>Platform:</strong> ${bookData.platform || "N/A"}</p>
      <p><strong>Review:</strong></p>
      <p>${bookData.review || "No Review"}</p>
    `);

    $("#outputCard").show();


    console.log("Submitted Book Data:", bookData);


    $("#chooseSource").hide(); 
  });

  $("#loadPrevious").on("click", function () {
    if (!previousBookData) {
     
      return;
    }

    $("#outputBox").html(`
      <p><strong>Reader Name:</strong> ${previousBookData.readerName}</p>
      <p><strong>Book Title:</strong> ${previousBookData.title}</p>
      <p><strong>Date Read:</strong> ${previousBookData.dateRead}</p>
      <p><strong>Genre:</strong> ${previousBookData.genre.length > 0 ? previousBookData.genre.join(", ") : "None"}</p>
      <p><strong>Rating:</strong> ${previousBookData.rating || "Not Rated"}</p>
      <p><strong>Found Online:</strong> ${previousBookData.onlineSource || "No Answer"}</p>
      <p><strong>Platform:</strong> ${previousBookData.platform || "N/A"}</p>
      <p><strong>Review:</strong></p>
      <p>${previousBookData.review || "No Review"}</p>
    `);


    $("#outputCard").show();
  });


  $("#chooseSource").hide();
  $("#outputCard").hide();
});
