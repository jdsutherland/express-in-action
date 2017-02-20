$(function() {
  const $h1 = $("h1");
  const $zip = $("input[name='zip']");

  $("form").on("submit", event => {
    const zipCode = $.trim($zip.val());

    event.preventDefault();
    $h1.text("Loading...");

    const request = $.ajax({
      url: "/" + zipCode,
      dataType: "json"
    });

    request.done((data) => $h1.text(`It is ${data.temperature}ºF at ${zipCode}.`));
    request.fail(() => $h1.text("Error!"));
  });
});
