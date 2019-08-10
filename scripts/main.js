$(function () {

  const btnClear = $("#reset")
  const btnCount = $("#count")

  btnClear.on("click", () => {
    inputElement.val("").focus()
    found.unmark()
  })

  const mark = () => {
    const searchVal = $("input[name='keyword']").val();
    // Remove previous marked elements and mark
    // the new keyword inside the context
    $(".context").unmark({
      done: () => {
        $(".context").mark(searchVal, {
          separateWordSearch: true,
          done: count => { btnCount.html(count.toString()) }
        })
      }
    })
  }

  // on getting any input in the keyword element, call mark
  $("input[name='keyword']").on("input", mark)

})

