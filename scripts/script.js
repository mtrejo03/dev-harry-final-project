$(() => {
  console.log("ready!");


  $("#chooseSource").hide();

  
  $("input[name='bookSource']").on("change", function () {
    const selectedValue = $("input[name='bookSource']:checked").val(); 
    console.log("Selected Value:", selectedValue); 
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
      $("#outputBox").html(`<p class="text-danger">Please fill out all required fields.</p>`);
      $("#outputCard").show();
      return;
    }

    if (bookData.onlineSource === "yes" && !bookData.platform) {
      $("#outputBox").html(`<p class="text-danger">Please select a platform if the book was found online.</p>`);
      $("#outputCard").show();
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
      $("#outputBox").html(`<p class="text-warning">No previous book data available.</p>`);
      $("#outputCard").show();
      return;
    }

    $("#name").val(previousBookData.readerName);
    $("#title").val(previousBookData.title);
    $("#dateRead").val(previousBookData.dateRead);

    $("input[type='checkbox'][id^='genre']").each(function () {
      $(this).prop("checked", previousBookData.genre.includes($(this).val()));
    });

    $(`input[name='bookRating'][value='${previousBookData.rating}']`).prop("checked", true);
    $(`input[name='bookSource'][value='${previousBookData.onlineSource}']`)
      .prop("checked", true)
      .trigger("change"); 

    $("#platform").val(previousBookData.platform);
    $("#usertext").val(previousBookData.review);
  });
});

